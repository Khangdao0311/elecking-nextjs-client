"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaGift, FaUser } from "react-icons/fa6";
import { CiLock, CiLogout } from "react-icons/ci";
import { IoBagCheckOutline, IoLocationOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { useState } from "react";
import { Modal } from "antd";

import config from "@/app/config";
import { useWindowScroll } from "@uidotdev/usehooks";
import { useStore, actions, initState } from "@/app/store";

function SidebarAccount({ onClick }: any) {
  const [state, dispatch] = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [scroll] = useWindowScroll();
  const { x, y } = scroll as { x: number; y: number };
  const [modalLogout, setModalLogout] = useState(false);

  return (
    <>
      <Modal
        open={modalLogout}
        onCancel={() => setModalLogout(false)}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        closable={false}
        width="auto"
      >
        <div className=" flex flex-col gap-6 w-[365px]">
          <p className="w-full text-center text-lg  font-bold text-primary">
            Bạn có muốn thoát tài khoản ?
          </p>
          <div className="w-full flex gap-2 items-center justify-between">
            <button
              onClick={() => {
                localStorage.removeItem("user");
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
                dispatch(actions.set({ ...initState, load: false, routing: true }));
                router.push(config.routes.client.login);
              }}
              className="w-1/2 center-flex py-2 rounded-sm border border-primary text-primary text-base font-bold"
            >
              Có
            </button>
            <button
              className="w-1/2 center-flex py-2 rounded-sm border border-primary text-white bg-primary text-base font-bold"
              onClick={() => setModalLogout(false)}
            >
              Không
            </button>
          </div>
        </div>
      </Modal>
      <div
        className={`!w-[60vw] max-w-[300px] lg:max-w-none lg:w-full shrink-0 static lg:sticky ${
          y < 100 ? "top-[172px]" : "top-32"
        } transition-all duration-200  flex flex-col items-center rounded-lg gap-4
        `}
      >
        <Link
          href={config.routes.client.account.home}
          onClick={() => {
            if (pathname !== config.routes.client.account.home) dispatch(actions.set_routing(true));
            onClick();
          }}
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
          onClick={() => {
            if (pathname !== config.routes.client.account.order)
              dispatch(actions.set_routing(true));
            onClick();
          }}
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
          onClick={() => {
            if (pathname !== config.routes.client.account.voucher)
              dispatch(actions.set_routing(true));
            onClick();
          }}
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
          onClick={() => {
            if (pathname !== config.routes.client.account.profile)
              dispatch(actions.set_routing(true));
            onClick();
          }}
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
          onClick={() => {
            if (pathname !== config.routes.client.account.address)
              dispatch(actions.set_routing(true));
            onClick();
          }}
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
          onClick={() => {
            if (pathname !== config.routes.client.account.password)
              dispatch(actions.set_routing(true));
            onClick();
          }}
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
        <div
          onClick={() => {
            setModalLogout(true);
          }}
          className={`px-2.5 group w-full h-[50px] py-[5px] justify-center flex items-center gap-5 hover:bg-primary transition-all duration-300 rounded-lg cursor-pointer select-none`}
        >
          <CiLogout className={`group-hover:text-white w-[24px] h-[24px] text-black`} />
          <p className={`text-sm group-hover:text-white font-bold text-black w-[132px]`}>
            Đăng Xuất
          </p>
        </div>
      </div>
    </>
  );
}
export default SidebarAccount;
