"use client";
import Sidebar from "@/app/components/client/sidebar_user";
import { FaUser } from "react-icons/fa6";
function AccountHome() {
  return(
    <>
    <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
    <Sidebar/>
    <div>
      <div className="flex items-center">
      <div className="bg-gray-300 w-[92px] h-[92px] rounded-full">
      <FaUser className="w-[45px] h-[45px]"/>
      </div>
      </div>
    </div>
  </div>
  </>
)
}

export default AccountHome;
