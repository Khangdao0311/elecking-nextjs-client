"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import * as paymentServices from "@/app/services/paymentService";

function ModalPaymentMethod({ paymentMethod, setPaymentMethod, onClose }: any) {
  const [paymentMethods, setPaymentMethods] = useState<IPaymment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<IPaymment | null>(paymentMethod);

  useEffect(() => {
    paymentServices
      .getQuery({ limit: 0, orderby: "id-asc" })
      .then((res) => setPaymentMethods(res.data));
  }, []);

  return (
    <div className="w-[500px] flex flex-col gap-4">
      <p className="text-xl py-2 font-bold flex items-center text-thirdary">
        Chọn Phương Thức Thanh Toán
      </p>
      <Swiper
        direction={"vertical"}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        slidesPerView={"auto"}
        spaceBetween={10}
        freeMode={true}
        mousewheel={true}
        modules={[FreeMode, Mousewheel, Autoplay]}
        className="flex flex-col gap-4 h-[500px] w-full"
      >
        {paymentMethods.map((payment: IPaymment, iPayment: number) => (
          <SwiperSlide
            key={iPayment}
            onClick={() => {
              if (selectedPayment?.id !== payment.id) {
                setSelectedPayment(payment);
              }
            }}
            className={`!h-24 !flex !justify-between !items-center border ${
              selectedPayment?.id === payment.id ? "border-primary" : "border-gray-300"
            } rounded-lg p-5 cursor-pointer`}
          >
            <div className="flex gap-4 items-center">
              <img src={payment.image} alt="" className="w-16 h-16" />
              <p className="text-xl font-medium">{payment.name}</p>
            </div>
            <input
              className="w-5 h-5 accent-primary"
              type="radio"
              checked={selectedPayment?.id === payment.id}
              readOnly
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex gap-4 justify-end">
        <p
          onClick={() => {
            setSelectedPayment(paymentMethod);
            onClose();
          }}
          className="px-10 border border-gray-300 py-2 rounded-lg font-bold cursor-pointer"
        >
          Hủy
        </p>
        <p
          onClick={() => {
            if (paymentMethod?.id !== selectedPayment?.id) {
              setPaymentMethod(selectedPayment);
            }
            onClose();
          }}
          className="px-5 bg-primary py-2 rounded-lg font-bold text-white cursor-pointer"
        >
          Xác nhận
        </p>
      </div>
    </div>
  );
}

export default ModalPaymentMethod;
