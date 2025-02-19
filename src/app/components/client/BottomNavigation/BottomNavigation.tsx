"use client";

import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import Store from "@/app/assets/Store";
import config from "@/app/config";

function BottomNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full h-16 sm:h-20 bg-white border-t border-gray-200 flex justify-between px-3 sm:px-3.5">
      <Link
        href={config.routes.client.home}
        className="center-flex flex-col w-24 sm:w-28 h-full gap-0.5"
      >
        <AiFillHome className="w-7 h-7 sm:w-9 sm:h-9" />
        <p className=" text-xs sm:text-sm font-semibold">Trang chủ</p>
      </Link>
      <div className="center-flex flex-col w-24 sm:w-28 h-full gap-0.5">
        <BiCategory className="w-7 h-7 sm:w-9 sm:h-9" />
        <p className=" text-xs sm:text-sm font-semibold">Danh mục</p>
      </div>
      <Link
        href={config.routes.client.products}
        className="center-flex flex-col w-24 sm:w-28 h-full gap-0.5"
      >
        <Store className="w-7 h-7 sm:w-9 sm:h-9" />
        <p className=" text-xs sm:text-sm font-semibold">Cửa hàng</p>
      </Link>
      <Link
        href={config.routes.client.login}
        className="center-flex flex-col w-24 sm:w-28 h-full gap-0.5"
      >
        <FaCircleUser className="w-7 h-7 sm:w-9 sm:h-9" />
        <p className=" text-xs sm:text-sm font-semibold">Đăng nhập</p>
      </Link>
      <div className="center-flex flex-col w-24 sm:w-28 h-full gap-0.5">
        <HiOutlineDotsHorizontal className="w-7 h-7 sm:w-9 sm:h-9" />
        <p className=" text-xs sm:text-sm font-semibold">Xem thêm</p>
      </div>
    </nav>
  );
}

export default BottomNavigation;
