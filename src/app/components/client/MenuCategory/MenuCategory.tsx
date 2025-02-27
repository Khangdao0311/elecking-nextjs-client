"use client";

import Link from "next/link";
import config from "@/app/config";
import { IoPhonePortraitOutline, IoWatch } from "react-icons/io5";
import { FaHeadphones, FaLaptop, FaTabletScreenButton } from "react-icons/fa6";
import { CgScreen } from "react-icons/cg";
import { MdOutlineSurroundSound } from "react-icons/md";

function MenuCategory() {
  return (
    <div className="w-56 z-30 flex flex-col shadow-lg absolute bg-white bottom-0 translate-y-[calc(100%+10px)] rounded-lg overflow-hidden">
      <Link href={config.routes.client.products}>
        <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
          <IoPhonePortraitOutline className="w-6 h-6 group-hover:text-primary" />
          <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
            Điện thoại
          </p>
        </div>
      </Link>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <FaTabletScreenButton className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Máy tính bảng
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <FaLaptop className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Laptop
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <CgScreen className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Màn Hình, Ti Vi
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <FaHeadphones className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Tai Nghe
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <MdOutlineSurroundSound className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Loa
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <IoWatch className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Đồng Hồ Thông Minh
        </p>
      </div>
    </div>
  );
}

export default MenuCategory;
