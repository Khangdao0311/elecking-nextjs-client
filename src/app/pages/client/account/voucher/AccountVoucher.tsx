"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import { SlTag } from "react-icons/sl";
import { TbMoodEmpty } from "react-icons/tb";

import * as voucherServices from "@/app/services/voucherService";
import { useStore } from "@/app/store";
import Shimmer from "@/app/components/client/Shimmer";

function AccountVoucher() {
  const [state, dispatch] = useStore();
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);

  useEffect(() => {
    voucherServices.getQuery({ expired: 0, limit: 0, user_id: state.user?.id }).then((res) => {
      if (res.status === 200) setVouchers(res.data);
    });
  }, [state.user]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl md:text-2xl font-bold uppercase">Danh Sách Voucher Của Bạn</h2>
      <div className="w-full grid md:grid-cols-2 gap-4 ">
        {state.load && (
          <>
            <div className="flex items-start gap-5 p-2.5 relative rounded-lg shadow-xl w-full border border-gray-200 overflow-hidden">
              <Shimmer className="w-20 h-20 shrink-0" image />

              <div className="flex flex-col gap-2 flex-1">
                <Shimmer className="w-28 h-5 shrink-0" />
                <Shimmer className="w-40 h-5 shrink-0" />
                <Shimmer className="w-56 h-5 shrink-0" />
                <em className="flex justify-end w-full pt-1 right-0 text-sm font-light text-gray-700">
                  <Shimmer className="w-28 h-6 shrink-0" />
                </em>
              </div>

              <span className="absolute top-0 right-0 rounded-bl-lg overflow-hidden">
                <Shimmer className="w-14 h-5 shrink-0 rounded-none" />
              </span>
            </div>
            <div className="flex items-start gap-5 p-2.5 relative rounded-lg shadow-xl w-full border border-gray-200 overflow-hidden">
              <Shimmer className="w-20 h-20 shrink-0" image />

              <div className="flex flex-col gap-2 flex-1">
                <Shimmer className="w-28 h-5 shrink-0" />
                <Shimmer className="w-40 h-5 shrink-0" />
                <Shimmer className="w-56 h-5 shrink-0" />
                <em className="flex justify-end w-full pt-1 right-0 text-sm font-light text-gray-700">
                  <Shimmer className="w-28 h-6 shrink-0" />
                </em>
              </div>

              <span className="absolute top-0 right-0 rounded-bl-lg overflow-hidden">
                <Shimmer className="w-14 h-5 shrink-0 rounded-none" />
              </span>
            </div>
            <div className="flex items-start gap-5 p-2.5 relative rounded-lg shadow-xl w-full border border-gray-200 overflow-hidden">
              <Shimmer className="w-20 h-20 shrink-0" image />

              <div className="flex flex-col gap-2 flex-1">
                <Shimmer className="w-28 h-5 shrink-0" />
                <Shimmer className="w-40 h-5 shrink-0" />
                <Shimmer className="w-56 h-5 shrink-0" />
                <em className="flex justify-end w-full pt-1 right-0 text-sm font-light text-gray-700">
                  <Shimmer className="w-28 h-6 shrink-0" />
                </em>
              </div>

              <span className="absolute top-0 right-0 rounded-bl-lg overflow-hidden">
                <Shimmer className="w-14 h-5 shrink-0 rounded-none" />
              </span>
            </div>
            <div className="flex items-start gap-5 p-2.5 relative rounded-lg shadow-xl w-full border border-gray-200 overflow-hidden">
              <Shimmer className="w-20 h-20 shrink-0" image />

              <div className="flex flex-col gap-2 flex-1">
                <Shimmer className="w-28 h-5 shrink-0" />
                <Shimmer className="w-40 h-5 shrink-0" />
                <Shimmer className="w-56 h-5 shrink-0" />
                <em className="flex justify-end w-full pt-1 right-0 text-sm font-light text-gray-700">
                  <Shimmer className="w-28 h-6 shrink-0" />
                </em>
              </div>

              <span className="absolute top-0 right-0 rounded-bl-lg overflow-hidden">
                <Shimmer className="w-14 h-5 shrink-0 rounded-none" />
              </span>
            </div>
          </>
        )}
        {!state.load && vouchers.length === 0 && (
          <div className="w-full min-h-80 center-flex flex-col gap-2">
            <TbMoodEmpty className="w-36 h-36 text-gray-300" />
            <p className="text-3xl text-gray-400 font-medium">Không có Voucher !</p>
          </div>
        )}
        {vouchers.map((voucher: IVoucher, iVoucher: number) => (
          <div
            key={iVoucher}
            className="flex items-start gap-5 p-2.5 relative rounded-lg shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center justify-center w-20 h-20 bg-primary rounded">
              <SlTag className="w-1/2 h-1/2 text-white" />
            </div>
            <div className="flex flex-1 flex-col ">
              <div className="text-base text-primary font-bold">{voucher.code}</div>
              <div className="flex gap-1 items-center">
                <p className="text-base text-red-500 font-bold">
                  Giảm:{" "}
                  {voucher.discount_type === 1
                    ? `${voucher.discount_value.toLocaleString("vi-VN")} đ`
                    : `${voucher.discount_value} %`}
                </p>
                {voucher.discount_type === 2 && (
                  <span className="text-sm font-normal text-gray-600">
                    tối đa {voucher.max_discount.toLocaleString("vi-VN")} đ
                  </span>
                )}
              </div>

              <div className="text-sm font-normal text-gray-700">
                Đơn hàng tối thiểu: <em>{voucher.min_order_value.toLocaleString("vi-VN")} đ</em>
              </div>
              <em className="w-full text-end pt-1 right-0 text-sm font-light text-gray-700">
                HSD: {moment(voucher.end_date, "YYYYMMDDHHmmss").format("DD/MM/YYYY")}
              </em>
            </div>
            <span className="absolute top-0 right-0 bg-red-100 text-primary text-sm font-bold px-4 py-0.5 rounded-bl-lg shadow">
              x {voucher.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountVoucher;
