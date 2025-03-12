"use client";

import Link from "next/link";
import config from "@/app/config";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaTabletAlt } from "react-icons/fa";
import { FaHeadphones, FaLaptop } from "react-icons/fa6";
import { SlScreenDesktop } from "react-icons/sl";
import { MdOutlineSurroundSound } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";

function MenuCategory({ onClick }: any) {
  return (
    <div className="w-56 z-30 flex flex-col shadow-lg absolute bg-white bottom-0 translate-y-[calc(100%+10px)] rounded-lg overflow-hidden">
      <Link
        href={`${config.routes.client.products}?category=67b6cf1a3a893726b5398574`}
        onClick={onClick}
      >
        <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
          <IoPhonePortraitOutline className="w-6 h-6 group-hover:text-primary" />
          <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
            Điện thoại
          </p>
        </div>
      </Link>
      <Link
        href={`${config.routes.client.products}?category=67b6cf1a3a893726b5398575`}
        onClick={onClick}
      >
        <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
          <FaTabletAlt className="w-6 h-6 group-hover:text-primary" />
          <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
            Máy tính bảng
          </p>
        </div>
      </Link>
      <Link
        href={`${config.routes.client.products}?category=67b6cf1a3a893726b5398576`}
        onClick={onClick}
      >
        <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
          <FaLaptop className="w-6 h-6 group-hover:text-primary" />
          <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
            Laptop
          </p>
        </div>
      </Link>
      <Link
        href={`${config.routes.client.products}?category=67b6cf1a3a893726b5398577-67b6cf1a3a893726b5398578`}
        onClick={onClick}
      >
        <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
          <SlScreenDesktop className="w-6 h-6 group-hover:text-primary" />
          <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
            Màn hình, TiVi
          </p>
        </div>
      </Link>
      <Link
        href={`${config.routes.client.products}?category=67b6cf1a3a893726b5398579`}
        onClick={onClick}
      >
        <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
          <FaHeadphones className="w-6 h-6 group-hover:text-primary" />
          <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
            Tai Nghe
          </p>
        </div>
      </Link>
      <Link
        href={`${config.routes.client.products}?category=67b6cf1a3a893726b539857a`}
        onClick={onClick}
      >
        <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
          <MdOutlineSurroundSound className="w-6 h-6 group-hover:text-primary" />
          <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
            Loa
          </p>
        </div>
      </Link>
      <Link
        href={`${config.routes.client.products}?category=67b6cf1a3a893726b539857b`}
        onClick={onClick}
      >
        <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
          <BsSmartwatch className="w-6 h-6 group-hover:text-primary" />
          <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
            Đồng hồ thông minh
          </p>
        </div>
      </Link>
    </div>
  );
}

export default MenuCategory;
