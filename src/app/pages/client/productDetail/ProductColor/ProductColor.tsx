import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

function ProductColor({ color, price, checked, onClick }: any) {
  return (
    <div 
    onClick={onClick}
    className={`relative border rounded-lg ${checked == color ? "border-primary": ""} p-2.5 w-[168px] h-[56px] flex gap-2.5 items-center cursor-pointer`}>
      <img
        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_2__3.png"
        alt=""
        className="h-9 w-9"
      />
      <div className=" ">
        <p className="text-xs font-bold">{color}</p>
        <p className="text-xs font-normal">{price} đ</p>
      </div>
    {checked == color && (
      <FaCheck className="absolute top-0 right-0 bg-primary text-white rounded-tr-lg rounded-bl-lg w-[34px] h-[18px] px-2.5 py-0.5" />
    )}
    </div>
  );
}

export default ProductColor;
