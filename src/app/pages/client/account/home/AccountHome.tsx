"use client";
import images from "@/app/assets/image";
import Sidebar from "@/app/components/client/sidebar_user";
import { FaAngleRight, FaFireFlameCurved, FaUser } from "react-icons/fa6";
function AccountHome() {
  return (
    <>
      <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <Sidebar />
        <div className="w-[956px] flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gray-300 w-[92px] h-[92px] rounded-full flex items-center justify-center">
              <FaUser className="w-[45px] h-[45px]" />
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-xl font-bold">Nguyễn Đặng</p>
              <p className="text-sm font-semibold">0976232323</p>
            </div>
          </div>
          <div className="py-4 flex border-gray-200 border shadow-md ">
            <div className="w-[478px] border-r-[1px] border-r-gray-200">
              <p className="text-xl font-bold w-full text-center">3</p>
              <p className="text-base font-normal w-full text-center">
                đơn hàng
              </p>
            </div>
            <div className="w-[478px] ">
              <p className="text-xl font-bold w-full text-center">
                65.580.000 đ
              </p>
              <p className="text-base font-normal w-full text-center">
                Tổng tiền đã tích lũy
              </p>
            </div>
          </div>
          <div className="w-full">
            <img src={images.banneruserhome} alt="" className="w-full" />
          </div>
          <div className="bg-primary flex-col gap-4 p-4">
            <div className="flex justify-between items-center px-2">
              <div className="flex gap-1">
                <div className="w-[48px] h-[48px]">
                  <FaFireFlameCurved className="text-white w-[33px] h-[42px]" />
                </div>
                <p className="text-4xl font-bold text-white">HOT SALE</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-base font-medium underline text-white shadow-sm">
                  Xem tất cả
                </p>
                <FaAngleRight className="text-white w-5 h-5" />
              </div>
            </div>
            <div >

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountHome;
