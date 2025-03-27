"use client";

import { useEffect, useState } from "react";
import {
  BsFillClipboard2CheckFill,
  BsFillClipboard2Fill,
  BsFillClipboard2XFill,
} from "react-icons/bs";
import { TbMoodEmpty } from "react-icons/tb";
import { Modal } from "antd";
import moment from "moment";

import { useStore } from "@/app/store";
import SidebarAccount from "@/app/components/client/SidebarAccount";
import * as orderServices from "@/app/services/orderService";
import OrderDetail from "./components/OrderDetail";
import Review from "./components/Review";
import Shimmer from "@/app/components/client/Shimmer";

function AccountOrder() {
  const [state, dispatch] = useStore();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [productOrder, setProductOrder] = useState<any>(null);
  const [status, setStatus] = useState<string>("");
  const [show, setShow] = useState({
    detail: false,
    review: false,
  });

  useEffect(() => {
    if (state.user) {
      orderServices
        .getQuery({ user_id: state.user.id, limit: null, status: status })
        .then((res) => setOrders(res.data));
    }
  }, [state.user, status, state.re_render]);

  return (
    <>
      <Modal
        open={show.review}
        onCancel={() => setShow({ detail: true, review: false })}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        closable={false}
        width="auto"
      >
        <Review
          onClose={() => setShow({ detail: false, review: false })}
          order_id={order?.id}
          productOrder={productOrder}
        />
      </Modal>
      <Modal
        open={show.detail}
        onCancel={() => setShow({ detail: false, review: false })}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        // closable={false}
        width="auto"
      >
        <OrderDetail
          order={order!}
          setProductOrder={setProductOrder}
          onReview={() => setShow({ detail: false, review: true })}
          onClose={() => setShow({ detail: false, review: false })}
        />
      </Modal>
      <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 bg">
        <div className="w-3/12 bg-slate-50 rounded-xl p-4">
          <SidebarAccount />
        </div>
        <div className="w-9/12 flex flex-col gap-6 rounded-xl min-h-[calc(100vh-190px)]">
          <h2 className="text-2xl font-bold uppercase">Lịch Sử Mua Hàng</h2>
          <div className="w-full flex gap-2.5 flex-wrap">
            <div
              onClick={() => {
                if (status !== "") setStatus("");
              }}
              className={`${
                status === ""
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
              } px-10 py-2.5 text-base font-medium border rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Tất cả
            </div>
            <div
              onClick={() => {
                if (status !== "2") setStatus("2");
              }}
              className={`${
                status === "2"
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
              } px-10 py-2.5 text-base font-medium border rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Chờ xác nhận
            </div>
            <div
              onClick={() => {
                if (status !== "3") setStatus("3");
              }}
              className={`${
                status === "3"
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
              } px-10 py-2.5 text-base font-medium border rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đang vận chuyển
            </div>
            <div
              onClick={() => {
                if (status !== "1") setStatus("1");
              }}
              className={`${
                status === "1"
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
              } px-10 py-2.5 text-base font-medium border rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đã nhận
            </div>
            <div
              onClick={() => {
                if (status !== "0") setStatus("0");
              }}
              className={`${
                status === "0"
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
              } px-10 py-2.5 text-base font-medium border rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đã hủy
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 relative">
            {/*  */}

            {state.load && (
              <>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300">
                  <Shimmer className={"w-28 h-28 shrink-0"} image />

                  <div className="flex flex-col items-start gap-2 w-full">
                    <Shimmer className={"w-full h-6"} />
                    <Shimmer className={"w-1/3 h-6"} />
                    <Shimmer className={"w-1/4 h-9"} />
                  </div>
                  <div className="flex items-end h-full shrink-0">
                    <Shimmer className={"w-36 h-11"} />
                  </div>
                  <em className="absolute top-0 right-0 p-4 text-gray-700">
                    <Shimmer className={"w-36 h-6"} />
                  </em>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300">
                  <Shimmer className={"w-28 h-28 shrink-0"} image />

                  <div className="flex flex-col items-start gap-2 w-full">
                    <Shimmer className={"w-full h-6"} />
                    <Shimmer className={"w-1/3 h-6"} />
                    <Shimmer className={"w-1/4 h-9"} />
                  </div>
                  <div className="flex items-end h-full shrink-0">
                    <Shimmer className={"w-36 h-11"} />
                  </div>
                  <em className="absolute top-0 right-0 p-4 text-gray-700">
                    <Shimmer className={"w-36 h-6"} />
                  </em>
                </div>
              </>
            )}

            {!state.load && orders.length === 0 && (
              <div className="w-full min-h-80 center-flex flex-col gap-2">
                <TbMoodEmpty className="w-36 h-36 text-gray-300" />
                <p className="text-3xl text-gray-400 font-medium">Không có đơn hàng !</p>
              </div>
            )}

            {orders.map((order: IOrder, iOrder: number) => {
              let status: any = {};
              switch (order.status) {
                case 0:
                  status.color = "red";
                  status.text = "Đã hủy";
                  status.icon = <BsFillClipboard2XFill className="text-2xl w-1/2 h-1/2" />;
                  break;
                case 1:
                  status.color = "green";
                  status.text = "Đã giao hàng";
                  status.icon = <BsFillClipboard2CheckFill className="text-2xl w-1/2 h-1/2" />;
                  break;
                case 2:
                  status.color = "yellow";
                  status.text = "Chờ xác nhận";
                  status.icon = (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-2xl w-1/2 h-1/2"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14.25 0C14.4489 0 14.6397 0.0790176 14.7803 0.21967C14.921 0.360322 15 0.551088 15 0.75C15 0.948912 15.079 1.13968 15.2197 1.28033C15.3603 1.42098 15.5511 1.5 15.75 1.5C15.9489 1.5 16.1397 1.57902 16.2803 1.71967C16.421 1.86032 16.5 2.05109 16.5 2.25V3C16.5 3.19891 16.421 3.38968 16.2803 3.53033C16.1397 3.67098 15.9489 3.75 15.75 3.75H8.25C8.05109 3.75 7.86032 3.67098 7.71967 3.53033C7.57902 3.38968 7.5 3.19891 7.5 3V2.25C7.5 2.05109 7.57902 1.86032 7.71967 1.71967C7.86032 1.57902 8.05109 1.5 8.25 1.5C8.44891 1.5 8.63968 1.42098 8.78033 1.28033C8.92098 1.13968 9 0.948912 9 0.75C9 0.551088 9.07902 0.360322 9.21967 0.21967C9.36032 0.0790176 9.55109 0 9.75 0L14.25 0Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.25 1.5H6.1275C6.04274 1.74095 5.99962 1.99458 6 2.25V3C6 3.59674 6.23705 4.16903 6.65901 4.59099C7.08097 5.01295 7.65326 5.25 8.25 5.25H15.75C16.3467 5.25 16.919 5.01295 17.341 4.59099C17.7629 4.16903 18 3.59674 18 3V2.25C17.999 1.986 17.9565 1.736 17.8725 1.5H18.75C19.3467 1.5 19.919 1.73705 20.341 2.15901C20.7629 2.58097 21 3.15326 21 3.75V21.75C21 22.3467 20.7629 22.919 20.341 23.341C19.919 23.7629 19.3467 24 18.75 24H5.25C4.65326 24 4.08097 23.7629 3.65901 23.341C3.23705 22.919 3 22.3467 3 21.75V3.75C3 3.15326 3.23705 2.58097 3.65901 2.15901C4.08097 1.73705 4.65326 1.5 5.25 1.5ZM9.0925 18.9291L9.0825 18.9313C8.96735 18.9556 8.85183 18.9779 8.736 18.9982C8.6365 19.0154 8.56 18.9039 8.5995 18.8043C8.64353 18.6919 8.68422 18.5781 8.7215 18.463L8.723 18.4571C8.85418 18.0552 8.94208 17.6385 8.985 17.2151C8.3715 16.5561 8 15.6935 8 14.7505C8 12.6792 9.791 11 12 11C14.209 11 16 12.6792 16 14.7505C16 16.8219 14.209 18.501 12 18.501C11.6038 18.5016 11.2093 18.4465 10.8265 18.3371C10.5665 18.478 10.0075 18.7346 9.0925 18.9291Z"
                        fill="white"
                      />
                    </svg>
                  );
                  break;
                case 3:
                  status.color = "blue";
                  status.text = "Đang vận chuyển";
                  status.icon = (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-2xl w-1/2 h-1/2 "
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14.25 0C14.4489 0 14.6397 0.0790176 14.7803 0.21967C14.921 0.360322 15 0.551088 15 0.75C15 0.948912 15.079 1.13968 15.2197 1.28033C15.3603 1.42098 15.5511 1.5 15.75 1.5C15.9489 1.5 16.1397 1.57902 16.2803 1.71967C16.421 1.86032 16.5 2.05109 16.5 2.25V3C16.5 3.19891 16.421 3.38968 16.2803 3.53033C16.1397 3.67098 15.9489 3.75 15.75 3.75H8.25C8.05109 3.75 7.86032 3.67098 7.71967 3.53033C7.57902 3.38968 7.5 3.19891 7.5 3V2.25C7.5 2.05109 7.57902 1.86032 7.71967 1.71967C7.86032 1.57902 8.05109 1.5 8.25 1.5C8.44891 1.5 8.63968 1.42098 8.78033 1.28033C8.92098 1.13968 9 0.948912 9 0.75C9 0.551088 9.07902 0.360322 9.21967 0.21967C9.36032 0.0790176 9.55109 0 9.75 0L14.25 0Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.1275 1.5H5.25C4.65326 1.5 4.08097 1.73705 3.65901 2.15901C3.23705 2.58097 3 3.15326 3 3.75V21.75C3 22.3467 3.23705 22.919 3.65901 23.341C4.08097 23.7629 4.65326 24 5.25 24H18.75C19.3467 24 19.919 23.7629 20.341 23.341C20.7629 22.919 21 22.3467 21 21.75V3.75C21 3.15326 20.7629 2.58097 20.341 2.15901C19.919 1.73705 19.3467 1.5 18.75 1.5H17.8725C17.9565 1.736 17.999 1.986 18 2.25V3C18 3.59674 17.7629 4.16903 17.341 4.59099C16.919 5.01295 16.3467 5.25 15.75 5.25H8.25C7.65326 5.25 7.08097 5.01295 6.65901 4.59099C6.23705 4.16903 6 3.59674 6 3V2.25C5.99962 1.99458 6.04274 1.74095 6.1275 1.5ZM14.2727 12.75H15.6364L17 14.5V16.6875H16.0909C16.0909 17.4137 15.4818 18 14.7273 18C13.9727 18 13.3636 17.4137 13.3636 16.6875H10.6364C10.6364 17.4137 10.0273 18 9.27273 18C8.51818 18 7.90909 17.4137 7.90909 16.6875H7V11.875C7 11.3937 7.40909 11 7.90909 11H14.2727V12.75ZM9.27273 17.3438C8.89545 17.3438 8.59091 17.0506 8.59091 16.6875C8.59091 16.3244 8.89545 16.0312 9.27273 16.0312C9.65 16.0312 9.95455 16.3244 9.95455 16.6875C9.95455 17.0506 9.65 17.3438 9.27273 17.3438ZM15.4091 13.4062L16.3 14.5H14.2727V13.4062H15.4091ZM14.7273 17.3438C14.35 17.3438 14.0455 17.0506 14.0455 16.6875C14.0455 16.3244 14.35 16.0312 14.7273 16.0312C15.1045 16.0312 15.4091 16.3244 15.4091 16.6875C15.4091 17.0506 15.1045 17.3438 14.7273 17.3438Z"
                        fill="white"
                      />
                    </svg>
                  );
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
                      {status.icon}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
                    <div className="flex  w-full gap-2">
                      <p className="text-base font-bold text-gray-700 shrink-0">Sản phẩm</p>
                      <div className="flex flex-col gap-1">
                        {order.products.map((productOrder: any, iProductOrder: number) => (
                          <p key={iProductOrder} className="text-base font-medium text-gray-700">
                            {productOrder.product.name} / x{productOrder.quantity}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex  gap-2">
                      <p className="text-base font-bold text-gray-700">Tổng tiền</p>
                      <span className="text-base font-bold text-red-500">
                        {order.total.toLocaleString("vi-VN")} đ
                      </span>
                    </div>

                    <div
                      className={`px-6 py-2 center-flex rounded-lg bg-${status.color}-100 select-none`}
                    >
                      <p className={`text-sm font-medium text-${status.color}-800`}>
                        {status.text}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end h-full shrink-0">
                    <div
                      onClick={() => {
                        setOrder(order);
                        setShow({ detail: true, review: false });
                      }}
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
