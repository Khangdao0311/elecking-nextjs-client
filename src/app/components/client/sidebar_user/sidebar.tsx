"use client";

import { FaHome } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import config from "@/app/config";

function sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-[308px] items-center bg-white shadow shadow-xd rounded-lg gap-4 p-4">
      <Link
        href={config.routes.client.account}
        className={`px-2.5 w-full h-[50px] py-[5px] justify-center flex hover:pl-7 items-center gap-5 hover:bg-primary rounded-lg ${
          pathname.startsWith("/account/home") ? "pl-7 bg-white" : ""
        } transition-all duration-300 rounded-md cursor-pointer select-none`}
      >
        <FaHome
          className={` group-hover:text-white w-[24px] h-[24px] ${
            pathname.startsWith("/account")
              ? "text-black" 
              : "text-white"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname.startsWith("/account") ? "text-white" : "text-black"
            }
            `}
        >
          Trang Chủ
        </p>
      </Link>
    </div>
  );
}
export default sidebar;
