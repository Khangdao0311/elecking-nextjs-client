"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaGift, FaUser } from "react-icons/fa6";
import { CiLock, CiLogout } from "react-icons/ci";
import { IoBagCheckOutline, IoLocationOutline } from "react-icons/io5";

import config from "@/app/config";
import { useWindowScroll } from "@uidotdev/usehooks";
import { useStore, actions, initState } from "@/app/store";
import Cookies from "js-cookie";

function SidebarAccount() {
  const [state, dispatch] = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [scroll] = useWindowScroll();
  const { x, y } = scroll as { x: number; y: number };

  return (
    <div
      className={`sticky ${
        y < 100 ? "top-[172px]" : "top-32"
      } transition-all duration-200 w-full  flex flex-col items-center rounded-lg gap-4`}
    >
      <Link
        href={config.routes.client.account.home}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.account.home ? "bg-primary" : ""
        } transition-all duration-300 rounded-lg cursor-pointer select-none`}
      >
        <FaHome
          className={` group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.account.home ? "text-white" : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.account.home ? "text-white" : "text-black"
          }
            `}
        >
          Trang Chủ
        </p>
      </Link>
      <Link
        href={config.routes.client.account.order}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.account.order ? "bg-primary" : ""
        } transition-all duration-300 rounded-lg cursor-pointer select-none`}
      >
        <IoBagCheckOutline
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.account.order ? "text-white" : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.account.order ? "text-white" : "text-black"
          }
            `}
        >
          Lịch Sử Mua Hàng
        </p>
      </Link>
      <Link
        href={config.routes.client.account.voucher}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.account.voucher ? "bg-primary" : ""
        } transition-all duration-300 rounded-lg cursor-pointer select-none`}
      >
        <FaGift
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.account.voucher ? "text-white" : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.account.voucher ? "text-white" : "text-black"
          }
            `}
        >
          Voucher
        </p>
      </Link>
      <Link
        href={config.routes.client.account.profile}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.account.profile ? "bg-primary" : ""
        } transition-all duration-300 rounded-lg cursor-pointer select-none`}
      >
        <FaUser
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.account.profile ? "text-white" : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.account.profile ? "text-white" : "text-black"
          }
            `}
        >
          Tài Khoản Của Bạn
        </p>
      </Link>
      <Link
        href={config.routes.client.account.address}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.account.address ? "bg-primary" : ""
        } transition-all duration-300 rounded-lg cursor-pointer select-none`}
      >
        <IoLocationOutline
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.account.address ? "text-white" : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.account.address ? "text-white" : "text-black"
          }
            `}
        >
          Địa Chỉ Của Tôi
        </p>
      </Link>
      <Link
        href={config.routes.client.account.password}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex items-center gap-5 hover:bg-primary rounded-lg ${
          pathname == config.routes.client.account.password ? "bg-primary" : ""
        } transition-all duration-300 rounded-lg cursor-pointer select-none`}
      >
        <CiLock
          className={`group-hover:text-white w-[24px] h-[24px] ${
            pathname == config.routes.client.account.password ? "text-white" : "text-black"
          }`}
        />
        <p
          className={`text-sm group-hover:text-white font-bold text-black w-[132px] ${
            pathname == config.routes.client.account.password ? "text-white" : "text-black"
          }
            `}
        >
          Đổi Mật Khẩu
        </p>
      </Link>
      <Link
        onClick={() => {
          localStorage.removeItem("user");
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          dispatch(actions.set({ ...initState, load: false }));
        }}
        href={config.routes.client.login}
        className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex items-center gap-5 hover:bg-primary transition-all duration-300 rounded-lg cursor-pointer select-none`}
      >
        <CiLogout className={`group-hover:text-white w-[24px] h-[24px] text-black`} />
        <p className={`text-sm group-hover:text-white font-bold text-black w-[132px]`}>Đăng Xuất</p>
      </Link>
    </div>
  );
}
export default SidebarAccount;
