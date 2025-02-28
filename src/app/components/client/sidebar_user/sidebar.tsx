"use client";

import { FaHome } from "react-icons/fa";
import { IoBagCheckOutline, IoLocationOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import config from "@/app/config";
import { FaGift, FaUser } from "react-icons/fa6";
import { CiLock, CiLogout } from "react-icons/ci";

function sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-3/12 items-center bg-white border border-gray-200 min-h-[550px] shadow-md rounded-lg gap-4 p-4">
      <Link
        href={config.routes.client.account}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex hover:pl-7 items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.account ? "pl-7 bg-primary" : ""
        } transition-all duration-300 rounded-md cursor-pointer select-none`}
      >
        <FaHome
          className={` group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.account
              ? "text-white" 
              : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.account ? "text-white" : "text-black"
            }
            `}
        >
          Trang Chủ
        </p>
      </Link>
      <Link
        href={config.routes.client.accountOrder}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex hover:pl-7 items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.accountOrder ? "pl-7 bg-primary" : ""
        } transition-all duration-300 rounded-md cursor-pointer select-none`}
      >
        <IoBagCheckOutline
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.accountOrder
              ? "text-white" 
              : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.accountOrder ? "text-white" : "text-black"
            }
            `}
        >
          Lịch Sử Mua Hàng
        </p>
      </Link>
      <Link
        href={config.routes.client.accountOrder}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex hover:pl-7 items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.accountOrder ? "pl-7 bg-primary" : ""
        } transition-all duration-300 rounded-md cursor-pointer select-none`}
      >
        <FaGift
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.accountOrder
              ? "text-white" 
              : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.accountOrder ? "text-white" : "text-black"
            }
            `}
        >
          Voucher
        </p>
      </Link>
      <Link
        href={config.routes.client.accountProfile}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex hover:pl-7 items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.accountProfile ? "pl-7 bg-primary" : ""
        } transition-all duration-300 rounded-md cursor-pointer select-none`}
      >
        <FaUser
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.accountProfile
              ? "text-white" 
              : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.accountProfile ? "text-white" : "text-black"
            }
            `}
        >
          Tài Khoản Của Bạn
        </p>
      </Link>
      <Link
        href={config.routes.client.accountAddress}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex hover:pl-7 items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.accountAddress ? "pl-7 bg-primary" : ""
        } transition-all duration-300 rounded-md cursor-pointer select-none`}
      >
        <IoLocationOutline
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.accountAddress
              ? "text-white" 
              : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.accountAddress ? "text-white" : "text-black"
            }
            `}
        >
          Địa Chỉ Của Tôi
        </p>
      </Link>
      <Link
        href={config.routes.client.accountPassword}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex hover:pl-7 items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.accountPassword ? "pl-7 bg-primary" : ""
        } transition-all duration-300 rounded-md cursor-pointer select-none`}
      >
        <CiLock
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.accountPassword
              ? "text-white" 
              : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.accountPassword ? "text-white" : "text-black"
            }
            `}
        >
          Đổi Mật Khẩu
        </p>
      </Link>
      <Link
        href={config.routes.admin.login}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex hover:pl-7 items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.admin.login ? "pl-7 bg-primary" : ""
        } transition-all duration-300 rounded-md cursor-pointer select-none`}
      >
        <CiLogout
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.admin.login
              ? "text-white" 
              : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.admin.login ? "text-white" : "text-black"
            }
            `}
        >
          Đăng Xuất
        </p>
      </Link>
    </div>
  );
}
export default sidebar;
