"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { FaBasketShopping, FaTicketSimple, FaUser } from "react-icons/fa6";
import { HiCash } from "react-icons/hi";
import { Bar } from "react-chartjs-2";
import * as orderServices from "@/app/services/orderService";
import * as userServices from "@/app/services/userService";
import * as voucherServices from "@/app/services/voucherService";
import * as productServices from "@/app/services/productService";
import * as addressServices from "@/app/services/addressService";
import * as statsServices from "@/app/services/statService";
import { Button, Modal } from 'antd';
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Select, Space, Table, TableProps } from "antd";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function DashBoard() {
  const [editorder, setEditorder] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const showeditorder = () => setEditorder(true);
  const closeeditorder = () => setEditorder(false);
  const [getorders, setGetorders] = useState<IOrder[]>([]);
  const [vouchers, setVoucher] = useState()
  const [users, setUsers] = useState<IUser[]>([]);
  const [limit, setLimit] = useState(1000);
  const [totalorder, setTotalorder] = useState()
  const [stats, setStats] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [chartData, setChartData] = useState<number[]>(new Array(12).fill(0));
  const [totalprice, setTotalprice] = useState()
  const [selectedOrder, setSelectedOrder] = useState<IOrder>();
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [getaddress, setGetaddress] = useState<IAddress[]>([]);
  const [isDisabledStatus, setIsDisabledStatus] = useState(false);
  const [getUser, setGetUser] = useState<IUser[]>([]);
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    if (selectedOrder) {
      setStatus(selectedOrder.status)
    }
  }, [selectedOrder]);


  useEffect(() => {
    const query = { limit: 7 };
    userServices.getQuery(query).then((res) => {
      setGetUser(res.data);
    });
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
    const order = getorders.find(order => order.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setEditorder(true);
    }
  };

  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    voucherServices.getQuery(query).then((res) => {
      setVoucher(res.total);
    });
  }, []);
  // console.log(vouchers); 

  useEffect(() => {
    const query: any = {};

    query.limit = limit;

    userServices.getQuery(query).then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    const query: any = { year: year };
    query.limit = limit;
    orderServices.getQuery(query).then((res) => {
      setGetorders(res.data);
      // setTotalorder(res.total);
      // console.log(res);
    });
  }, [year]);


  useEffect(() => {
    const query = { year: year };
    statsServices.getQuery(query).then((res) => {
      setStats(res.data);
      setTotalprice(res.data.totalPrice);
      setTotalorder(res.data.totalOrder);

      const updatedChartData = Object.keys(res.data)
        .slice(0, 6)
        .map((key) => res.data[key]?.price || 0);
      setChartData(updatedChartData);
    });
  }, [year]);

  // console.log(getorders);
  // console.log(totalorder);
  // console.log(stats);
  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
    ],
    datasets: [
      {
        label: "Doanh Thu",
        data: chartData,
        backgroundColor: "#4F46E5",
        borderRadius: 6,
      },
    ],
  };
  // console.log(chartData);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
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
        <span className="line-clamp-1">{id.length > 10 ? `${id.slice(0, 10)}...` : id}</span>
      )
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
          <button onClick={() => showEditOrder(record.id)} className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 flex items-center justify-center">
            <FiEdit className="w-5 h-5" />
          </button>
        </Space>
      ),
    },
  ];
  const usercolumns: TableProps<IUser>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "left",
      render: (id) => (
        <span className="line-clamp-1">{id.length > 10 ? `${id.slice(0, 10)}...` : id}</span>
      )
    },
    {
      title: "Tên Khách Hàng",
      dataIndex: "fullname",
      key: "fullname",
      width: 220,
      align: "left",
      render: (fullname) => (
        <span className="line-clamp-1">{fullname}</span>
      )
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      align: "left",
      render: (email) => (
        <span className="line-clamp-1">{email}</span>
      )
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
      width: 180,
      align: "left",
    },
  ];
  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 5) return undefined;
    return { x: 500, y: 230 };
  };

  return (
    <>
      <TitleAdmin title="Bảng điều khiển" yearChange={(newYear: any) => { setYear(newYear) }} />
      <div className="bg-white shadow-lg rounded-lg p-4 flex items-start flex-col gap-4">
        <div className="flex gap-4 justify-between w-full  max-w-full">
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <HiCash className="w-[60px] h-[60px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">Tổng doanh thu</p>
              <p className="text-base font-bold">{(totalprice ?? 0).toLocaleString("vi-VN")} đ</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <FaUser className="w-[50px] h-[50px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">
                Tổng khách hàng
              </p>
              <p className="text-base font-bold">{Object.keys(users).length}</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <FaTicketSimple className="w-[50px] h-[50px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">Tổng voucher</p>
              <p className="text-base font-bold">{vouchers}</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
          <div className="p-2.5 flex gap-2.5 w-1/4 h-[120px] rounded-lg border shadow-md">
            <div className="w-[104px] bg-amber-100 flex items-center justify-center rounded-lg">
              <FaBasketShopping className="w-[50px] h-[50px] text-amber-600" />
            </div>
            <div className="pl-3 pr-2 flex flex-col gap-1.5 justify-center">
              <p className="text-base font-bold text-red-500">Tổng đơn hàng</p>
              <p className="text-base font-bold">{totalorder}</p>
              <div className="border border-dotted text-neutral-300"></div>
            </div>
          </div>
        </div>

        <div className="min-w-full p-64  bg-white flex flex-col gap-2.5 py-5 shadow-lg border rounded-xl">
          <h2 className="text-xl font-bold text-center mb-4">
            Doanh Thu Hàng Tháng
          </h2>
          <Bar data={data} options={options} />
        </div>
        <div className="flex w-full gap-4">
          <div className="p-5 flex flex-col gap-4 w-1/2 h-[400px] rounded-lg border border-gray-200 shadow-lg">
            <p className="text-xl font-bold">Đơn hàng chờ xác nhận</p>
            <div className="border border-zinc-300"></div>
            <div style={{ width: "100%", overflowY: "auto", maxWidth: "100%" }}>
              <Table<IOrder>
                columns={ordercolumns}
                dataSource={getorders.filter(order => order.status === 2)}
                rowKey="id"
                scroll={getTableScroll(getorders.filter(order => order.status === 2).length)}
                pagination={false}
                tableLayout="auto"
              />
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4 w-1/2 h-[400px] rounded-lg border border-gray-200 shadow-lg">
            <p className="text-xl font-bold">Khách hàng mới</p>
            <div className="border border-zinc-300"></div>
            <div style={{ width: "100%", overflowY: "auto", maxWidth: "100%" }}>
              <Table<IUser>
                columns={usercolumns}
                dataSource={users}
                rowKey="id"
                scroll={getTableScroll(users.length)}
                pagination={false}
                tableLayout="auto"
              />
            </div>
          </div>
        </div>
      </div>
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
                    {selectedOrder.voucher_id ? selectedOrder.voucher_id : "Không có"}
                  </p>
                </div>
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Người nhận hàng:</p>
                  <p className="text-sm font-normal">{selectedOrder.address.fullname}</p>
                </div>
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Số điện thoại:</p>
                  <p className="text-sm font-normal">{selectedOrder.address.phone}</p>
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
                    value={status}
                    disabled={selectedOrder.status === 0 || selectedOrder.status === 1}
                    onChange={(value) => {
                      setStatus(Number(value));
                    }}
                    options={[
                      { value: 2, label: "Chờ xác nhận", disabled: ![2].includes(selectedOrder.status) },
                      { value: 3, label: "Đang vận chuyển", disabled: ![2, 3].includes(selectedOrder.status) },
                      { value: 1, label: "Đã giao hàng" },
                      { value: 0, label: "Đã hủy" }
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
                {selectedOrder.products.map((e:any, index) => (
                  <div key={index} className="flex gap-2 items-center border-t border-gray-200 h-[78.8px]">
                    <div className="flex w-full items-center gap-2.5">
                      <img
                        src={e.product.image}
                        alt=""
                        className="w-16 h-16"
                      />
                      <div className="flex py-1.5 flex-col gap-1.5">
                        <p className="text-sm font-normal">
                          {e.product.name}
                        </p>
                      </div>
                    </div>
                    <p className="min-w-24 text-center text-sm font-normal">
                      {selectedOrder?.products?.[index]?.quantity ?? "Không có dữ liệu"}
                    </p>
                    <p className="min-w-24 text-center text-primary text-sm font-normal">
                    {selectedOrder.total.toLocaleString('vn-VN')} đ
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
                <button className="px-6 w-[114px] h-[40px] bg-green-100 text-green-800 text-sm font-bold flex items-center justify-center rounded"
                  onClick={() => {
                    orderServices.updateStatus(selectedOrder.id, status)
                      .then(() => {
                        setGetorders((prevOrders) =>
                          prevOrders.map((order) =>
                            order.id === selectedOrder.id ? { ...order, status } : order
                          )
                        );
                        closeeditorder();
                        setIsDisabledStatus(status === 0 || status === 1);
                        alert("Cập nhật trạng thái thành công!");
                      })
                  }}
                >
                  Lưu
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default DashBoard;
