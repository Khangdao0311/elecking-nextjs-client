"use client";
import Sidebar from "@/app/components/client/SidebarAccount";
import VoucherUserCard from "../Components/VoucherUserCard";

function AccountVoucher() {
  return (
    <div className="container-custom flex items-start gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      <Sidebar />
      <div className="w-9/12 flex flex-col gap-4">
        <VoucherUserCard />
      </div>
    </div>
  );
}

export default AccountVoucher;
