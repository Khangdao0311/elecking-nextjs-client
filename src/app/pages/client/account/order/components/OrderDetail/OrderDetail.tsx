"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";

import config from "@/app/config";
import * as orderServices from "@/app/services/orderService";
import { useStore, actions } from "@/app/store";

function OrderDetail(props: { order: IOrder; setProductOrder: any; onReview: any; onClose: any }) {
  const [state, dispatch] = useStore();
  const router = useRouter();

  let status: any = {};
  switch (props.order?.status) {
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
      status.button = !props.order.payment_status && !props.order.transaction_code && (
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
    orderServices.updateStatus(props.order!.id, 0).then((res) => {
      if (res.status === 200) {
        props.onClose();
        dispatch(actions.re_render());
      }
    });
  }

  function handleBuyAgain() {
    const checkout: any = {
      order: props.order?.products.map((e) => ({
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
    router.push(config.routes.client.checkout);
  }

  return (
    <div className="flex flex-col gap-4 w-[600px] ">
      <h2 className="text-xl font-bold uppercase">CHI TIẾT ĐƠN HÀNG</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex gap-2">
          <p className="text-base font-normal">Tên người nhận:</p>
          <span className="text-base font-base font-bold uppercase">
            {props.order?.address.fullname}
          </span>
        </div>
        <div className="flex gap-2">
          <p className="text-base font-normal">Số điện thoại:</p>
          <span className="text-base font-base font-bold uppercase">
            {props.order?.address.phone}
          </span>
        </div>
        <div className="flex text-base font-medium col-span-2 gap-2">
          <p className="text-base font-normal shrink-0">Địa chỉ:</p>
          <span className="text-base font-base font-bold">
            {props.order?.address.province.name}, {props.order?.address.district.name},{" "}
            {props.order?.address.ward.name} <br /> {props.order?.address.description}
          </span>
        </div>

        <div className="flex gap-2 col-span-2 items-center">
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
            {props.order?.total.toLocaleString("vi-VN")} đ
          </span>
        </div>
        {props.order.payment_status && props.order.transaction_code && (
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
        {props.order?.products.map((item, index) => (
          <SwiperSlide
            key={index}
            className="!flex w-full gap-4 p-4 rounded-lg bg-white drop-shadow-xl border border-gray-300 relative"
          >
            <div className="w-24 h-24 rounded-lg">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <p className="text-base font-medium text-black">{item.product.name}</p>
              <p className="text-base font-medium text-black">Số Lượng: {item.quantity}</p>
              <p className="text-base font-bold text-red-500">
                {item.product.price.toLocaleString("vi-VN")} đ
              </p>
            </div>
            {props.order?.status === 1 && !item.reviewed && (
              <div
                onClick={() => {
                  props.setProductOrder(item);
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
      {/* <div className="flex flex-col w-full max-h-[500px] gap-2"></div> */}
      <div className="flex items-center justify-end gap-4 w-full">{status.button}</div>
    </div>
  );
}

export default OrderDetail;
