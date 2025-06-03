"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCategory } from "react-icons/bi";
import {
  BsBoxSeam,
  BsClipboardCheck,
  BsSpeedometer2,
  BsTags,
} from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { TbFileDatabase, TbLogout2 } from "react-icons/tb";
import React from "react";
import { SiBrandfolder } from "react-icons/si";
import { useLifecycles } from "react-use";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import config from "@/config";
import { useStore, actions, initState } from "@/store";

function Sidebar() {
  const [state, dispatch] = useStore();

  useLifecycles(() => dispatch(actions.load()));

  const pathname = usePathname();

  const [user, setUser] = useState({
    fullname: "",
    avatar: "",
    email: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("admin");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <aside className="w-64 fixed top-0 left-0 bottom-0 bg-slate-800 px-3 py-6 flex flex-col gap-3">
      {state.load ? (
        state.load
      ) : (
        <>
          <div className="w-full center-flex flex-col gap-1">
            <div className="w-20 h-20 p-1.5 rounded-full border-2 border-white center-flex">
              <img
                src={
                  user.avatar ||
                  "https://static.vecteezy.com/system/resources/thumbnails/013/360/247/small/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg"
                }
                alt=""
                className="w-full h-full rounded-full object-fill"
              />
            </div>
            <div className="text-base font-bold text-white">
              {user.fullname}
            </div>
            <p className="text-sm font-medium text-white">
              Chào mừng bạn trở lại
            </p>
          </div>
          <hr />
          <div
            className="h-full flex flex-col overflow-auto gap-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Link
              href={config.routes.admin.dashboard}
              className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
                pathname.startsWith("/admin/dashboard") ? "pl-7 bg-white" : ""
              } transition-all duration-300	rounded-md cursor-pointer select-none`}
            >
              <BsSpeedometer2
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/dashboard")
                    ? "text-primary"
                    : "text-white"
                } w-6 h-6`}
              />
              <p
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/dashboard")
                    ? "text-primary"
                    : "text-white"
                } text-sm font-bold`}
              >
                Bảng điều khiểu
              </p>
            </Link>
            <Link
              href={config.routes.admin.order.list}
              className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
                pathname.startsWith("/admin/order") ? "pl-7 bg-white" : ""
              } transition-all duration-300	rounded-md cursor-pointer select-none`}
            >
              <BsClipboardCheck
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/order")
                    ? "text-primary"
                    : "text-white"
                } w-6 h-6`}
              />
              <p
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/order")
                    ? "text-primary"
                    : "text-white"
                } text-sm font-bold`}
              >
                Quản lý đơn hàng
              </p>
            </Link>
            <Link
              href={config.routes.admin.product.list}
              className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
                pathname.startsWith("/admin/product") ? "pl-7 bg-white" : ""
              } transition-all duration-300	rounded-md cursor-pointer select-none`}
            >
              <BsBoxSeam
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/product")
                    ? "text-primary"
                    : "text-white"
                } w-6 h-6`}
              />
              <p
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/product")
                    ? "text-primary"
                    : "text-white"
                } text-sm font-bold`}
              >
                Quản lý sản phẩm
              </p>
            </Link>
            <Link
              href={config.routes.admin.user.list}
              className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
                pathname.startsWith("/admin/user") ? "pl-7 bg-white" : ""
              } transition-all duration-300	rounded-md cursor-pointer select-none`}
            >
              <LuUser
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/user")
                    ? "text-primary"
                    : "text-white"
                } w-6 h-6`}
              />
              <p
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/user")
                    ? "text-primary"
                    : "text-white"
                } text-sm font-bold`}
              >
                Quản lý người dùng
              </p>
            </Link>
            <Link
              href={config.routes.admin.category.list}
              className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
                pathname.startsWith("/admin/category") ? "pl-7 bg-white" : ""
              } transition-all duration-300	rounded-md cursor-pointer select-none`}
            >
              <BiCategory
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/category")
                    ? "text-primary"
                    : "text-white"
                } w-6 h-6`}
              />
              <p
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/category")
                    ? "text-primary"
                    : "text-white"
                } text-sm font-bold`}
              >
                Quản lý danh mục
              </p>
            </Link>
            <Link
              href={config.routes.admin.configuration.list}
              className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
                pathname.startsWith("/admin/configuration")
                  ? "pl-7 bg-white"
                  : ""
              } transition-all duration-300	rounded-md cursor-pointer select-none`}
            >
              <TbFileDatabase
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/configuration")
                    ? "text-primary"
                    : "text-white"
                } w-6 h-6`}
              />
              <p
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/configuration")
                    ? "text-primary"
                    : "text-white"
                } text-sm font-bold`}
              >
                Quản lý cấu hình
              </p>
            </Link>
            <Link
              href={config.routes.admin.brand.list}
              className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
                pathname.startsWith("/admin/brand") ? "pl-7 bg-white" : ""
              } transition-all duration-300	rounded-md cursor-pointer select-none`}
            >
              <SiBrandfolder
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/brand")
                    ? "text-primary"
                    : "text-white"
                } w-6 h-6`}
              />
              <p
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/brand")
                    ? "text-primary"
                    : "text-white"
                } text-sm font-bold`}
              >
                Quản lý thương hiệu
              </p>
            </Link>
            <Link
              href={config.routes.admin.voucher.list}
              className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
                pathname.startsWith("/admin/voucher") ? "pl-7 bg-white" : ""
              } transition-all duration-300	rounded-md cursor-pointer select-none`}
            >
              <BsTags
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/voucher")
                    ? "text-primary"
                    : "text-white"
                } w-6 h-6`}
              />
              <p
                className={`group-hover:text-primary ${
                  pathname.startsWith("/admin/voucher")
                    ? "text-primary"
                    : "text-white"
                } text-sm font-bold`}
              >
                Quản lý voucher
              </p>
            </Link>
            <Link
              href={config.routes.admin.login}
              onClick={() => {
                localStorage.removeItem("admin");
                Cookies.remove("access_token_admin");
                Cookies.remove("refresh_token_admin");
                dispatch(actions.set({ ...initState, load: false }));
              }}
              className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white transition-all duration-300	rounded-md cursor-pointer select-none`}
            >
              <TbLogout2
                className={`group-hover:text-primary w-6 h-6 text-white `}
              />
              <p
                className={`group-hover:text-primary text-white text-sm font-bold`}
              >
                Đăng xuất
              </p>
            </Link>
          </div>
        </>
      )}
    </aside>
  );
}

export default Sidebar;
