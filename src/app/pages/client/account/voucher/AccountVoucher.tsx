"use client";
import Sidebar from "@/app/components/client/Sidebar_user";
import { BiSolidUser } from "react-icons/bi";


function AccountVoucher() {
  return <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
    <Sidebar />
    <div>
      <div className="flex items-center gap-4">
        <div className="p-3.5 bg-[#D9D9D9] rounded-[100%]"><BiSolidUser className="text-white w-16 h-16" /></div>
        <div className="flex flex-col gap-2.5">
          <div className="text-xl font-bold">Nguyễn Đặng</div>
          <div className="text-sm font-semibold">0976232323</div>
        </div>
      </div>
    </div>
  </div>;
}

export default AccountVoucher;
