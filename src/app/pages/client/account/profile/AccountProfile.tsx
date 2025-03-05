"use client";
import Sidebar from "@/app/components/client/Sidebar_user";
import { FaUser } from "react-icons/fa6";

function AccountProfile() {
  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex gap-4">
      <Sidebar />
      <div className="mx-auto w-9/12 border border-gray-200 shadow-xl rounded-lg ">
        <div className="w-[740px] h-[471px] flex flex-col gap-6 justify-center items-center m-auto">
          <div className="flex flex-col gap-4 justify-center items-center w-[308px]">
            <div className="rounded-full bg-gray-300 w-[93px] h-[93px] py-7 px-7 flex items-center justify-center">
              <FaUser className="w-16 h-16 text-white" />
            </div>
            <p className="text-lg font-bold">Nguyễn Đặng</p>
          </div>

          <form className="flex flex-col gap-3 mb-4">
            <div className="flex justify-center items-center gap-4 border-b-[1px] w-full">
              <p className="text-right text-base font-bold w-[350px]">Họ và Tên: </p>
              <p className="text-base font-normal w-[350px]">Nguyễn Đặng</p>
            </div>
            <div className="flex justify-center items-center gap-4 border-b-[1px]">
              <p className="text-right text-base font-bold w-[350px]">Email: </p>
              <p className="text-base font-normal w-[350px]">Email@gmail.com</p>
            </div>
            <div className="flex justify-center items-center gap-4 border-b-[1px]">
              <p className="text-right text-base font-bold w-[350px]">Giới tính: </p>
              <p className="text-base font-normal w-[350px]">Nam</p>
            </div>
            <div className="flex justify-center items-center gap-4 border-b-[1px]">
              <p className="text-right text-base font-bold w-[350px]">Số điện thoại: </p>
              <p className="text-base font-normal w-[350px]">0123456789</p>
            </div>
            <div className="flex justify-center items-center gap-4 border-b-[1px]">
              <p className="text-right text-base font-bold w-[350px]">Ngày tham gia : </p>
              <p className="text-base font-normal w-[350px]">01/01/2025</p>
            </div>
          </form>
          <div className="px-24 py-4 bg-primary rounded-lg w-full">
            <p className="text-base font-bold text-white text-center">
              Cập nhật thông tin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
