"use client";
import Sidebar from "@/app/components/client/Sidebar_user";
import { FaPlus } from "react-icons/fa6";

function AccountAddress() {
  return (
    <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      <Sidebar />
      <div className="w-9/12 rounded-lg border border-gray-200 shadow-md">
        <div className="px-5 flex text-justify items-center h-20">
          <p className="text-xl font-semibold">Địa chỉ của tôi</p>
        </div>
        <div className="p-4 flex items-start flex-col gap-4 border-t">
          <div
            className="flex w-full p-4 gap-4 shadow-md border border-gray-200 rounded-lg"
          >
            <div className="flex flex-col w-full items-start gap-2.5">
              <div className="flex justify-between w-full">
                <div className="flex gap-5">
                  <p className="text-base font-medium">Nguyễn Văn A</p>
                  <p className="text-base font-normal">0976767676</p>
                </div>
                <p
                  className="tetx-sm font-semibold text-blue-500 cursor-pointer"
                >
                  Cập nhật
                </p>
              </div>
              <p>Hẻm 14 Đường Nguyễn Thị Đặng</p>
              <p>
                Phường Tân Thới Hiệp, Quận 12, TP. Hồ Chí Minh
              </p>
              <p className="text-primary text-xs font-normal border border-primary rounded-sm px-1 ">
                Mặc định
              </p>
            </div>
          </div>

          <div
            className="flex cursor-pointer  gap-2 px-6 py-3 items-center shadow-md border border-gray-200 rounded-lg"

          >
            <FaPlus className="w-5 h-5" />
            <p className="text-sm font-medium">Thêm Địa Chỉ Mới</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountAddress;
