"use client";

import React from "react";

import SidebarAccount from "@/app/components/client/SidebarAccount";

function AccountPassword() {
  return (
    <div className="container-custom flex items-start gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      <div className="w-3/12 bg-slate-50 rounded-xl p-4">
        <SidebarAccount />
      </div>
      <div className="w-9/12 flex flex-col gap-6 rounded-xl min-h-[calc(100vh-190px)]">
        <h2 className="text-2xl font-bold uppercase">Đổi mật khẩu</h2>
      </div>
    </div>
  );
}

export default AccountPassword;
