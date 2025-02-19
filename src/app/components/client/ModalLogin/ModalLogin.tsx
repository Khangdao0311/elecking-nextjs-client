"use client";

import LogoMobile from "@/app/assets/LogoMobile";
import config from "@/app/config";
import Link from "next/link";
import { FaCircleXmark } from "react-icons/fa6";

function ModalLogin({ onClick }: any) {
  return (
    <div className="center-fixed flex flex-col gap-4 bg-white rounded-2xl px-5 py-4 w-[440px] z-50">
      <div className="center-flex flex-col">
        <h2 className="text-3xl font-bold text-primary p-2.5">Emember</h2>
        <LogoMobile className="w-28 h-28" />
      </div>
      <p className="text-lg font-medium text-center">
        Vui lòng đăng nhập tài khoản Emember để mua sắm dễ dàng hơn.
      </p>
      <div className="flex gap-4 w-full">
        <Link
          onClick={onClick}
          href={config.routes.client.register}
          className="w-1/2 h-14 center-flex border-2 border-primary text-primary rounded-lg text-lg font-semibold "
        >
          Đăng ký
        </Link>
        <Link
          onClick={onClick}
          href={config.routes.client.login}
          className="w-1/2 h-14 center-flex bg-gradient-to-l to-[#FF001C] from-primaryDark hover:bgpo text-white rounded-lg text-lg font-semibold "
        >
          Đăng nhập
        </Link>
      </div>
      <FaCircleXmark className="w-6 h-6 fixed top-3.5 right-3.5 cursor-pointer" onClick={onClick} />
    </div>
  );
}

export default ModalLogin;
