"use client";
import images from "@/app/assets/image";
import Sidebar from "@/app/components/client/Sidebar_user";
import { FaAngleRight, FaFireFlameCurved, FaUser } from "react-icons/fa6";
import HeaderUser from "../Components/HeaderUser";
function AccountHome() {
  return (
    <>
      <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <Sidebar />
        <div className="w-[9/12px] flex flex-col gap-4">
          {/* đây */}
          <HeaderUser />
          <div className="w-full">
            <img src={images.banneruserhome} alt="" className="w-full" />
          </div>
          <div className="bg-primary flex-col gap-4 p-4">
            <div className="flex justify-between items-center px-2">
              <div className="flex gap-1">
                <div className="w-[48px] h-[48px]">
                  <FaFireFlameCurved className="text-white w-[33px] h-[42px]" />
                </div>
                <p className="text-4xl font-bold text-white">HOT SALE</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-base font-medium underline text-white shadow-sm">
                  Xem tất cả
                </p>
                <FaAngleRight className="text-white w-5 h-5" />
              </div>
            </div>
            <div >

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountHome;
