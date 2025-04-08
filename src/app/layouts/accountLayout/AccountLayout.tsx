"use client";

import { Drawer, FloatButton } from "antd";
import { FaListUl } from "react-icons/fa6";
import { useWindowScroll } from "@uidotdev/usehooks";
import { useWindowSize } from "react-use";
import { useState } from "react";

import SidebarAccount from "@/app/components/client/SidebarAccount";
import { useStore } from "@/app/store";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, dispatch] = useStore();
  const [drawer, setDrawer] = useState(false);
  const { width, height }: any = useWindowSize();
  const [scroll] = useWindowScroll();
  const { x, y } = scroll as { x: number; y: number };

  return (
    <>
      <Drawer
        className="w-[70vw] max-w-[400px]"
        width="auto"
        title="Menu"
        zIndex={101}
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <SidebarAccount onClick={() => setDrawer(false)} />
      </Drawer>
      <div className="relative container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="hidden lg:block w-3/12 bg-slate-50 rounded-xl p-4 ">
          <SidebarAccount onClick={() => {}} />
        </div>
        {!state.load && (
          <FloatButton
            icon={<FaListUl className="text-black" />}
            onClick={() => setDrawer(true)}
            className="block lg:hidden w-12 h-12 !z-10 transition-all duration-300"
            style={{
              bottom: `${width < 640 ? (y < 200 ? "100px" : "158px") : y < 200 ? "40px" : "98px"}`,
            }}
          />
        )}
        <div className="w-full lg:w-9/12 overflow-hidden rounded-xl min-h-[calc(100vh-190px)]">
          {children}
        </div>
      </div>
    </>
  );
}
