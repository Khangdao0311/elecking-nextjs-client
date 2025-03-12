import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

function ProductColor({ image, color, price, checked, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`relative border rounded-lg shadow-lg ${
        checked ? "border-primary" : ""
      } p-2.5 w-[168px] h-[56px] flex gap-2.5 items-center cursor-pointer`}
    >
      <img src={image} alt="" className="h-9 w-9" />
      <div className="">
        <p className="text-xs font-bold">{color}</p>
        <p className="text-xs font-normal">{price.toLocaleString("vi-VN")} đ</p>
      </div>
      {checked && (
        <FaCheck className="absolute top-0 right-0 bg-primary text-white rounded-tr-lg rounded-bl-lg w-[34px] h-[18px] px-2.5 py-0.5" />
      )}
    </div>
  );
}

export default ProductColor;
