"use client";
import Sidebar from "@/app/components/client/Sidebar_user";
import { FaUser } from "react-icons/fa6";

function AccountProfile() {
  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex gap-4">
      <Sidebar />
      <div className="flex flex-col justify-center w-9/12 border border-gray-200 shadow-xl rounded-lg px-[108px]">
        <div className="w-[740px] flex justify-center items-center">
          <div className="flex flex-col gap-4 justify-center items-center w-[308px]">
            <div className="rounded-full bg-gray-300 w-[93px] h-[93px] py-7 px-7 flex items-center justify-center">
              <FaUser className="w-16 h-16 text-white" />
            </div>
            <p className="text-lg font-bold">Nguyễn Đặng</p>
          </div>
        </div>
        <form>
          <div className="flex justify-center items-center gap-4 border-b-[1px]">
            <p className="text-right text-base font-bold">Họ và Tên: </p>
            <p className="text-base font-normal">Nguyễn Đặng</p>
          </div>
          <div className="flex justify-center items-center gap-4 border-b-[1px]">
            <p className="text-right text-base font-bold">Email: </p>
            <p className="text-base font-normal">Email@gmail.com</p>
          </div>
          <div className="flex justify-center items-center gap-4 border-b-[1px]">
            <p className="text-right text-base font-bold">Giới tính: </p>
            <p className="text-base font-normal">Nam</p>
          </div>
          <div className="flex justify-center items-center gap-4 border-b-[1px]">
            <p className="text-right text-base font-bold">Số điện thoại: </p>
            <p className="text-base font-normal">0123456789</p>
          </div>
          <div className="flex justify-center items-center gap-4 border-b-[1px]">
            <p className="text-right text-base font-bold">Ngày tham gia : </p>
            <p className="text-base font-normal">01/01/2025</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountProfile;
