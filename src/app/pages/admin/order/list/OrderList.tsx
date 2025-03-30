"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { Modal } from 'antd';
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Select } from "antd";
import * as orderServices from "@/app/services/orderService";
import Statusorder from "@/app/pages/admin/Components/Status";
import moment from "moment";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import type { TableProps } from "antd";
import { notification } from 'antd';
import config from "@/app/config";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import Loading from "@/app/components/client/Loading";

function OrderList() {
  const [editorder, setEditorder] = useState(false);
  const closeeditorder = () => setEditorder(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder>();
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<number | string>("");
  const [selectedStatus, setSelectedStatus] = useState(selectedOrder?.status);
  const [state, dispatch] = useStore();

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: any, description: any) => {
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

  const showEditOrder = (orderId: string) => {
    const order = orders.find(order => order.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setSelectedStatus(order.status);
      setEditorder(true);
    }
  };

  useEffect(() => {
    if (!editorder) {
      const query: any = {};
      query.limit = limit;
      query.page = page;
      query.status = status;

      if (search !== "") {
        query.search = search;
      }

      orderServices.getQuery(query).then((res) => {
        const sortedOrders = res.data.sort((a: IOrder, b: IOrder) => {
          if (a.status === 2 && b.status !== 2) return -1;
          if (a.status !== 2 && b.status === 2) return 1;
          return 0;
        });
        setOrders(sortedOrders);
        setTotalPages(res.total);
      });
    }
  }, [limit, page, search, status, editorder]);

  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 5) return undefined;
    return { x: 1000, y: "max-content" };
  };

  const columns: TableProps<IOrder>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Mã Đơn Hàng",
      dataIndex: "id",
      key: "id",
      width: 140,
    },
    {
      title: "Ngày Đặt Hàng",
      dataIndex: "ordered_at",
      key: "ordered_at",
      width: 160,
      render: (date) => moment(date, "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Khách Hàng",
      dataIndex: "user",
      key: "user",
      width: 200,
      render: (user) => user.fullname,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: 150,
      render: (total) => `${(+total).toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Mã giao dịch",
      dataIndex: "transaction_code",
      key: "transaction_code",
      width: 120,
      align: "center",
      render: (code) => <span className="line-clamp-1">{code || "Không có"}</span>,
    },
    {
      title: "Phương Thức Thanh Toán",
      dataIndex: "payment_method",
      key: "payment_method",
      align: 'center',
      width: 230,
      render: (payment) => payment.name || "N/A",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      align: "center",
      render: (status) => {
        let text = "";
        switch (status) {
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
            text = "Đã xác nhận";
            break;
          case 4:
            text = "Đang vận chuyển";
            break;
          default:
            text = "Không xác định";
        }
        return <Statusorder status={status} text={text} />;
      },
    },
    {
      title: "Chức năng",
      key: "action",
      width: 120,
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

  return (
    <>
      {state.load && <Loading />}
      {state.load ? "" : <>
        <TitleAdmin title="Quản lý đơn hàng" />
        <Boxsearchlimit
          title="đơn hàng"
          onLimitChange={(newLimit: any) => {
            setLimit(newLimit);
            setPage(1);
          }}
          status={status}
          setStatus={setStatus}

        />
        <div className="flex flex-col min-h-0">

          <div className=" bg-white shadow-xl min-h-0 justify-between px-4 py-4 flex items-start flex-col gap-4">
            <div style={{ width: "100%", overflowX: "auto", maxWidth: "100%" }}>
              <Table<IOrder>
                columns={columns}
                dataSource={orders}
                rowKey="id"
                scroll={getTableScroll(orders.length)}
                pagination={false}
                tableLayout="auto"
              />
            </div>
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
        </div>
      </>}

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
                    value={selectedStatus}
                    disabled={selectedOrder?.status === 0 || selectedOrder?.status === 1}
                    onChange={(value) => {
                      setSelectedStatus(Number(value));
                    }}
                    options={[
                      { value: 2, label: "Chờ xác nhận", disabled: ![2].includes(selectedOrder?.status) },
                      { value: 3, label: "Đã xác nhận", disabled: ![2, 3].includes(selectedOrder?.status) },
                      { value: 4, label: "Đang vận chuyển", disabled: ![2, 3, 4].includes(selectedOrder?.status) },
                      { value: 1, label: "Đã giao hàng" },
                      { value: 0, label: "Hủy đơn" }
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
                {selectedOrder.products.map((e, index) => (
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
                      {selectedOrder.total.toLocaleString("vn-VN")} đ
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
                    openNotificationWithIcon("success", "Thành công", "Sửa trạng thái thành công");
                    orderServices.updateStatus(selectedOrder.id, Number(selectedStatus))
                      .then(() => {
                        setOrders((prevOrders) =>
                          prevOrders.map((order) =>
                            order.id === selectedOrder.id
                              ? { ...order, status: Number(selectedStatus) }
                              : order
                          )
                        );
                        closeeditorder();
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
    </>
  );
}

export default OrderList;
