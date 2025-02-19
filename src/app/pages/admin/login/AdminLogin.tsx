"use client";

import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { TbEyeClosed } from "react-icons/tb";

import LogoMobile from "@/app/assets/LogoMobile";

function AdminLogin() {
  const [show, setShow] = useState(false);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 center-flex gap-5 p-24 border border-gray-300 shadow-2xl rounded-2xl bg-white">
      <LogoMobile className="w-[400px] h-[400px]" />
      <form className="flex flex-col gap-5 w-[400px] bg">
        <h1 className="text-3xl font-bold text-primary text-center">ĐĂNG NHẬP HỆ THỐNG</h1>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium">Tài khoản quản trị</p>
          <input
            type="text"
            placeholder="Nhập tài khoản quản trị"
            className="p-4 text-sm border border-gray-200 rounded outline-primary shadow-xl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium">Mật khẩu</p>
          <div className="w-full relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="w-full p-4 text-sm border border-gray-200 rounded outline-primary shadow-xl"
            />
            <div>
              {show && (
                <IoEye
                  onClick={() => setShow(false)}
                  className="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-600 cursor-pointer select-none"
                />
              )}
              {!show && (
                <TbEyeClosed
                  onClick={() => setShow(true)}
                  className="w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-600 cursor-pointer select-none"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <p className="text-sm font-bold text-blue-500 select-none">Quên mật khẩu ?</p>
        </div>
        <button className="bg-primary h-12 rounded shadow-lg text-white text-lg font-bold">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
