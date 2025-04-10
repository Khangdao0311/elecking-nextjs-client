"use client";

import { useEffect, useState } from "react";
import { BsFillClipboard2CheckFill, BsFillClipboard2XFill } from "react-icons/bs";
import { TbMoodEmpty } from "react-icons/tb";
import { Modal } from "antd";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";

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
  const [totalOrder, setTotalOrder] = useState<any>();
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
        .then((res) => {
          setOrders(res.data);
          setTotalOrder(res.totalOrder);
        });
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
        // closable={false}/
        width="auto"
      >
        <OrderDetail
          order={order!}
          setProductOrder={setProductOrder}
          onReview={() => setShow({ detail: false, review: true })}
          onClose={() => setShow({ detail: false, review: false })}
        />
      </Modal>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold uppercase">Lịch Sử Mua Hàng</h2>

        {state.load ? (
          <div className="flex w-full gap-4 overflow-hidden">
            <Shimmer className="w-1/5 h-11" />
            <Shimmer className="w-1/5 h-11" />
            <Shimmer className="w-1/5 h-11" />
            <Shimmer className="w-1/5 h-11" />
            <Shimmer className="w-1/5 h-11" />
          </div>
        ) : (
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={16}
            navigation={{
              nextEl: "#next",
              prevEl: "#prev",
            }}
            freeMode={true}
            modules={[FreeMode]}
            className="w-full flex gap-2.5 flex-wrap"
          >
            <SwiperSlide
              onClick={() => {
                if (status !== "") setStatus("");
              }}
              className={`${
                status === ""
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
              } px-6 py-2.5 text-base font-medium border rounded-lg select-none shadow-lg !w-auto`}
            >
              Tất cả ({totalOrder?.["all"] || 0})
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                if (status !== "2") setStatus("2");
              }}
              className={`${
                status === "2"
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
              } px-6 py-2.5 text-base font-medium border rounded-lg select-none shadow-lg !w-auto`}
            >
              Chờ xác nhận ({totalOrder?.["2"] || 0})
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                if (status !== "3") setStatus("3");
              }}
              className={`${
                status === "3"
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
              } px-6 py-2.5 text-base font-medium border rounded-lg select-none shadow-lg !w-auto`}
            >
              Đã xác nhận ({totalOrder?.["3"] || 0})
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                if (status !== "4") setStatus("4");
              }}
              className={`${
                status === "4"
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
              } px-6 py-2.5 text-base font-medium border rounded-lg select-none shadow-lg !w-auto`}
            >
              Đang vận chuyển ({totalOrder?.["4"] || 0})
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                if (status !== "1") setStatus("1");
              }}
              className={`${
                status === "1"
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
              } px-6 py-2.5 text-base font-medium border rounded-lg select-none shadow-lg !w-auto`}
            >
              Đã nhận ({totalOrder?.["1"] || 0})
            </SwiperSlide>
            <SwiperSlide
              onClick={() => {
                if (status !== "0") setStatus("0");
              }}
              className={`${
                status === "0"
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer"
              } px-6 py-2.5 text-base font-medium border rounded-lg select-none shadow-lg !w-auto`}
            >
              Đã hủy ({totalOrder?.["0"] || 0})
            </SwiperSlide>
          </Swiper>
        )}

        <div className="w-full flex flex-col gap-4 relative">
          {/*  */}

          {state.load && (
            <>
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300">
                <div className="flex gap-4 flex-1">
                  <Shimmer className={"w-20 sm:w-28 aspect-square shrink-0"} image />

                  <div className="flex flex-col items-start gap-2 flex-1">
                    <Shimmer className={"w-full h-6"} />
                    <Shimmer className={"w-3/4 sm:w-1/3 h-6"} />
                    <Shimmer className={"w-1/2 sm:w-1/4 h-9"} />
                  </div>
                </div>
                <div className="flex items-center justify-end sm:items-end sm:justify-center shrink-0">
                  <Shimmer className={"w-36 h-11"} />
                </div>
                <em className="absolute top-auto right-auto bottom-0 left-0   sm:top-0 sm:right-0 sm:bottom-auto sm:left-auto p-4">
                  <Shimmer className={"w-36 h-6"} />
                </em>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300">
                <div className="flex gap-4 flex-1">
                  <Shimmer className={"w-20 sm:w-28 aspect-square shrink-0"} image />

                  <div className="flex flex-col items-start gap-2 flex-1">
                    <Shimmer className={"w-full h-6"} />
                    <Shimmer className={"w-3/4 sm:w-1/3 h-6"} />
                    <Shimmer className={"w-1/2 sm:w-1/4 h-9"} />
                  </div>
                </div>
                <div className="flex items-center justify-end sm:items-end sm:justify-center shrink-0">
                  <Shimmer className={"w-36 h-11"} />
                </div>
                <em className="absolute top-auto right-auto bottom-0 left-0   sm:top-0 sm:right-0 sm:bottom-auto sm:left-auto p-4">
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
                    <g clipPath="url(#clip0_553_8)">
                      <path
                        d="M14.25 0C14.4489 0 14.6397 0.0790176 14.7803 0.21967C14.921 0.360322 15 0.551088 15 0.75C15 0.948912 15.079 1.13968 15.2197 1.28033C15.3603 1.42098 15.5511 1.5 15.75 1.5C15.9489 1.5 16.1397 1.57902 16.2803 1.71967C16.421 1.86032 16.5 2.05109 16.5 2.25V3C16.5 3.19891 16.421 3.38968 16.2803 3.53033C16.1397 3.67098 15.9489 3.75 15.75 3.75H8.25C8.05109 3.75 7.86032 3.67098 7.71967 3.53033C7.57902 3.38968 7.5 3.19891 7.5 3V2.25C7.5 2.05109 7.57902 1.86032 7.71967 1.71967C7.86032 1.57902 8.05109 1.5 8.25 1.5C8.44891 1.5 8.63968 1.42098 8.78033 1.28033C8.92098 1.13968 9 0.948912 9 0.75C9 0.551088 9.07902 0.360322 9.21967 0.21967C9.36032 0.0790176 9.55109 0 9.75 0L14.25 0Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.1275 2H5.25C4.65326 2 4.08097 2.23705 3.65901 2.65901C3.23705 3.08097 3 3.65326 3 4.25V22.25C3 22.8467 3.23705 23.419 3.65901 23.841C4.08097 24.2629 4.65326 24.5 5.25 24.5H18.75C19.3467 24.5 19.919 24.2629 20.341 23.841C20.7629 23.419 21 22.8467 21 22.25V4.25C21 3.65326 20.7629 3.08097 20.341 2.65901C19.919 2.23705 19.3467 2 18.75 2H17.8725C17.9565 2.236 17.999 2.486 18 2.75V3.5C18 4.09674 17.7629 4.66903 17.341 5.09099C16.919 5.51295 16.3467 5.75 15.75 5.75H8.25C7.65326 5.75 7.08097 5.51295 6.65901 5.09099C6.23705 4.66903 6 4.09674 6 3.5V2.75C5.99962 2.49458 6.04274 2.24095 6.1275 2ZM8.36562 19.2494C8.21754 19.2787 8.06898 19.3056 7.92 19.33C7.795 19.35 7.7 19.22 7.74937 19.1038C7.80487 18.9729 7.85573 18.8401 7.90188 18.7056L7.90375 18.6994C8.05875 18.2494 8.185 17.7319 8.23125 17.25C7.46437 16.4812 7 15.475 7 14.375C7 11.9588 9.23875 10 12 10C14.7613 10 17 11.9588 17 14.375C17 16.7913 14.7613 18.75 12 18.75C11.5048 18.7507 11.0116 18.6864 10.5331 18.5588C10.2081 18.7231 9.50875 19.0225 8.36562 19.2494Z"
                        fill="white"
                      />
                      <path
                        d="M11.9455 12.6195C11.9455 12.5571 11.922 12.4972 11.8802 12.453C11.8385 12.4089 11.7818 12.384 11.7227 12.384C11.6637 12.384 11.607 12.4089 11.5652 12.453C11.5235 12.4972 11.5 12.5571 11.5 12.6195V15.2095C11.5 15.251 11.5104 15.2918 11.5301 15.3277C11.5498 15.3636 11.5782 15.3933 11.6123 15.4139L13.1714 16.3557C13.2225 16.385 13.2825 16.3919 13.3384 16.375C13.3943 16.3581 13.4418 16.3188 13.4707 16.2654C13.4995 16.212 13.5075 16.1488 13.4928 16.0893C13.4782 16.0298 13.4421 15.9787 13.3923 15.947L11.9455 15.073V12.6195Z"
                        fill="white"
                      />
                      <path
                        d="M14.25 0C14.4489 0 14.6397 0.0790176 14.7803 0.21967C14.921 0.360322 15 0.551088 15 0.75C15 0.948912 15.079 1.13968 15.2197 1.28033C15.3603 1.42098 15.5511 1.5 15.75 1.5C15.9489 1.5 16.1397 1.57902 16.2803 1.71967C16.421 1.86032 16.5 2.05109 16.5 2.25V3C16.5 3.19891 16.421 3.38968 16.2803 3.53033C16.1397 3.67098 15.9489 3.75 15.75 3.75H8.25C8.05109 3.75 7.86032 3.67098 7.71967 3.53033C7.57902 3.38968 7.5 3.19891 7.5 3V2.25C7.5 2.05109 7.57902 1.86032 7.71967 1.71967C7.86032 1.57902 8.05109 1.5 8.25 1.5C8.44891 1.5 8.63968 1.42098 8.78033 1.28033C8.92098 1.13968 9 0.948912 9 0.75C9 0.551088 9.07902 0.360322 9.21967 0.21967C9.36032 0.0790176 9.55109 0 9.75 0L14.25 0Z"
                        stroke="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.1275 2H5.25C4.65326 2 4.08097 2.23705 3.65901 2.65901C3.23705 3.08097 3 3.65326 3 4.25V22.25C3 22.8467 3.23705 23.419 3.65901 23.841C4.08097 24.2629 4.65326 24.5 5.25 24.5H18.75C19.3467 24.5 19.919 24.2629 20.341 23.841C20.7629 23.419 21 22.8467 21 22.25V4.25C21 3.65326 20.7629 3.08097 20.341 2.65901C19.919 2.23705 19.3467 2 18.75 2H17.8725C17.9565 2.236 17.999 2.486 18 2.75V3.5C18 4.09674 17.7629 4.66903 17.341 5.09099C16.919 5.51295 16.3467 5.75 15.75 5.75H8.25C7.65326 5.75 7.08097 5.51295 6.65901 5.09099C6.23705 4.66903 6 4.09674 6 3.5V2.75C5.99962 2.49458 6.04274 2.24095 6.1275 2ZM8.36562 19.2494C8.21754 19.2787 8.06898 19.3056 7.92 19.33C7.795 19.35 7.7 19.22 7.74937 19.1038C7.80487 18.9729 7.85573 18.8401 7.90188 18.7056L7.90375 18.6994C8.05875 18.2494 8.185 17.7319 8.23125 17.25C7.46437 16.4812 7 15.475 7 14.375C7 11.9588 9.23875 10 12 10C14.7613 10 17 11.9588 17 14.375C17 16.7913 14.7613 18.75 12 18.75C11.5048 18.7507 11.0116 18.6864 10.5331 18.5588C10.2081 18.7231 9.50875 19.0225 8.36562 19.2494Z"
                        stroke="white"
                      />
                      <path
                        d="M11.9455 12.6195C11.9455 12.5571 11.922 12.4972 11.8802 12.453C11.8385 12.4089 11.7818 12.384 11.7227 12.384C11.6637 12.384 11.607 12.4089 11.5652 12.453C11.5235 12.4972 11.5 12.5571 11.5 12.6195V15.2095C11.5 15.251 11.5104 15.2918 11.5301 15.3277C11.5498 15.3636 11.5782 15.3933 11.6123 15.4139L13.1714 16.3557C13.2225 16.385 13.2825 16.3919 13.3384 16.375C13.3943 16.3581 13.4418 16.3188 13.4707 16.2654C13.4995 16.212 13.5075 16.1488 13.4928 16.0893C13.4782 16.0298 13.4421 15.9787 13.3923 15.947L11.9455 15.073V12.6195Z"
                        stroke="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_553_8">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                );
                break;
              case 3:
                status.color = "blue";
                status.text = "Đã xác nhận";
                status.icon = (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-2xl w-1/2 h-1/2"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_553_10)">
                      <path
                        d="M14.25 0C14.4489 0 14.6397 0.0790176 14.7803 0.21967C14.921 0.360322 15 0.551088 15 0.75C15 0.948912 15.079 1.13968 15.2197 1.28033C15.3603 1.42098 15.5511 1.5 15.75 1.5C15.9489 1.5 16.1397 1.57902 16.2803 1.71967C16.421 1.86032 16.5 2.05109 16.5 2.25V3C16.5 3.19891 16.421 3.38968 16.2803 3.53033C16.1397 3.67098 15.9489 3.75 15.75 3.75H8.25C8.05109 3.75 7.86032 3.67098 7.71967 3.53033C7.57902 3.38968 7.5 3.19891 7.5 3V2.25C7.5 2.05109 7.57902 1.86032 7.71967 1.71967C7.86032 1.57902 8.05109 1.5 8.25 1.5C8.44891 1.5 8.63968 1.42098 8.78033 1.28033C8.92098 1.13968 9 0.948912 9 0.75C9 0.551088 9.07902 0.360322 9.21967 0.21967C9.36032 0.0790176 9.55109 0 9.75 0L14.25 0Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.1275 2H5.25C4.65326 2 4.08097 2.23705 3.65901 2.65901C3.23705 3.08097 3 3.65326 3 4.25V22.25C3 22.8467 3.23705 23.419 3.65901 23.841C4.08097 24.2629 4.65326 24.5 5.25 24.5H18.75C19.3467 24.5 19.919 24.2629 20.341 23.841C20.7629 23.419 21 22.8467 21 22.25V4.25C21 3.65326 20.7629 3.08097 20.341 2.65901C19.919 2.23705 19.3467 2 18.75 2H17.8725C17.9565 2.236 17.999 2.486 18 2.75V3.5C18 4.09674 17.7629 4.66903 17.341 5.09099C16.919 5.51295 16.3467 5.75 15.75 5.75H8.25C7.65326 5.75 7.08097 5.51295 6.65901 5.09099C6.23705 4.66903 6 4.09674 6 3.5V2.75C5.99962 2.49458 6.04274 2.24095 6.1275 2ZM8.36562 19.2494C8.21754 19.2787 8.06898 19.3056 7.92 19.33C7.795 19.35 7.7 19.22 7.74937 19.1038C7.80487 18.9729 7.85573 18.8401 7.90188 18.7056L7.90375 18.6994C8.05875 18.2494 8.185 17.7319 8.23125 17.25C7.46437 16.4812 7 15.475 7 14.375C7 11.9588 9.23875 10 12 10C14.7613 10 17 11.9588 17 14.375C17 16.7913 14.7613 18.75 12 18.75C11.5048 18.7507 11.0116 18.6864 10.5331 18.5588C10.2081 18.7231 9.50875 19.0225 8.36562 19.2494Z"
                        fill="white"
                      />
                      <path
                        d="M14.0833 12.9753C14.1948 13.0925 14.1948 13.2824 14.0833 13.3996L11.7975 15.7996C11.686 15.9167 11.5051 15.9167 11.3935 15.7996L10.2506 14.5996C10.139 14.4824 10.139 14.2925 10.2506 14.1753C10.3622 14.0582 10.5431 14.0582 10.6547 14.1753L11.5955 15.1632L13.6792 12.9753C13.7908 12.8582 13.9717 12.8582 14.0833 12.9753Z"
                        fill="white"
                      />
                      <path
                        d="M14.25 0C14.4489 0 14.6397 0.0790176 14.7803 0.21967C14.921 0.360322 15 0.551088 15 0.75C15 0.948912 15.079 1.13968 15.2197 1.28033C15.3603 1.42098 15.5511 1.5 15.75 1.5C15.9489 1.5 16.1397 1.57902 16.2803 1.71967C16.421 1.86032 16.5 2.05109 16.5 2.25V3C16.5 3.19891 16.421 3.38968 16.2803 3.53033C16.1397 3.67098 15.9489 3.75 15.75 3.75H8.25C8.05109 3.75 7.86032 3.67098 7.71967 3.53033C7.57902 3.38968 7.5 3.19891 7.5 3V2.25C7.5 2.05109 7.57902 1.86032 7.71967 1.71967C7.86032 1.57902 8.05109 1.5 8.25 1.5C8.44891 1.5 8.63968 1.42098 8.78033 1.28033C8.92098 1.13968 9 0.948912 9 0.75C9 0.551088 9.07902 0.360322 9.21967 0.21967C9.36032 0.0790176 9.55109 0 9.75 0L14.25 0Z"
                        stroke="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.1275 2H5.25C4.65326 2 4.08097 2.23705 3.65901 2.65901C3.23705 3.08097 3 3.65326 3 4.25V22.25C3 22.8467 3.23705 23.419 3.65901 23.841C4.08097 24.2629 4.65326 24.5 5.25 24.5H18.75C19.3467 24.5 19.919 24.2629 20.341 23.841C20.7629 23.419 21 22.8467 21 22.25V4.25C21 3.65326 20.7629 3.08097 20.341 2.65901C19.919 2.23705 19.3467 2 18.75 2H17.8725C17.9565 2.236 17.999 2.486 18 2.75V3.5C18 4.09674 17.7629 4.66903 17.341 5.09099C16.919 5.51295 16.3467 5.75 15.75 5.75H8.25C7.65326 5.75 7.08097 5.51295 6.65901 5.09099C6.23705 4.66903 6 4.09674 6 3.5V2.75C5.99962 2.49458 6.04274 2.24095 6.1275 2ZM8.36562 19.2494C8.21754 19.2787 8.06898 19.3056 7.92 19.33C7.795 19.35 7.7 19.22 7.74937 19.1038C7.80487 18.9729 7.85573 18.8401 7.90188 18.7056L7.90375 18.6994C8.05875 18.2494 8.185 17.7319 8.23125 17.25C7.46437 16.4812 7 15.475 7 14.375C7 11.9588 9.23875 10 12 10C14.7613 10 17 11.9588 17 14.375C17 16.7913 14.7613 18.75 12 18.75C11.5048 18.7507 11.0116 18.6864 10.5331 18.5588C10.2081 18.7231 9.50875 19.0225 8.36562 19.2494Z"
                        stroke="white"
                      />
                      <path
                        d="M14.0833 12.9753C14.1948 13.0925 14.1948 13.2824 14.0833 13.3996L11.7975 15.7996C11.686 15.9167 11.5051 15.9167 11.3935 15.7996L10.2506 14.5996C10.139 14.4824 10.139 14.2925 10.2506 14.1753C10.3622 14.0582 10.5431 14.0582 10.6547 14.1753L11.5955 15.1632L13.6792 12.9753C13.7908 12.8582 13.9717 12.8582 14.0833 12.9753Z"
                        stroke="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_553_10">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                );
                break;
              case 4:
                status.color = "gray";
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
                className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300"
                key={iOrder}
              >
                <div className="flex gap-4 flex-1">
                  <div className="h-full flex items-start shrink-0">
                    <div className="bg-primary text-white aspect-square w-20 sm:w-28 rounded-lg flex items-center justify-center">
                      {status.icon}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 flex-1">
                    <div className="flex  w-full gap-2">
                      <p className="text-base hidden sm:flex font-bold text-gray-700 shrink-0">
                        Sản phẩm
                      </p>
                      <div className="flex flex-col gap-1">
                        {order.products.map((productOrder: any, iProductOrder: number) => (
                          <p key={iProductOrder} className="text-base font-medium text-gray-700">
                            {productOrder.product.name} / x{productOrder.quantity}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex  gap-2">
                      <p className="text-base hidden sm:flex font-bold text-gray-700">Tổng tiền</p>
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
                </div>
                <div className="flex items-center justify-end sm:items-end sm:justify-center shrink-0">
                  <div
                    onClick={() => {
                      setOrder(order);
                      setShow({ detail: true, review: false });
                    }}
                    className="px-6 py-1.5 sm:py-2 border border-primary rounded cursor-pointer select-none"
                  >
                    <p className="text-base font-bold text-primary text-nowrap">Xem chi tiết</p>
                  </div>
                </div>
                <em className="absolute top-auto right-auto bottom-0 left-0   sm:top-0 sm:right-0 sm:bottom-auto sm:left-auto p-4 text-gray-700">
                  {moment(order.ordered_at, "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm")}
                </em>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AccountOrder;
