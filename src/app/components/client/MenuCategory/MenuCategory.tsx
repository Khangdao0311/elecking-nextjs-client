"use client";

import { IoPhonePortraitOutline } from "react-icons/io5";

function MenuCategory() {
  return (
    <div className="w-56 z-30 flex flex-col shadow-lg absolute bg-white bottom-0 translate-y-[calc(100%+10px)] rounded-lg overflow-hidden">
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <IoPhonePortraitOutline className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Điện thoại
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <IoPhonePortraitOutline className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
         Máy tính bảng
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <IoPhonePortraitOutline className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Điện thoại
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <IoPhonePortraitOutline className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Điện thoại
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <IoPhonePortraitOutline className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Điện thoại
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <IoPhonePortraitOutline className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Điện thoại
        </p>
      </div>
      <div className="group flex gap-2 p-2 items-center hover:bg-gray-200 cursor-pointer">
        <IoPhonePortraitOutline className="w-6 h-6 group-hover:text-primary" />
        <p className="text-sm font-base select-none cursor-pointer  group-hover:text-primary">
          Điện thoại
        </p>
      </div>
    </div>
  );
}

export default MenuCategory;
