"use client";
import Sidebar from "@/app/components/client/Sidebar_user";
import HeaderUser from "../Components/HeaderUser";


function AccountVoucher() {
  return <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
    <Sidebar />
    <div className="w-[9/12px] flex flex-col gap-4">
    <HeaderUser />
    </div>
  </div>;
}

export default AccountVoucher;
