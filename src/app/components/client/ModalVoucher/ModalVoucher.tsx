"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import { SlTag } from "react-icons/sl";
import { TbTicket } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import * as voucherServices from "@/app/services/voucherService";

function ModalVoucher({ orderPrice, voucher, setVoucher, onClose }: any) {
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | null>(voucher);

  useEffect(() => {
    voucherServices.getQuery({ limit: 0 }).then((res: any) => {
      if (res.status === 200) setVouchers(res.data);
    });
  }, []);

  return (
    <div className="w-[80vw] max-w-[500px] flex flex-col gap-5 h-[60vh]">
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
        {vouchers.map((eVoucher: IVoucher, iVoucher) => {
          return (
            <SwiperSlide
              key={iVoucher}
              className={`!h-28 !flex relative items-center border justify-between rounded-lg p-2.5 shadow-lg cursor-pointer border-gray-300bg-white ${
                orderPrice < eVoucher.min_order_value ? "opacity-45" : ""
              }
                  `}
              onClick={() => {
                if (orderPrice >= eVoucher.min_order_value) {
                  if (selectedVoucher?.id === eVoucher.id) {
                    setSelectedVoucher(null);
                  } else {
                    setSelectedVoucher(eVoucher);
                  }
                }
              }}
            >
              <div className="flex h-full items-center gap-4">
                <div className="bg-primary text-white aspect-square h-20 rounded-lg flex items-center justify-center">
                  <SlTag className="text-2xl w-1/2 h-1/2" />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-primary text-base font-semibold">
                    {`Giảm ${(eVoucher?.discount_value).toLocaleString("vn-VN")}${
                      eVoucher.discount_type == 1 ? "đ" : "%"
                    }`}
                  </p>
                  <p className="text-sm text-gray-500">
                    Đơn Tối Thiểu {(eVoucher?.min_order_value).toLocaleString("vn-VN")} đ
                  </p>
                  {eVoucher.discount_type === 2 && (
                    <p className="text-sm text-gray-500">
                      Giảm Tối Đa {(eVoucher?.max_discount).toLocaleString("vn-VN")} đ
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    HSD: <span>{moment(eVoucher?.end_date, "YYYYMMDD").format("DD/MM/YYYY")}</span>
                  </p>
                </div>
              </div>
              <input
                checked={selectedVoucher?.id === eVoucher.id}
                readOnly
                type="radio"
                name="coupon"
                className="w-5 h-5 accent-primary"
              />
              <span className="absolute top-0 right-0 bg-red-100 text-primary text-sm font-bold px-4 py-0.5 rounded-bl-lg shadow">
                x {eVoucher.quantity}
              </span>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="flex justify-end gap-2.5 shrink-0  ">
        <div
          className="px-10 text-base font-normal py-2.5 border rounded-lg text-primary border-primary cursor-pointer"
          onClick={() => {
            onClose();
            setSelectedVoucher(voucher);
          }}
        >
          Hủy
        </div>
        <div
          onClick={() => {
            if (voucher?.id !== selectedVoucher?.id) {
              setVoucher(selectedVoucher);
            }
            onClose();
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
