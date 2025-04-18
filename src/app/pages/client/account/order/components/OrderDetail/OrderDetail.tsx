"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

import config from "@/app/config";
import * as authServices from "@/app/services/authService";
import { useStore, actions } from "@/app/store";
import Loading from "@/app/components/client/Loading";
import ModalNotification from "@/app/components/client/Modal/ModalNotification";

function OrderDetail(props: {
  order_id: string;
  setProductOrder: any;
  setIndexReview: any;
  onReview: any;
  onClose: any;
}) {
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>({ status: null, message: "" });
  const [order, setOrder] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    (function callback() {
      authServices.getOrder(props.order_id).then((res) => {
        if (res.status === 200) {
          setOrder(res.data);
        } else if (res.status === 401) {
          const refreshToken = authServices.getRefreshToken();
          if (refreshToken) {
            authServices.getToken(refreshToken).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token", res.data);
                callback();
              } else {
                authServices.clearUser();
                router.push(config.routes.client.login);
                dispatch(actions.re_render());
              }
            });
          }
        }
      });
    })();
  }, [props.order_id, state.re_render]);

  let status: any = {};
  switch (order?.status) {
    case 0:
      status.color = "red";
      status.text = "Đã hủy";
      status.button = (
        <button
          onClick={handleBuyAgain}
          className="px-6 py-2 text-base font-bold text-white border border-primary bg-primary rounded"
        >
          Mua lại
        </button>
      );
      break;
    case 1:
      status.color = "green";
      status.text = "Đã giao hàng";
      status.button = (
        <button
          onClick={handleBuyAgain}
          className="px-6 py-2 text-base font-bold text-white border border-primary bg-primary rounded"
        >
          Mua lại
        </button>
      );
      break;
    case 2:
      status.color = "yellow";
      status.text = "Chờ xác nhận";
      status.button = !order?.payment_status && !order?.transaction_code && (
        <button
          onClick={handleCancelOrder}
          className="px-6 py-2 text-base font-bold text-primary border border-primary rounded"
        >
          Hủy hàng
        </button>
      );
      break;
    case 3:
      status.color = "blue";
      status.text = "Đã xác nhận";
      status.button = <></>;
      break;
    case 4:
      status.color = "gray";
      status.text = "Đang vận chuyển";
      status.button = <></>;
      break;
    default:
      break;
  }

  function handleCancelOrder() {
    setLoading(true);
    (function callback() {
      authServices.cancelOrder(order!.id).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setNotification({ status: true, message: "Đơn hàng đã được hủy !" });
          setTimeout(() => {
            setNotification({ status: null, message: "" });
            dispatch(actions.re_render());
            props.onClose();
          }, 1000);
        } else if (res.status === 401) {
          const refreshToken = authServices.getRefreshToken();
          if (refreshToken) {
            authServices.getToken(refreshToken).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token", res.data);
                callback();
              } else {
                authServices.clearUser();
                router.push(config.routes.client.login);
                dispatch(actions.re_render());
              }
            });
          }
        } else {
          setLoading(false);
          setNotification({ status: false, message: res.message });
          setTimeout(() => {
            setNotification({ status: null, message: "" });
          }, 1000);
        }
      });
    })();
  }

  function handleBuyAgain() {
    const checkout: any = {
      order: order?.products.map((e: any) => ({
        product: {
          id: e.product?.id,
          variant: e.product.variant,
          color: e.product.color,
        },
        quantity: e.quantity,
      })),
      voucher: null,
    };

    localStorage.setItem("checkout", JSON.stringify(checkout));
    dispatch(actions.set_routing(true));
    router.push(config.routes.client.checkout);
  }

  return (
    <>
      {loading && <Loading />}
      <ModalNotification noti={notification} />
      <div className="flex flex-col gap-4 w-full sm:w-[600px] ">
        <h2 className="text-xl font-bold uppercase">CHI TIẾT ĐƠN HÀNG</h2>
        <div className="sm:grid sm:grid-cols-2 gap-2">
          <div className="flex gap-2">
            <p className="text-base font-normal">Tên người nhận:</p>
            <span className="text-base font-base font-bold uppercase">
              {order?.address.fullname}
            </span>
          </div>
          <div className="flex gap-2">
            <p className="text-base font-normal">Số điện thoại:</p>
            <span className="text-base font-base font-bold uppercase">{order?.address.phone}</span>
          </div>
          <div className="flex text-base font-medium col-span-2 gap-2">
            <p className="text-base font-normal shrink-0">Địa chỉ:</p>
            <span className="text-base font-base font-bold">
              {order?.address.province.name}, {order?.address.district.name},{" "}
              {order?.address.ward.name} <br /> {order?.address.description}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 col-span-2 items-center">
            <p className="text-base font-normal shrink-0">Trạng thái thái đơn hàng:</p>
            <div
              className={`px-6 py-2 center-flex shrink-0 rounded-lg bg-${status.color}-100 select-none`}
            >
              <p className={`text-sm font-medium text-${status.color}-800`}>{status.text}</p>
            </div>
          </div>
          <div className="flex gap-2 col-span-2 items-center">
            <p className="text-base font-normal shrink-0">Tổng tiền: </p>
            <span className="text-base font-base font-bold text-primary">
              {order?.total.toLocaleString("vi-VN")} đ
            </span>
          </div>
          {order?.payment_status && order?.transaction_code && (
            <div className="flex text-base font-medium col-span-2 gap-2">
              <p className="text-sm font-medium shrink-0 px-6 py-1 bg-green-100 text-green-800 rounded">
                {" "}
                Đã thanh toán
              </p>
            </div>
          )}
        </div>
        <Swiper
          direction={"vertical"}
          slidesPerView={"auto"}
          spaceBetween={10}
          freeMode={true}
          mousewheel={true}
          modules={[Mousewheel, FreeMode]}
          className="!w-full flex flex-col max-h-[300px] gap-2"
        >
          {order?.products.map((item: any, index: number) => (
            <SwiperSlide
              key={index}
              className="!flex w-full gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300 relative"
            >
              <Link
                href={`${config.routes.client.productDetail}${item.product.id}`}
                className="w-24 h-24 rounded-lg"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                />
              </Link>
              <div className="flex flex-col gap-1.5 w-full">
                <Link
                  href={`${config.routes.client.productDetail}${item.product.id}`}
                  className="text-base font-medium text-black"
                >
                  {item.product.name}
                </Link>
                <p className="text-base font-medium text-black">Số Lượng: {item.quantity}</p>
                <p className="text-base font-bold text-red-500">
                  {item.product.price.toLocaleString("vi-VN")} đ
                </p>
              </div>
              {order?.status === 1 && !item.reviewed && (
                <div
                  onClick={() => {
                    props.setProductOrder(item);
                    props.setIndexReview(index);
                    props.onReview(index);
                    props.onReview();
                  }}
                  className="absolute bottom-4 right-4 px-5 py-2 border border-thirdary text-thirdary rounded text-sm font-medium select-none cursor-pointer "
                >
                  Đánh giá
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-end gap-4 w-full">{status.button}</div>
      </div>
    </>
  );
}

export default OrderDetail;
