"use client";

import { useEffect, useState } from "react";
import { SlTag } from "react-icons/sl";
import { TbTicket } from "react-icons/tb";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import * as voucherService from "@/app/services/voucherService";

function ModalVoucher(props: { voucher: string; setVoucher: any; onClose: any }) {
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<string>(props.voucher);

  useEffect(() => {
    voucherService.getQuery({ limit: 0 }).then((res: any) => setVouchers(res.data));
  }, []);

  return (
    <div className="flex flex-col gap-5 h-[70vh]">
      <div className="flex items-center w-full gap-3 bg-white rounded-t-2xl shrink-0">
        <TbTicket className="w-8 h-8 text-blue-600 " />
        <h2 className="text-blue-600 font-bold text-lg flex items-center">KHUYẾN MÃI</h2>
      </div>

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
        className="!h-full !w-full"
      >
        {vouchers.map((voucher, index) => {
          // const isDisabled = totalPrice < voucher?.min_order_value;

          return (
            <SwiperSlide key={index} className="!h-24">
              <div
                className={`flex relative items-center border justify-between rounded-lg p-2 h-full shadow-lg cursor-pointer
                     border-gray-300
                      bg-white
                  `}
                onClick={() => {
                  if (selectedVoucher === voucher.id) {
                    setSelectedVoucher("");
                  } else {
                    setSelectedVoucher(voucher.id);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white w-16 h-16 rounded-lg flex items-center justify-center">
                    <SlTag className="text-2xl" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-primary text-base font-semibold">
                      Giảm {(voucher?.discount_value).toLocaleString("vn-VN")} đ
                    </p>
                    <p className="text-xs font-light text-gray-500">
                      Đơn Tối Thiểu {(voucher?.min_order_value).toLocaleString("vn-VN")} đ
                    </p>
                    <p className="text-xs font-light text-gray-500">
                      HSD: <span>{moment(voucher?.end_date, "YYYYMMDD").format("DD/MM/YYYY")}</span>
                    </p>
                  </div>
                </div>
                <input
                  checked={selectedVoucher === voucher.id}
                  readOnly
                  type="radio"
                  name="coupon"
                  className="w-5 h-5 accent-primary"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="flex justify-end gap-2.5 shrink-0  ">
        <div
          className="px-10 text-base font-normal py-2.5 border rounded-lg text-primary border-primary cursor-pointer"
          onClick={() => {
            props.onClose();
            setSelectedVoucher(props.voucher);
          }}
        >
          Hủy
        </div>
        <div
          onClick={() => {
            props.onClose();
            props.setVoucher(selectedVoucher);
          }}
          className="px-10 text-base font-bold py-2.5 bg-primary text-white rounded-lg cursor-pointer"
        >
          Chọn
        </div>
      </div>
    </div>
  );
}

export default ModalVoucher;
