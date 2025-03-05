"use client";

import { GoArrowLeft } from "react-icons/go";

function ForgotPassword() {
  return <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
    <div className="w-[524px] p-10 shadow-xl">
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-28">
        <div className=" text-primary"><GoArrowLeft className="w-6 h-6" /></div>
        <div className="text-2xl font-bold text-primary">Quên mật khẩu</div>
      </div>
      <div className="flex flex-col gap-2 mx-auto">
        <div className="text-base font-medium">Email / Số điện thoại</div>
        <div className="text-sm font-normal text-gray-500 pt-4 pr-[228px] pb-4 pl-4 border border-gray-200 rounded">Nhập email hoặc số điện thoại</div>
      </div>
      <div className="text-lg text-center font-bold text-white pt-2.5 pb-2.5 pl-[180px] pr-[180px] bg-primary rounded">Tiếp theo</div>
    </div>
    </div>
  </div>;
}

export default ForgotPassword;
