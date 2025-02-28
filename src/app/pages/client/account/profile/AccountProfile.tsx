"use client";
import Sidebar from "@/app/components/client/sidebar_user";
import { FaUser } from "react-icons/fa6";

function AccountProfile() {
  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex gap-4">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="grid grid-flow-col justify-center w-9/12 border border-gray-200 shadow-xl rounded-lg">
        <div>
          <div>
            <div className="rounded-full bg-gray-300 w-[93px] h-[93px] py-7 px-7 flex items-center justify-center">
              <FaUser className="w-16 h-16 text-white" />
            </div>
            <p className="text-lg font-bold">Nguyễn Đặng</p>
            
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default AccountProfile;
