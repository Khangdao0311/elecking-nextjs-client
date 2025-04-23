"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import * as voucherServices from "@/app/services/voucherService";
import { useEffect, useState } from "react";
import * as userServices from "@/app/services/userService";
import Link from "next/link";
import config from "@/app/config";
import { useStore } from "@/app/store";
import Loading from "@/app/components/client/Loading";
import moment from "moment";
import { Modal, Pagination } from "antd";
import { FiEdit } from "react-icons/fi";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import { GoPlus } from "react-icons/go";
import { DatePicker } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import dayjs from "dayjs";
import { notification } from "antd";
import * as voucherService from "@/app/services/voucherService";
import * as authServices from "@/app/services/authService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


function Voucher() {
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [voucher, setVoucher] = useState<IVoucher>();
  const [editorder, setEditorder] = useState(false);
  const [getUser, setGetUser] = useState<IUser[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<IVoucher>();
  const [discountType, setDiscountType] = useState<number | null>(null);
  const [code, setCode] = useState("");
  const [discountValue, setDiscountValue] = useState<number | null>(null);
  const [minOrderValue, setMinOrderValue] = useState<number | null>(null);
  const [maxDiscount, setMaxDiscount] = useState<number | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [user, setUser] = useState<number | null>(null);
  const closeeditorder = () => setEditorder(false);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [state, dispatch] = useStore();
  const [status, setStatus] = useState<number | string>(0);
  const [quantityVoucher, setQuantityVoucher] = useState(0);
  const [totalActiveVoucher, setTotalActiveVoucher] = useState(0);
  const [totalExpiredVoucher, setTotalExpiredVoucher] = useState(0);
  const voucherCreateDate = dayjs(selectedVoucher?.start_date, "YYYYMMDD");
  const voucherEndDate = dayjs(selectedVoucher?.end_date, "YYYYMMDD");
  const router = useRouter();


  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();

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
    if (selectedVoucher) {
      setVoucher(selectedVoucher);
      setCode(selectedVoucher.code);
      setDiscountType(selectedVoucher.discount_type);
      setDiscountValue(selectedVoucher.discount_value);
      setMinOrderValue(selectedVoucher.min_order_value);
      setMaxDiscount(selectedVoucher.max_discount);
      setStartDate(selectedVoucher.start_date);
      setEndDate(selectedVoucher.end_date);
      setQuantity(selectedVoucher.quantity);
      setUser(selectedVoucher.user_id);
    }
  }, [selectedVoucher]);

  const handleDateStart = (date: dayjs.Dayjs | null) => {
    if (date) {
      setStartDate(date.format("YYYYMMDD"));
    } else {
      setStartDate("");
    }
  };

  const handleDateEnd = (date: dayjs.Dayjs | null) => {
    if (date) {
      setEndDate(date.format("YYYYMMDD"));
    } else {
      setEndDate("");
    }
  };

  const showEditOrder = (orderId: string) => {
    const voucher = vouchers.find((voucher) => voucher.id === orderId);
    if (voucher) {
      setSelectedVoucher(voucher);
      setEditorder(true);
    }
  };

  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    query.page = page;
    if (search !== "") {
      query.search = search;
    }
    if (status !== "") {
      query.expired = status;
    }

    voucherServices.getQuery(query).then((res) => {
      if (res.status === 200) {
        setTotalPages(res.total);
        setVouchers(res.data);
        setQuantityVoucher(res.total);
      }
    });

    voucherServices.getQuery({ expired: 0 }).then((res) => {
      if (res.status === 200) {
        setTotalActiveVoucher(res.total);
      }
    });

    voucherServices.getQuery({ expired: 1 }).then((res) => {
      if (res.status === 200) {
        setTotalExpiredVoucher(res.total);
      }
    });
  }, [limit, page, search, status]);

  useEffect(() => {
    const query = { limit: 1000 };
    userServices.getQuery(query).then((res) => {
      if (res.status === 200) {
        setGetUser(res.data);
      }
    });
  }, []);

  const columns: TableProps<IVoucher>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Mã Voucher",
      dataIndex: "code",
      key: "code",
      width: "10%",
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "start_date",
      key: "start_date",
      width: 160,
      render: (date) => moment(date, "YYYYMMDD").format("DD/MM/YYYY"),
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "end_date",
      key: "end_date",
      width: 140,
      render: (date) => moment(date, "YYYYMMDD").format("DD/MM/YYYY"),
    },
    {
      title: "Đơn Hàng Tối Thiểu",
      dataIndex: "min_order_value",
      key: "min_order_value",
      width: 180,
      render: (value) => `${value.toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Giá Trị Tối Đa",
      dataIndex: "max_discount",
      key: "max_discount",
      width: 140,
      render: (value) => `${value.toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Giá trị Voucher",
      dataIndex: "discount_value",
      key: "discount_value",
      width: 144,
      render: (value, record) =>
        record.discount_type === 1
          ? `${value.toLocaleString("vi-VN")} đ`
          : `${value}%`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 110,
      align: "center",
    },
    {
      title: "Đã sử dụng",
      dataIndex: "used",
      key: "used",
      width: 140,
      align: "center",
    },
    {
      title: "Chức năng",
      key: "action",
      width: 96,
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

  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 5) return undefined;
    return { x: 1000, y: "max-content" };
  };

  return (
    <>
      {state.load && <Loading />}
      {state.load ? (
        ""
      ) : (
        <>
          <TitleAdmin title="Quản lý voucher" />
          <Boxsearchlimit
            title="voucher"
            onLimitChange={(newLimit: any) => {
              setLimit(newLimit);
              setPage(1);
            }}
            onSearch={(value: string) => {
              setSearch(value);
              setPage(1);
            }}
            status={status}
            setStatus={setStatus}
            quantityVoucher={quantityVoucher}
            totalActiveVoucher={totalActiveVoucher}
            totalExpiredVoucher={totalExpiredVoucher}
          />

          <div className=" bg-white shadow-xl min-h-0 rounded-lg px-4 py-4 flex items-start flex-col gap-4">
            {status === 0 && (
              <Link
                href={config.routes.admin.voucher.add}
                className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded"
              >
                <GoPlus className="w-6 h-6" />
                <p className="text-sm font-bold">Tạo voucher mới</p>
              </Link>
            )}
            <div style={{ width: "100%", overflowX: "auto", maxWidth: "100%" }}>
              <Table<IVoucher>
                columns={columns}
                dataSource={vouchers}
                rowKey="id"
                scroll={getTableScroll(vouchers.length)}
                pagination={false}
                tableLayout="auto"
              />
            </div>
            {totalPages > limit && (
              <div className="flex w-full justify-end mt-auto">
                <Pagination
                  current={page}
                  onChange={(e) => setPage(e)}
                  defaultCurrent={1}
                  align="end"
                  pageSize={limit}
                  total={totalPages}
                  showSizeChanger={false}
                />
              </div>
            )}
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
        {editorder && selectedVoucher && (
          <>
            <div className="px-4 h-16 flex items-center">
              <p className="text-xl font-semibold w-full">Chỉnh Sửa Voucher</p>
            </div>
            <div className="flex items-center flex-wrap gap-4 px-4">
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium">
                  Mã Khuyến Mãi <span className="text-primary">*</span>
                </div>
                <Input
                  className="w-[268px] h-11 shadow-md"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  disabled
                />
              </div>
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium">
                  Loại Khuyến Mãi <span className="text-primary"> *</span>
                </div>
                <Select
                  className="shadow-md"
                  value={discountType}
                  style={{ width: 268, height: 44 }}
                  onChange={(value) => {
                    setDiscountType(Number(value));
                  }}
                  options={[
                    { value: 2, label: "Phần trăm" },
                    { value: 1, label: "Giá" },
                  ]}
                />
              </div>
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium">
                  Giá Trị Khuyến Mãi<span className="text-primary"> *</span>
                </div>
                <Input
                  className="w-[268px] h-11 shadow-md"
                  value={discountValue ?? ""}
                  onChange={(e) =>
                    setDiscountValue(Number(e.target.value) || null)
                  }
                />
              </div>
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium">
                  Đơn Tối Thiểu<span className="text-primary"> *</span>
                </div>
                <Input
                  className="w-[268px] h-11 shadow-md"
                  value={minOrderValue ?? ""}
                  onChange={(e) =>
                    setMinOrderValue(Number(e.target.value) || null)
                  }
                />
              </div>
              {discountType === 2 && (
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium">
                    Giá Trị Cao Nhất<span className="text-primary"> *</span>
                  </div>
                  <Input
                    className="w-[268px] h-11 shadow-md"
                    value={maxDiscount ?? ""}
                    onChange={(e) =>
                      setMaxDiscount(Number(e.target.value) || null)
                    }
                  />
                </div>
              )}
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium">
                  Ngày Bắt Đầu <span className="text-primary">*</span>
                </div>
                <Space direction="vertical">
                  <DatePicker
                    className="w-[268px] h-11 shadow-md"
                    value={startDate ? dayjs(startDate, "YYYYMMDD") : null}
                    onChange={handleDateStart}
                    disabledDate={(current) => current && current < dayjs().startOf("day")}
                  />
                </Space>
              </div>
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium">
                  Ngày Kết Thúc <span className="text-primary">*</span>
                </div>
                <Space direction="vertical">
                  <DatePicker
                    className="w-[268px] h-11 shadow-md"
                    value={endDate ? dayjs(endDate, "YYYYMMDD") : null}
                    onChange={handleDateEnd}
                    disabledDate={(current) => current && current < dayjs().startOf("day")}
                  />
                </Space>
              </div>
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium">
                  Số Lượng<span className="text-primary"> *</span>
                </div>
                <Input
                  className="w-[268px] h-11 shadow-md"
                  value={quantity ?? ""}
                  onChange={(e) =>
                    setQuantity(
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                />
              </div>
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium">
                  Người Dùng <span className="text-primary">*</span>
                </div>
                <Select
                  className="shadow-md"
                  placeholder="Chọn người dùng"
                  value={user}
                  style={{ width: 268, height: 44 }}
                  onChange={(value) => {
                    setUser(value);
                  }}
                  options={getUser.map((e) => ({
                    value: e.id,
                    label: e.fullname,
                  }))}
                />
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
                  onClick={async () => {
                    const start = dayjs(startDate, "YYYYMMDD");
                    const end = dayjs(endDate, "YYYYMMDD");
                    let errors: string[] = [];
                    if (
                      !code ||
                      discountType === null ||
                      discountValue === null ||
                      minOrderValue === null ||
                      (discountType !== 1 && maxDiscount === null) ||
                      !startDate ||
                      !endDate ||
                      quantity === null
                    ) {
                      errors.push("Vui lòng nhập đầy đủ thông tin.");
                    }

                    if (start.isAfter(end)) {
                      errors.push(
                        "Ngày bắt đầu và ngày kết thúc không hợp lệ."
                      );
                    }

                    if (discountType === 1 && (discountValue ?? 0) < 1000) {
                      errors.push(
                        "Giá trị giảm giá phải lớn hơn hoặc bằng 1000."
                      );
                    }

                    if (errors.length > 0) {
                      openNotificationWithIcon(
                        "error",
                        "Lỗi dữ liệu !",
                        <>
                          {errors.map((err, index) => (
                            <div key={index}>{err}</div>
                          ))}
                        </>
                      );
                      return;
                    }

                    const voucherData: Partial<IVoucher> = {
                      code,
                      discount_type: discountType ?? 0,
                      discount_value: discountValue ?? 0,
                      min_order_value: minOrderValue ?? 0,
                      max_discount: maxDiscount ?? 0,
                      start_date: startDate,
                      end_date: endDate,
                      quantity: quantity ?? 0,
                      status: 1,
                      user_id:
                        user !== null && user !== undefined ? null : undefined,
                    };

                    (function callback() {
                      voucherService.editVoucher(selectedVoucher.id, voucherData)
                        .then(res => {
                          if (res.status === 200) {
                            openNotificationWithIcon(
                              "success",
                              "Thành công",
                              "Sửa voucher thành công"
                            );

                            setVouchers((prev) =>
                              prev.map((v) =>
                                v.id === selectedVoucher.id
                                  ? {
                                    ...v,
                                    ...voucherData,
                                    id: selectedVoucher.id,
                                  }
                                  : v
                              )
                            );

                            closeeditorder();

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
                          } else {
                            openNotificationWithIcon("error", "Lỗi", "Có lỗi xảy ra, vui lòng thử lại");
                          }
                        })
                    })();
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

export default Voucher;
