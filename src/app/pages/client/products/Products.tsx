"use client";

import Product from "@/app/components/client/Product";
import { Pagination } from "antd";
import { useState } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { FaMinus, FaMoneyBill } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  IoChevronBack,
  IoChevronForward,
  IoCloseCircle,
  IoCloseOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";

function Products() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      {/* Filter product */}
      <section className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-3.5">
          <h3 className="text-xl font-bold">Chọn theo tiêu chí</h3>
          <div className="flex gap-4">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-2 relative  border ${isOpen ? "border-red-500 bg-red-50" : "border-black bg-white"
                } rounded-lg cursor-pointer`}
            >
              <p
                onClick={() => setIsOpen(!isOpen)}
                className={`text-base ${isOpen ? "text-red-500" : "text-black"
                  }`}
              >
                Giá
              </p>
              <FaMoneyBill
                className={`w-6 h-6 ${isOpen ? "text-red-500" : "text-black"}`}
              />
              {isOpen && (
                <div className="left-0 bottom-0 translate-y-[calc(100%+10px)] bg-white absolute  p-4 rounded-2xl border border-gray-300 flex flex-col items-center gap-4 ">
                  <div className="w-[416px] flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Từ"
                      className="border w-36 h-11 border-gray-300 rounded-md px-3 py-2 outline-none focus:outline-none"
                    />
                    <FaMinus className="text-gray-500 w-30 h-30" />
                    <input
                      type="text"
                      placeholder="Đến"
                      className="border w-36 h-11 border-gray-300 rounded-md px-3 py-2 outline-none focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-4 w-full">
                    <button
                      className="border w-full border-red-500 text-red-500 px-4 py-2 rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Đóng
                    </button>
                    <button className="bg-red-500 w-full text-white px-4 py-2 rounded-md">
                      Xem kết quả
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-2  border border-black bg-white rounded-lg text-">
              <p className="text-base text-black">Danh mục</p>
              <IoMdArrowDropdown className="w-6 h-6 text-black" />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-2  border border-black bg-white rounded-lg">
              <p className="text-base text-black">Thương hiệu</p>
              <IoMdArrowDropdown className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3.5">
          <h3 className="text-xl font-bold">Đang lọc theo</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 px-2.5 py-2  border border-red-500 bg-red-50 rounded-lg">
              <IoCloseCircle className="w-6 h-6 text-red-500" />
              <p className="text-base text-red-500">
                Giá: <span className="inline">100.000 đ</span> -{" "}
                <span className="inline">500.000 đ</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-2  border border-red-500 bg-red-50 rounded-lg">
              <IoCloseCircle className="w-6 h-6 text-red-500" />
              <p className="text-base text-red-500">
                Danh mục: <span className="inline">Điện thoại</span> ,{" "}
                <span className="inline">Tablet</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-2  border border-red-500 bg-red-50 rounded-lg">
              <IoCloseOutline className="w-6 h-6 text-red-500" />
              <p className="text-base text-red-500">Bỏ chọn tất cả</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3.5">
          <h3 className="text-xl font-bold">Sắp xếp theo</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 px-2.5 py-2  border border-black bg-white rounded-lg">
              <BsSortDown className="w-6 h-6 text-black" />
              <p className="text-base text-black">
                Giá: <span className="inline">Giá cao</span> -{" "}
                <span className="inline">Thấp</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-2  border border-black bg-white rounded-lg">
              <BsSortDownAlt className="w-6 h-6 text-black" />
              <p className="text-base text-black">
                Giá: <span className="inline">Giá thấp</span> -{" "}
                <span className="inline">Cao</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-2  border border-black bg-white rounded-lg">
              <AiOutlinePercentage className="w-6 h-6 text-black" />
              <p className="text-base text-black">Khuyến mãi</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-2  border border-black bg-white rounded-lg">
              <MdRemoveRedEye className="w-6 h-6 text-black" />
              <p className="text-base text-black">Xem nhiều</p>
            </div>
          </div>
        </div>
      </section>

      {/* Show product */}
      <section className="py-4">
        <div className="grid grid-cols-5 gap-2.5 flex-wrap">
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
        </div>
        <div className="flex items-center justify-center  mt-4">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </section>
    </div>
  );
}

export default Products;
