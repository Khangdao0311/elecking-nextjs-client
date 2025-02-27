"use client";

import { FaHome } from "react-icons/fa";

function sidebar(){
    return <div className="flex w-[308px] items-center bg-white shadow-xl rounded-lg gap-4 p-4">
        <div className="px-2.5 w-full h-[50px] py-[2.5px] flex items-center gap-5 bg-primary rounded-lg">
        <FaHome className="w-5 h-5 text-white"/>
        <p className="text-sm font-bold text-white">Trang Chủ</p>
        </div>
    </div>;
}
export default sidebar;