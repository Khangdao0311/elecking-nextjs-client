"use client";

import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Drawer } from "antd";
import { useState } from "react";
import { useWindowSize } from "react-use";
import { usePathname, useRouter } from "next/navigation";

import Store from "@/app/assets/Store";
import config from "@/app/config";
import { actions, useStore } from "@/app/store";
import Footer from "../Footer";
import MenuCategory from "../MenuCategory";

function BottomNavigation() {
  const [state, dispatch] = useStore();
  const [showDrawer, setShoDrawer] = useState({ more: false, menu: false });

  const { width, height } = useWindowSize();
  const router = useRouter();
  const pathname = usePathname();

  if (width >= 640 && (showDrawer.menu || showDrawer.more))
    setShoDrawer({ more: false, menu: false });

  return (
    <>
      <Drawer
        closable={false}
        height="50vh"
        placement={"bottom"}
        open={showDrawer.menu}
        onClose={() => setShoDrawer({ more: false, menu: false })}
        styles={{
          body: { padding: "16px", marginBottom: "64px" },
        }}
        zIndex={50}
      >
        <MenuCategory onClose={() => setShoDrawer({ more: false, menu: false })} />
      </Drawer>
      <Drawer
        closable={false}
        height="70vh"
        placement={"bottom"}
        open={showDrawer.more}
        onClose={() => setShoDrawer({ more: false, menu: false })}
        styles={{
          body: { padding: "0px", marginBottom: "64px" },
        }}
        zIndex={50}
      >
        <Footer />
      </Drawer>
      {/* ô trống fixed  */}
      <div className="block sm:hidden h-20 mt-4"></div>
      {/*  */}
      <nav className="z-[100] sm:hidden fixed bottom-0 w-full h-20 bg-white border-t border-gray-200 flex justify-between px-3">
        <Link
          onClick={() => {
            if (pathname !== config.routes.client.home) dispatch(actions.set_routing(true));
          }}
          href={config.routes.client.home}
          className="center-flex flex-col w-24 h-full gap-0.5"
        >
          <AiFillHome className="w-7 h-7 " />
          <p className=" text-xs font-semibold line-clamp-1 text-center">Trang chủ</p>
        </Link>
        <div
          onClick={() => setShoDrawer({ more: false, menu: !showDrawer.menu })}
          className="center-flex flex-col w-24 h-full gap-0.5"
        >
          <BiCategory className="w-7 h-7 " />
          <p className=" text-xs font-semibold line-clamp-1 text-center">Danh mục</p>
        </div>
        <Link
          onClick={() => {
            if (pathname !== config.routes.client.products) dispatch(actions.set_routing(true));
          }}
          href={config.routes.client.products}
          className="center-flex flex-col w-24 h-full gap-0.5"
        >
          <Store className="w-7 h-7 " />
          <p className=" text-xs font-semibold line-clamp-1 text-center">Cửa hàng</p>
        </Link>
        <div
          onClick={() => {
            if (!!state.user) {
              if (pathname !== config.routes.client.account.home)
                dispatch(actions.set_routing(true));
              router.push(config.routes.client.account.home);
            } else {
              dispatch(actions.set({ show: { ...state.show, login: true } }));
            }
          }}
          className="center-flex flex-col w-24 h-full gap-0.5"
        >
          {state.user ? (
            state.user.avatar ? (
              <div className="w-7 h-7 shrink-0 rounded-full overflow-hidden border border-primary">
                <img className="w-full h-full object-fill" src={state.user.avatar} alt="avarar" />
              </div>
            ) : (
              <FaCircleUser className="text-base w-7 h-7 text-gray-800" />
            )
          ) : (
            <FaCircleUser className="text-base w-7 h-7 text-gray-800" />
          )}
          <p className="text-xs font-semibold line-clamp-1 text-center">
            {!!state.user ? state.user.username : "Emember"}
          </p>
        </div>
        <div
          onClick={() => setShoDrawer({ more: !showDrawer.more, menu: false })}
          className="center-flex flex-col w-24 h-full gap-0.5 cursor-pointer"
        >
          <HiOutlineDotsHorizontal className="w-7 h-7 " />
          <p className=" text-xs font-semibold line-clamp-1 text-center">Xem thêm</p>
        </div>
      </nav>
    </>
  );
}

export default BottomNavigation;
