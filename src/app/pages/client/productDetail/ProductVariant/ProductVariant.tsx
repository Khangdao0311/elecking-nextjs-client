"use client";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

function ProductVariant({ name, price, checked, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={` relative  border ${
        checked == name ? "border-primary" : ""
      } rounded-lg p-2.5 w-[168px] h-[54px] flex gap-8.5 items-center cursor-pointer`}
    >
      <div className="text-center w-full">
        <p className="tex-xs text-black font-bold">{name}</p>
        <p className="text-xs text-black font-normal">
          {price.toLocaleString("vi-VN")} đ
        </p>
      </div>
      {checked == name && (
        <FaCheck className="absolute top-0 right-0 bg-primary text-white rounded-tr-lg rounded-bl-lg w-[34px] h-[18px] px-2.5 py-0.5" />
      )}
    </div>
  );
}

export default ProductVariant;
