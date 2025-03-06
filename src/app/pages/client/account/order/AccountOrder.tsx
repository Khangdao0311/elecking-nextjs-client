"use client";

import SidebarUser from "@/app/components/client/Sidebar_user";
import HeaderUser from "../Components/HeaderUser";
import OrderStatus from "../Components/OrderStatus";

function AccountOrder() {
  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex gap-4">
      <SidebarUser />
      <div className="w-9/12 flex flex-col gap-4">
        <HeaderUser />
        <div className="flex gap-2.5">
          <div className="px-4 py-2 bg-primary rounded-md">
            <p className="text-sm font-bold text-white">Tất Cả</p>
          </div>
          <div className="px-4 py-2 rounded-md drop-shadow-md border-gray-300 border">
            <p className="text-sm font-bold text-black">Chờ xác nhận</p>
          </div>
          <div className="px-4 py-2 rounded-md drop-shadow-md border-gray-300 border">
            <p className="text-sm font-bold text-black">Đang Vận Chuyển</p>
          </div>
          <div className="px-4 py-2 rounded-md drop-shadow-md border-gray-300 border">
            <p className="text-sm font-bold text-black">Đã Giao Hàng</p>
          </div>
          <div className="px-4 py-2 rounded-md drop-shadow-md border-gray-300 border">
            <p className="text-sm font-bold text-black">Đã hủy</p>
          </div>
        </div>
        <div className="">
          <OrderStatus status={3}/>
          <OrderStatus status={2} />
          <OrderStatus status={1} />
          <OrderStatus status={0} />
        </div>
      </div>
    </div>
  );
}

export default AccountOrder;
