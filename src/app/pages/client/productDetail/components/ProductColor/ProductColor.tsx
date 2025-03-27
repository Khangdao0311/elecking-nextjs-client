import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

function ProductColor({ disabled, image, color, price, checked, onClick }: any) {
  return (
    <div
      onClick={() => {
        if (!disabled) onClick();
      }}
      className={`relative border rounded-lg shadow-lg ${
        checked ? "border-primary" : ""
      } p-2.5 w-full h-full flex gap-2.5 items-center  overflow-hidden transition-all duration-200 select-none ${
        disabled ? "opacity-30" : "cursor-pointer"
      }`}
    >
      <img src={image} alt="" className="h-9 w-9" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold">{color}</p>
        <p className="text-xs font-normal">{price.toLocaleString("vi-VN")} đ</p>
      </div>
      {checked && (
        <FaCheck className="absolute top-0 right-0 bg-primary text-white  rounded-bl-lg w-8 h-4 px-2.5 py-0.5" />
      )}
    </div>
  );
}

export default ProductColor;
