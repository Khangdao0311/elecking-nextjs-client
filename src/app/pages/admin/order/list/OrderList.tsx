"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Select } from "antd";
import * as orderServices from "@/app/services/orderService";
import * as userServices from "@/app/services/userService";
import * as paymentServices from "@/app/services/paymentService";
import Statusorder from "@/app/pages/admin/Components/Status";
import moment from "moment";
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function OrderList() {
  const [editorder, setEditorder] = useState(false);
  const showeditorder = () => setEditorder(true);
  const closeeditorder = () => setEditorder(false);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<{ [key: string]: IUser }>({});
  const [payments, setPayments] = useState<{ [key: string]: IPaymment}>({});
  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    query.page = page;
    if (search != "") {
      query.search = search;
    }
    orderServices.getQuery(query).then((res) => {
      setOrders(res.data);
      setTotalPages(res.total);
    });
  }, [limit, page, search]);
  console.log(orders);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData: { [key: string]: IUser } = {};
      for (const order of orders) {
        if (!users[order.user_id]) {
          const getuser = await userServices.getById(order.user_id);
          usersData[order.user_id] = getuser.data;
        }
      }
      setUsers((prev) => ({ ...prev, ...usersData }));
    };

    if (orders.length) fetchUsers();
  }, [orders]);

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentData: { [key: string]: IPaymment } = {};
      for (const order of orders) {
        if (!payments[order.payment_method_id]) {
          const getpayment = await paymentServices.getById(order.payment_method_id);
          paymentData[order.payment_method_id] = getpayment.data;
          console.log(getpayment);
          
        }
      }
      setPayments((prev) => ({ ...prev, ...paymentData }));
    };

    if (orders.length) fetchPayments();
  }, [orders]);

  return (
    <>
      <TitleAdmin title="Quản lý đơn hàng" />
      <Boxsearchlimit
        title="đơn hàng"
        onLimitChange={(newLimit: any) => {
          setLimit(newLimit);
          setPage(1);
        }}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-2 py-2.5 w-12 min-w-12 text-sm font-bold">
                STT
              </th>

              <th className=" min-w-[128px]  px-2 py-2.5 text-left  text-sm font-bold">
                Mã Đơn Hàng
              </th>
              <th className=" min-w-[128px] text-left px-2 py-2.5  text-sm font-bold">
                Ngày Đặt Hàng
              </th>

              <th className="px-2 py-2.5 w-full text-left text-sm font-bold ">
                Khách Hàng
              </th>

              <th className="px-2 py-2.5 min-w-[150px] text-left text-sm font-bold ">
                Tổng tiền
              </th>

              <th className="px-2 py-2.5  w-[112px] min-w-[112px] max-w-[112px] text-center text-sm font-bold ">
                Mã giao dịch
              </th>

              <th className="px-2 py-2.5  w-[230px] min-w-[230px] max-w-[230px] text-left text-sm font-bold ">
                Phương Thức Thanh Toán
              </th>

              <th className="px-2 py-2.5  w-[128px] min-w-[128px] max-w-[128px] text-sm font-bold">
                Trạng Thái
              </th>

              <th className="px-2 py-2.5 w-[96px] min-w-[96px] max-w-[96px] text-sm font-bold">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: IOrder, index: number) => {
              let text = "";
              switch (order.status) {
                case 0:
                  text = "Đã hủy";
                  break;
                case 1:
                  text = "Đã giao hàng";
                  break;
                case 2:
                  text = "Chờ xác nhận";
                  break;
                case 3:
                  text = "Đang vận chuyển";
                default:
                  break;
              }
              return (
                <tr key={order.id} className="even:bg-gray-100">
                  <td className="px-2 py-2.5 w-12 text-center">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-2 py-2.5 w-[128px]">{order.id}</td>
                  <td className="px-2 py-2.5 w-[128px]">{moment(order.ordered_at, "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm")}</td>
                  <td className="px-2 flex-1 py-2">
                    {users[order.user_id]?.fullname}
                  </td>
                  <td className="px-2 flex-1 py-2 w-[150px]">
                    {(+order.total).toLocaleString("vi-VN")} đ
                  </td>
                  <td className="px-2 min-w-[112px] max-w-[112px] text-center py-2.5">
                    <span className="line-clamp-1">
                      {order.transaction_code || "không có"}
                    </span>
                  </td>
                  <td className="px-2 min-w-[230px] py-2.5">
                    {payments[order.payment_method_id]?.name}
                  </td>
                  <td className="px-2 min-w-[112px] py-2.5 text-center">
                    <Statusorder status={order.status} text={text} />
                  </td>
                  <td className="p-2 w-24">
                    <div className="flex min-w-24 items-center justify-center gap-2">
                      <button
                        onClick={showeditorder}
                        className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {totalPages > limit && (
          <div className="flex w-full justify-end">
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
      {editorder && (
        <>
          <div className="bg-white w-[600px] center-fixed flex flex-col rounded-2xl shadow-xl z-50">
            <div className="px-4 h-16 flex items-center">
              <p className="text-xl font-semibold w-full">Chi Tiết Đơn Hàng</p>
            </div>
            <div className="p-4 flex gap-3 flex-col border-y border-gray-200">
              <div className="flex flex-wrap gap-3">
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Mã Đơn Hàng:</p>
                  <p className="text-sm font-normal">DH321313</p>
                </div>
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Tên Người Nhận:</p>
                  <p className="text-sm font-normal">Nguyễn Văn A</p>
                </div>
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Người nhận hàng:</p>
                  <p className="text-sm font-normal">Nguyễn Văn A</p>
                </div>
                <div className="flex w-[278px] gap-1.5">
                  <p className="text-sm font-medium">Số điện thoại:</p>
                  <p className="text-sm font-normal">0979799797</p>
                </div>
                <div className="flex w-full gap-1.5">
                  <p className="text-sm font-medium">Tỉnh/Thành phố:</p>
                  <p className="text-sm font-normal">
                    TP. Hồ Chí Minh , Quận 12, Phường Tân Thới Hiệp
                  </p>
                </div>
                <div className="flex w-full gap-1.5">
                  <p className="text-sm font-medium">Địa chỉ cụ thể:</p>
                  <p className="text-sm font-normal">
                    Hẻm 14 Đường Nguyễn Thị Đặng
                  </p>
                </div>
                <div className="flex flex-col w-[278px] gap-0.5">
                  <p className="text-sm font-medium">Trạng Thái Đơn Hàng:</p>
                  <Select
                    className="h-[28px] w-full shadow-md rounded"
                    defaultValue="Chờ xác nhận"
                    onChange={handleChange}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                </div>
                <div className="flex w-full gap-1.5">
                  <p className="text-sm font-medium">Loại địa chỉ:</p>
                  <p className="text-sm font-bold text-primary">Nhà riêng</p>
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
                <div className="flex gap-2 items-center border-t border-gray-200">
                  <div className="flex w-full items-center gap-2.5">
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                      alt=""
                      className="w-16 h-16"
                    />
                    <div className="flex py-1.5 flex-col gap-1.5">
                      <p className="text-sm font-normal">
                        Iphone 16 Pro Max | Chính hãng VN/A - 256GB - TiTan Sa
                        Mạc
                      </p>
                      <div className="flex gap-1.5 items-center">
                        <p className="text-sm font-normal text-red-500 ">
                          32.790.000 đ
                        </p>
                        <del className="text-xs font-normal">32.790.000 đ</del>
                      </div>
                    </div>
                  </div>
                  <p className="min-w-24 text-center text-sm font-normal">1</p>
                  <p className="min-w-24 text-center text-primary text-sm font-normal">
                    32.790.000 đ
                  </p>
                </div>
                <div className="flex gap-2 items-center border-t border-gray-200">
                  <div className="flex w-full items-center gap-2.5">
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                      alt=""
                      className="w-16 h-16"
                    />
                    <div className="flex py-1.5 flex-col gap-1.5">
                      <p className="text-sm font-normal">
                        Iphone 16 Pro Max | Chính hãng VN/A - 256GB - TiTan Sa
                        Mạc
                      </p>
                      <div className="flex gap-1.5 items-center">
                        <p className="text-sm font-normal text-red-500 ">
                          32.790.000 đ
                        </p>
                        <del className="text-xs font-normal">32.790.000 đ</del>
                      </div>
                    </div>
                  </div>
                  <p className="min-w-24 text-center text-sm font-normal">1</p>
                  <p className="min-w-24 text-center text-primary text-sm font-normal">
                    32.790.000 đ
                  </p>
                </div>
                <div className="flex gap-2 items-center border-t border-gray-200">
                  <div className="flex w-full items-center gap-2.5">
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                      alt=""
                      className="w-16 h-16"
                    />
                    <div className="flex py-1.5 flex-col gap-1.5">
                      <p className="text-sm font-normal">
                        Iphone 16 Pro Max | Chính hãng VN/A - 256GB - TiTan Sa
                        Mạc
                      </p>
                      <div className="flex gap-1.5 items-center">
                        <p className="text-sm font-normal text-red-500 ">
                          32.790.000 đ
                        </p>
                        <del className="text-xs font-normal">32.790.000 đ</del>
                      </div>
                    </div>
                  </div>
                  <p className="min-w-24 text-center text-sm font-normal">1</p>
                  <p className="min-w-24 text-center text-primary text-sm font-normal">
                    32.790.000 đ
                  </p>
                </div>
                <div className="flex gap-2 items-center border-t border-gray-200">
                  <div className="flex w-full items-center gap-2.5">
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                      alt=""
                      className="w-16 h-16"
                    />
                    <div className="flex py-1.5 flex-col gap-1.5">
                      <p className="text-sm font-normal">
                        Iphone 16 Pro Max | Chính hãng VN/A - 256GB - TiTan Sa
                        Mạc
                      </p>
                      <div className="flex gap-1.5 items-center">
                        <p className="text-sm font-normal text-red-500 ">
                          32.790.000 đ
                        </p>
                        <del className="text-xs font-normal">32.790.000 đ</del>
                      </div>
                    </div>
                  </div>
                  <p className="min-w-24 text-center text-sm font-normal">1</p>
                  <p className="min-w-24 text-center text-primary text-sm font-normal">
                    32.790.000 đ
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 h-[64px] items-center justify-end flex gap-4">
              <div className="flex gap-4">
                <p
                  onClick={closeeditorder}
                  className="cursor-pointer px-6 w-[114px] h-[40px] bg-red-100 text-red-800 text-sm font-bold flex items-center justify-center rounded"
                >
                  Trở lại
                </p>
                <p className="px-6 w-[114px] h-[40px] bg-green-100 text-green-800 text-sm font-bold flex items-center justify-center rounded">
                  Lưu
                </p>
              </div>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      )}
    </>
  );
}

export default OrderList;
