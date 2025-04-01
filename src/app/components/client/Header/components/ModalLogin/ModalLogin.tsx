"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoMobile from "@/app/assets/LogoMobile";
import config from "@/app/config";
import { useStore, actions } from "@/app/store";

function ModalLogin({ onClick }: any) {
  const [state, dispatch] = useStore();
  const pathname = usePathname();

  return (
    <div className="select-none flex flex-col gap-4 bg-white rounded-2xl z-50">
      <div className="center-flex flex-col">
        <h2 className="text-3xl font-bold text-primary p-2.5">Emember</h2>
        <LogoMobile className="w-28 h-28" />
      </div>
      <p className="text-lg font-medium text-center">
        Vui lòng đăng nhập tài khoản Emember để mua sắm dễ dàng hơn.
      </p>
      <div className="flex gap-4 w-full">
        <Link
          onClick={() => {
            onClick();
            if (pathname !== config.routes.client.register) dispatch(actions.set_routing(true));
          }}
          href={config.routes.client.register}
          className="w-1/2 h-14 center-flex border-2 border-primary text-primary hover:!text-primaryDark rounded-lg text-lg font-semibold "
        >
          Đăng ký
        </Link>
        <Link
          onClick={() => {
            onClick();
            if (pathname !== config.routes.client.login) dispatch(actions.set_routing(true));
          }}
          href={config.routes.client.login}
          className="w-1/2 h-14 center-flex bg-gradient-to-l to-[#FF001C] from-primaryDark hover:bgpo hover:!text-white text-gray-50 rounded-lg text-lg font-semibold "
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default ModalLogin;
