"use client";
import Sidebar from "@/app/components/client/Sidebar_user";
import { FaCircleUser } from "react-icons/fa6";

function AccountPassword() {
  return <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
    <Sidebar />
    <div className="w-9/12 rounded-lg flex items-center justify-center border border-gray-200 min-h-[550px] shadow-md">
      <div className="w-7/12 flex flex-col gap-8">
        <div className="flex items-center flex-col gap-4">
          <div>
            <FaCircleUser className="w-16 h-16" />
          </div>
          <div className="text-lg font-bold">
            Nguyễn Đặng
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm font-medium">Nhập Mật Khẩu Cũ<span className="text-primary"> *</span></div>
          <input className="p-2 rounded shadow-md" placeholder="Nhập Mật Khẩu Hiện Tại" type="text" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm font-medium">Nhập Mật Khẩu Mới<span className="text-primary"> *</span></div>
          <input className="p-2 rounded shadow-md" placeholder="Nhập Mật Khẩu Mới" type="text" />
          <input className="p-2 rounded shadow-md" placeholder="Xác Nhận Mật Khẩu" type="text" />
        </div>
        <div>
          <div className="px-24 py-4 bg-primary text-center font-text font-bold rounded-lg text-white">
            Xác Nhận
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default AccountPassword;
