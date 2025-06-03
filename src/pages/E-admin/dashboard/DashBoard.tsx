"use client";

import {
  FaBasketShopping,
  FaCircleUser,
  FaTicketSimple,
  FaUser,
} from "react-icons/fa6";
import { HiCash } from "react-icons/hi";
import { Bar } from "react-chartjs-2";
import { Modal, Select, Space, Table, TableProps, notification } from "antd";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";

import * as orderServices from "@/services/orderService";
import * as userServices from "@/services/userService";
import * as voucherServices from "@/services/voucherService";
import * as statsServices from "@/services/statService";
import * as authServices from "@/services/authService";
import config from "@/config";
import TitleAdmin from "@/components/admin/TitleAdmin";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useStore } from "@/store";
import Loading from "@/components/client/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function DashBoard() {
  const [editorder, setEditorder] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const showeditorder = () => setEditorder(true);
  const closeeditorder = () => setEditorder(false);
  const [getorders, setGetorders] = useState<IOrder[]>([]);
  const [vouchers, setVoucher] = useState();
  const [users, setUsers] = useState<IUser[]>([]);
  const [limit, setLimit] = useState(1000);
  const [totalOrder, setTotalorder] = useState<number[]>([]);
  const [stats, setStats] = useState([]);
  const [year, setYear] = useState<number | null>(null);

  const [chartData, setChartData] = useState<number[]>(new Array(12).fill(0));
  const [totalprice, setTotalprice] = useState();
  const [selectedOrder, setSelectedOrder] = useState<IOrder>();
  const [getUser, setGetUser] = useState<IUser[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(selectedOrder?.status);
  const [state, dispatch] = useStore();
  const [userDetail, setUserDetail] = useState<IUser>();
  const [showUser, setShowUser] = useState(false);
  const router = useRouter()
  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();
  const currentYear = new Date().getFullYear();
  const yearnew = year || currentYear;
  const [lengthuser, setLengthuser] = useState<IUser[]>([]);

  const openNotificationWithIcon = (
    type: NotificationType,
    message: any,
    description: any
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  useEffect(() => {
    if (selectedOrder) {
      setSelectedStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  useEffect(() => {
    const query = { limit: 7 };
    (function callback() {
      userServices.getQuery(query).then((res) => {
        if (res.status === 200) {
          setGetUser(res.data);
        } else if (res.status === 401) {
          const refreshTokenAdmin = authServices.getRefreshTokenAdmin();
          if (refreshTokenAdmin) {
            authServices.getToken(refreshTokenAdmin).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token_admin", res.data);
                callback();
              } else {
                authServices.clearAdmin();
                router.push(config.routes.admin.login);
              }
            });
          }
        }
      });
    })()
  }, []);

  useEffect(() => {
    if (selectedOrder && getUser.length > 0) {
      const user = getUser.find((user) => user.id == selectedOrder?.user?.id);
      if (user) {
        setSelectedUser(user);
      }
    }
  }, [selectedOrder, getUser]);

  const showEditOrder = (orderId: string) => {
    const order = getorders.find((order) => order.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setSelectedStatus(order.status);
      setEditorder(true);
    }
  };

  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    voucherServices.getQuery(query).then((res) => {
      if (res.status === 200) {
        setVoucher(res.total);
      }
    });
  }, []);

  useEffect(() => {
    const query: any = {};
    query.limit = 10;
    query.role = 0;
    (async function callback() {
      userServices.getQuery(query).then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
        }
        else if (res.status === 401) {
          const refreshTokenAdmin = authServices.getRefreshTokenAdmin();
          if (refreshTokenAdmin) {
            authServices.getToken(refreshTokenAdmin).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token_admin", res.data);
                callback();
              } else {
                authServices.clearAdmin();
                router.push(config.routes.admin.login);
              }
            });
          }
        }
      });
    })();
  }, []);

  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    (async function callback() {
      userServices.getQuery(query).then((res) => {
        if (res.status === 200) {
          setLengthuser(res.data);
        }
        else if (res.status === 401) {
          const refreshTokenAdmin = authServices.getRefreshTokenAdmin();
          if (refreshTokenAdmin) {
            authServices.getToken(refreshTokenAdmin).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token_admin", res.data);
                callback();
              } else {
                authServices.clearAdmin();
                router.push(config.routes.admin.login);
              }
            });
          }
        }
      });
    })();
  }, []);

  useEffect(() => {
    const query: any = { year: year };
    (function callback() {
      orderServices.getQuery(query).then((res) => {
        if (res.status === 200) {
          setGetorders(res.data);
        }
        else if (res.status === 401) {
          const refreshTokenAdmin = authServices.getRefreshTokenAdmin();
          if (refreshTokenAdmin) {
            authServices.getToken(refreshTokenAdmin).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token_admin", res.data);
                callback();
              } else {
                authServices.clearAdmin();
                router.push(config.routes.admin.login);
              }
            });
          }
        }
      });
    })();
  }, [year]);

  const generateLabels = () => {
    if (!year) {
      return Array.from({ length: 6 }, (_, i) =>
        moment()
          .subtract(5 - i, "months")
          .format("MM/YYYY")
      );
    }
    return Array.from({ length: 12 }, (_, i) =>
      moment().month(i).year(year).format("MM/YYYY")
    );
  };

  useEffect(() => {
    const query: any = {};
    if (year !== null) {
      query.year = year;
    }
    (async function callback() {
      statsServices.getQuery(query).then((res) => {
        if (res.status === 200) {
          setStats(res.data);
          setTotalprice(res.data.totalPrice);
          const months = generateLabels();
          const updatedChartData = months.map((month) => {
            const formattedMonth = moment(month, "MM/YYYY").format("MM/YYYY");
            return Math.round(res.data[formattedMonth]?.price || 0);
          });
          const updatedOrderData = months.map((month) => {
            const formattedMonth = moment(month, "MM/YYYY").format("MM/YYYY");
            return Math.round(res.data[formattedMonth]?.order || 0);
          });
          setChartData(updatedChartData);
          setTotalorder(updatedOrderData);
        } else if (res.status === 401) {
          const refreshTokenAdmin = authServices.getRefreshTokenAdmin();
          if (refreshTokenAdmin) {
            authServices.getToken(refreshTokenAdmin).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token_admin", res.data);
                callback();
              } else {
                authServices.clearAdmin();
                router.push(config.routes.admin.login);
              }
            });
          }
        }
      });
    })();
  }, [year]);


  const data = {
    labels: generateLabels(),
    datasets: [
      {
        label: "Doanh Thu",
        data: chartData,
        backgroundColor: "#4F46E5",
        borderRadius: 6,
        yAxisID: "y",
      },
      {
        label: "Đơn Hàng",
        data: totalOrder,
        backgroundColor: "#FF5733",
        borderRadius: 6,
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        position: "left",
        title: {
          display: true,
          text: "Doanh Thu (VNĐ)",
        },
      },
      y1: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        position: "right",
        grid: { drawOnChartArea: false },
        title: {
          display: true,
          text: "Số Đơn Hàng",
        },
      },
    },
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const column = data.labels[index];
        const [month, year] = column.split("/")
        router.push(`${config.routes.admin.order.list}?year=${year}&month=${month}`)
      }
    },
  };

  const ordercolumns: TableProps<IOrder>["columns"] = [
    {
      title: "ID Đơn Hàng",
      dataIndex: "id",
      key: "id",
      width: 150,
      align: "left",
      render: (id) => (
        <span className="line-clamp-1">
          {id.length > 10 ? `${id.slice(0, 10)}...` : id}
        </span>
      ),
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "user",
      key: "user",
      width: 200,
      align: "left",
      render: (user) => user.fullname,
    },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      width: 150,
      align: "left",
      render: (total) => `${(+total).toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Chức Năng",
      key: "action",
      width: 130,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => showEditOrder(record.id)}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 flex items-center justify-center"
          >
            <FiEdit className="w-5 h-5" />
          </button>
        </Space>
      ),
    },
  ];
  const usercolumns: TableProps<IUser>["columns"] = [
    {
      title: "Ảnh",
      dataIndex: "avatar",
      width: 100,
      key: "avatar",
      align: "center",
      render: (avatar: any) => (
        <div className="flex justify-center items-center">
          {avatar ? (
            <img
              className="w-[50px] h-[50px]  items-center object-cover"
              src={avatar}
              alt="name"
            />
          ) : (
            <FaCircleUser className="w-[50px] h-[50px] text-gray-800" />
          )}
        </div>
      ),
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "fullname",
      width: 140,
      key: "fullname",
      align: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
      key: "email",
      align: "left",
      render: (email) => <span className="line-clamp-1">{email}</span>,
    },
    {
      title: "Chi tiết",
      key: "action",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => showUserDetail(record.id)}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 flex items-center justify-center"
          >
            <FiEdit className="w-5 h-5" />
          </button>
        </Space>
      ),
    },
  ];

  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 5) return undefined;
    return { x: 500, y: 230 };
  };

  function showUserDetail(id: string) {
    setShowUser(true);
    (function callback() {
      userServices.getById(id).then((res) => {
        if (res.status === 200) {
          setUserDetail(res.data);
        } else if (res.status === 401) {
          const refreshTokenAdmin = authServices.getRefreshTokenAdmin();
          if (refreshTokenAdmin) {
            authServices.getToken(refreshTokenAdmin).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token_admin", res.data);
                callback();
              } else {
                authServices.clearAdmin();
                router.push(config.routes.admin.login);
              }
            });
          }
        }
      });
    })();
  }

  return (
    <>
      {state.load && <Loading />}
      {state.load ? (
        state.load
      ) : (
        <>
          <TitleAdmin
            title="Bảng điều khiển"
            yearChange={(newYear: any) => {
              setYear(newYear);
            }}
          />
          <div className="bg-white shadow-lg rounded-lg p-4 flex items-start flex-col gap-4">
            <div className="flex gap-4 justify-between w-full  max-w-full">
              <div className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
                <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
                  <HiCash className="w-[60px] h-[60px] text-amber-600" />
                </div>
                <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
                  <p className="text-base font-bold text-red-500">
                    Tổng doanh thu
                  </p>
                  <p className="text-base font-bold">
                    {(totalprice ?? 0).toLocaleString("vi-VN")} đ
                  </p>
                  <div className="border border-dotted text-neutral-300"></div>
                </div>
              </div>
              <Link href={config.routes.admin.user.list} className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
                <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
                  <FaUser className="w-[50px] h-[50px] text-amber-600" />
                </div>
                <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
                  <div className="text-base font-bold text-red-500 cursor-pointer">
                    Tổng khách hàng
                  </div>
                  <p className="text-base font-bold">
                    {Object.keys(lengthuser).length}
                  </p>
                  <div className="border border-dotted text-neutral-300"></div>
                </div>
              </Link>
              <Link href={config.routes.admin.voucher.list} className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
                <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
                  <FaTicketSimple className="w-[50px] h-[50px] text-amber-600" />
                </div>
                <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
                  <div className="text-base font-bold text-red-500 cursor-pointer">
                    Tổng voucher
                  </div>
                  <p className="text-base font-bold">{vouchers}</p>
                  <div className="border border-dotted text-neutral-300"></div>
                </div>
              </Link>
              <Link href={`${config.routes.admin.order.list}?year=${yearnew}`} className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
                <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
                  <FaBasketShopping className="w-[50px] h-[50px] text-amber-600" />
                </div>
                <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
                  <div className="text-base font-bold text-red-500">
                    Tổng đơn hàng
                  </div>
                  <p className="text-base font-bold">
                    {totalOrder.reduce((acc, val) => acc + val, 0)}
                  </p>
                  <div className="border border-dotted text-neutral-300"></div>
                </div>
              </Link>
            </div>

            <div className="min-w-full p-64  bg-white flex flex-col gap-2.5 py-5 shadow-lg border rounded-xl">
              <h2 className="text-xl font-bold text-center mb-4">
                Doanh Thu Hàng Tháng
              </h2>
              <Bar data={data} options={options} />
            </div>
            <div className="flex w-full gap-4">
              <div className="p-5 flex flex-col gap-4 w-1/2 h-[400px] rounded-lg border border-gray-200 shadow-lg">
                <p className="text-xl font-bold">Đơn hàng chờ xác nhận ({getorders.filter((order) => order.status === 2).length})</p>
                <div className="border border-zinc-300"></div>
                <div
                  style={{ width: "100%", overflowY: "auto", maxWidth: "100%" }}
                >
                  <Table<IOrder>
                    columns={ordercolumns}
                    dataSource={getorders.filter((order) => order.status === 2)}
                    rowKey="id"
                    scroll={getTableScroll(
                      getorders.filter((order) => order.status === 2).length
                    )}
                    pagination={false}
                    tableLayout="auto"
                  />
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4 w-1/2 h-[400px] rounded-lg border border-gray-200 shadow-lg">
                <p className="text-xl font-bold">Khách hàng mới ({users.length})</p>
                <div className="border border-zinc-300"></div>
                <div style={{ width: "100%", maxWidth: "100%" }}>
                  <Table<IUser>
                    columns={usercolumns}
                    dataSource={users}
                    rowKey="id"
                    scroll={getTableScroll(users.length)}
                    pagination={false}
                    tableLayout="fixed"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {contextHolder}
      <Modal
        width={650}
        open={editorder}
        onCancel={closeeditorder}
        footer={null}
        centered
      >
        {editorder && selectedOrder && (
          <>
            <div className="px-4 h-16 flex items-center">
              <p className="text-xl font-semibold w-full">Chi Tiết Đơn Hàng</p>
            </div>
            <div className="p-4 flex gap-3 flex-col border-y border-gray-200">
              <div className="flex flex-wrap gap-3">
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Mã Đơn Hàng:</p>
                  <p className="text-sm font-normal">{selectedOrder.id}</p>
                </div>
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Voucher:</p>
                  <p className="text-sm font-normal">
                    {selectedOrder.voucher_id
                      ? selectedOrder.voucher_id
                      : "Không có"}
                  </p>
                </div>
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Người nhận hàng:</p>
                  <p className="text-sm font-normal">
                    {selectedOrder.address.fullname}
                  </p>
                </div>
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Số điện thoại:</p>
                  <p className="text-sm font-normal">
                    {selectedOrder.address.phone}
                  </p>
                </div>
                <div className="flex w-full gap-1.5">
                  <p className="text-sm font-medium">Tỉnh/Thành phố:</p>
                  <p className="text-sm font-normal">
                    {`${selectedOrder.address.ward.name}, ${selectedOrder.address.district.name}, ${selectedOrder.address.province.name}  `}
                  </p>
                </div>
                <div className="flex w-full gap-1.5">
                  <p className="text-sm font-medium">Địa chỉ cụ thể:</p>
                  <p className="text-sm font-normal">
                    {selectedOrder.address.description}
                  </p>
                </div>
                <div className="flex flex-col w-[278px] gap-0.5">
                  <p className="text-sm font-medium">Trạng Thái Đơn Hàng:</p>
                  <Select
                    className="h-[28px] w-full shadow-md rounded"
                    value={selectedStatus}
                    disabled={selectedOrder?.status === 0 || selectedOrder?.status === 1}
                    onChange={(value) => {
                      setSelectedStatus(Number(value));
                    }}
                    options={[
                      {
                        value: 2,
                        label: "Chờ xác nhận",
                        disabled: ![2].includes(selectedOrder?.status),
                      },
                      {
                        value: 3,
                        label: "Đã xác nhận",
                        disabled: ![2, 3].includes(selectedOrder?.status),
                      },
                      {
                        value: 4,
                        label: "Đang vận chuyển",
                        disabled: ![2, 3, 4].includes(selectedOrder?.status),
                      },
                      {
                        value: 1,
                        label: "Đã giao hàng",
                        disabled: [2, 3].includes(selectedOrder?.status),
                      },
                      {
                        value: 0,
                        label: "Hủy đơn",
                        disabled: selectedOrder?.payment_status,
                      },
                    ]}
                  />
                </div>
                <div className="flex w-full gap-1.5">
                  <p className="text-sm font-medium">Loại địa chỉ:</p>
                  {selectedOrder.address.type === 1 && (
                    <p className="text-sm font-bold text-primary">Nhà riêng</p>
                  )}

                  {selectedOrder.address.type === 2 && (
                    <p className="text-sm font-bold text-primary">Văn phòng</p>
                  )}
                </div>
                <div className="flex w-full gap-1.5">
                  <p className="text-sm font-medium">Xác nhận:</p>
                  <p className="text-sm font-normal">
                    {selectedOrder.payment_status
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </p>
                </div>
              </div>
              <div className="px-3 py-2 flex flex-col gap-2 rounded border border-gray-200 shadow-lg">
                <div className="flex w-full gap-2">
                  <p className="w-full text-sm font-medium">Sản Phẩm</p>
                  <p className="min-w-24 text-sm font-medium text-center">
                    Số Lượng
                  </p>
                  <p className="min-w-24 text-sm font-medium text-center">
                    Thành Tiền
                  </p>
                </div>
                {selectedOrder.products.map((e: any, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center border-t border-gray-200 h-[78.8px]"
                  >
                    <div className="flex w-full items-center gap-2.5">
                      <img src={e.product.image} alt="" className="w-16 h-16" />
                      <div className="flex py-1.5 flex-col gap-1.5">
                        <p className="text-sm font-normal">{e.product.name}</p>
                      </div>
                    </div>
                    <p className="min-w-24 text-center text-sm font-normal">
                      {selectedOrder?.products?.[index]?.quantity ??
                        "Không có dữ liệu"}
                    </p>
                    <p className="min-w-24 text-center text-primary text-sm font-normal">
                      {e.product.price.toLocaleString("vn-VN")}đ
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 h-[64px] items-center justify-end flex gap-4">
              <div className="flex gap-4">
                <button
                  onClick={closeeditorder}
                  className="cursor-pointer px-6 w-[114px] h-[40px] bg-red-100 text-red-800 text-sm font-bold flex items-center justify-center rounded"
                >
                  Trở lại
                </button>
                <button
                  className="px-6 w-[114px] h-[40px] bg-green-100 text-green-800 text-sm font-bold flex items-center justify-center rounded"
                  onClick={() => {
                    orderServices
                      .updateStatus(selectedOrder.id, Number(selectedStatus))
                      .then(() => {
                        setGetorders((prevOrders) =>
                          prevOrders.map((order) =>
                            order.id === selectedOrder.id
                              ? { ...order, status: Number(selectedStatus) }
                              : order
                          )
                        );
                        openNotificationWithIcon(
                          "success",
                          "Thành công",
                          "Sửa trạng thái thành công"
                        );
                      });
                  }}
                >
                  Lưu
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>

      <Modal
        width={500}
        open={showUser}
        onCancel={() => setShowUser(false)}
        footer={null}
        centered
      >
        {showUser && (
          <div className="flex justify-center items-center gap-3">
            <div className="w-1/4 border rounded-lg flex justify-center items-center h-[110px]">
              {userDetail?.avatar ? (
                <img
                  className="w-full h-full rounded-lg"
                  src={userDetail?.avatar}
                  alt={userDetail?.username}  
                />
              ) : (
                <FaCircleUser className="w-[50px] h-[50px] text-gray-800" />
              )}
            </div>
            <div className="flex flex-col w-3/4">
              <div className="flex gap-2">
                <p>Họ và Tên: </p>
                <p> {userDetail?.fullname}</p>
              </div>
              <div className="flex gap-2">
                <p> Email: </p>
                <p> {userDetail?.email}</p>
              </div>
              <div className="flex gap-2">
                <p> Số điện thoại: </p>
                <p>{userDetail?.phone || "Chưa cập nhật số điện thoại"} </p>
              </div>
              <div className="flex gap-2">
                <p> Ngày khởi tạo:</p>
                <p>
                  {moment(userDetail?.register_date, "YYYYMMDDHHmmss").format(
                    "DD/MM/YYYY"
                  )}
                </p>
              </div>

              <div className="flex gap-2">
                <p> Vai trò: </p>
                <p>
                  {" "}
                  {userDetail?.role === 1 ? "Quản Trị Viên" : "Khách Hàng"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default DashBoard;
