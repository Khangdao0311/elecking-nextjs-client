"use client";

import { useEffect, useState } from "react";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { Modal } from "antd";
import moment from "moment";

import { useStore } from "@/app/store";
import SidebarAccount from "@/app/components/client/SidebarAccount";
import * as orderServices from "@/app/services/orderService";
import OrderDetail from "./components/OrderDetail";

function AccountOrder() {
  const [state, dispatch] = useStore();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    if (state.user) {
      orderServices
        .getQuery({ user_id: state.user.id, limit: null })
        .then((res) => setOrders(res.data));
    }
  }, [state.user]);

  console.log(order);

  return (
    <>
      <Modal
        open={!!order}
        onCancel={() => setOrder(null)}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        // closable={false}
        width="auto"
      >
        <OrderDetail order={order} />
      </Modal>
      <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 bg">
        <div className="w-3/12 bg-slate-50 rounded-xl p-4">
          <SidebarAccount />
        </div>
        <div className="w-9/12 flex flex-col gap-6 rounded-xl min-h-[calc(100vh-190px)]">
          <h2 className="text-2xl font-bold uppercase">Lịch Sử Mua Hàng</h2>
          <div className="w-full flex gap-2.5 flex-wrap">
            <div className="px-10 py-2.5 text-base font-medium border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200  ">
              Tất cả
            </div>
            <div className="px-10 py-2.5 text-base font-medium border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200  ">
              Chờ xác nhận
            </div>
            <div className="px-10 py-2.5 text-base font-medium border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200  ">
              Đang vận chuyển
            </div>
            <div className="px-10 py-2.5 text-base font-medium border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200  ">
              Đã nhận
            </div>
            <div className="px-10 py-2.5 text-base font-medium border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200  ">
              Đã hủy
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 relative">
            {/*  */}
            {orders.map((order: IOrder, iOrder: number) => {
              let status: any = {};
              switch (order.status) {
                case 0:
                  status.color = "red";
                  status.text = "Đã hủy";
                  break;
                case 1:
                  status.color = "green";
                  status.text = "Đã giao hàng";
                  break;
                case 2:
                  status.color = "yellow";
                  status.text = "Chờ xác nhận";
                  break;
                case 3:
                  status.color = "blue";
                  status.text = "Đang vận chuyển";
                  break;
                default:
                  break;
              }
              return (
                <div
                  key={iOrder}
                  className="flex items-start gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300"
                >
                  <div className="h-full flex items-start shrink-0">
                    <div className="bg-primary text-white aspect-square w-28 rounded-lg flex items-center justify-center">
                      <BsFillClipboard2CheckFill className="text-2xl w-1/2 h-1/2" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex w-full gap-2">
                      <p className="text-base font-bold text-gray-700">Sản phẩm</p>
                      <div className="flex flex-col gap-1">
                        {order.products.map((productOrder: any, iProductOrder: number) => (
                          <p key={iProductOrder} className="text-base font-medium text-gray-700">
                            {productOrder.product.name} / x{productOrder.quantity}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <p className="text-base font-bold text-gray-700">Tổng tiền</p>
                      <span className="text-base font-bold text-red-500">
                        {order.total.toLocaleString("vi-VN")} đ
                      </span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className={`px-6 py-2 rounded-lg bg-${status.color}-100 select-none`}>
                        <p className={`text-sm font-medium text-${status.color}-800`}>
                          {status.text}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end h-full shrink-0">
                    <div
                      onClick={() => setOrder(order)}
                      className="px-6 py-2 border border-primary rounded cursor-pointer select-none"
                    >
                      <p className="text-base font-bold text-primary text-nowrapF">Xem chi tiết</p>
                    </div>
                  </div>
                  <em className="absolute top-0 right-0 p-4 text-gray-700">
                    {moment(order.ordered_at, "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm")}
                  </em>
                </div>
              );
            })}
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountOrder;
