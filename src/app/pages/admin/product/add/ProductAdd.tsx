"use client";
import Button from "@/app/components/admin/Button";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input, Select } from "antd";
import React from "react";
import { GrFormNext } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function ProductAdd() {
  return (
    <>
      <TitleAdmin title="Quản lý danh mục / Sửa danh mục" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full">
            <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
              Sửa Sản Phẩm
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Tên sản phẩm <span className="text-primary">*</span>
              </div>
              <Input
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập Tên Danh Mục"
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Giá sản phẩm <span className="text-primary">*</span>
              </div>
              <Input
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập Tên Danh Mục"
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Loại sản phẩm <span className="text-primary">*</span>
              </div>
              <Select
                className="shadow-md"
                defaultValue="Điện thoại"
                style={{ width: 268, height: 44 }}
                onChange={handleChange}
                options={[
                  { value: "Điện thoại", label: "Điện thoại" },
                  { value: "Laptop", label: "Laptop" },
                ]}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex gap-2 items-center ">
              <p className="text-sm font-bold">
                Loại <span className="text-primary">*</span>
              </p>
              <div className="px-5 py-2 bg-green-100 rounded">
                <p className="w-full text-sm font-bold text-green-800">
                  Thêm loại
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-3">
              <div className="flex gap-2 items-center">
                <div className="w-[18px] h-[18px] bg-orange-400">
                  <GrFormNext className="text-white flex justify-center items-center" />
                </div>
                <div className="w-[18px] h-[18px] bg-red-600">
                  <IoIosClose className="text-white flex justify-center items-center" />
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Input
                  className="w-[268px] h-11 shadow-md"
                  placeholder="Nhập tên sản phẩm"
                />
                <Input
                  className="w-[268px] h-11 shadow-md"
                  placeholder="Nhập giá thêm"
                />
                <Input
                  className="w-[268px] h-11 shadow-md"
                  placeholder="Nhập giá giảm"
                />
              </div>
            </div>
          </div>

          <div className="w-full px-3 flex flex-col gap-4">
            <div className="flex gap-2 items-center ">
              <p className="text-sm font-bold">Màu Sắc</p>
              <div className="px-5 py-2 bg-green-100 rounded">
                <p className="w-full text-sm font-bold text-green-800">
                  Thêm loại
                </p>
              </div>
            </div>
            <div className="flex flex-col p-3 gap-2 border-t-2 border-primary">
              <div className="flex flex-col gap-2  px-3">
                <div className="flex gap-2">
                  <div className="w-[18px] h-[18px] bg-orange-400 flex justify-center items-center">
                    <GrFormNext className="text-white" />
                  </div>
                  <div className="w-[18px] h-[18px] bg-red-600">
                    <IoIosClose className="text-white flex justify-center items-center" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Input
                    className="w-[268px] h-11 shadow-md"
                    placeholder="Nhập tên màu"
                  />
                  <Input
                    className="w-[268px] h-11 shadow-md"
                    placeholder="Nhập giá thêm"
                  />
                  <Input
                    className="w-[268px] h-11 shadow-md"
                    placeholder="Nhập số lượng"
                  />
                </div>
                <div className="flex gap-2.5 flex-col">
                  <div className="flex items-center gap-2.5 bg-white border border-gray-100 shadow-md p-1.5">
                    <div className="w-[106px] h-auto text-sm font-normal pt-1.5 pb-1.5 pr-5 pl-5 bg-gray-300 border border-gray-100 rounded">
                      Chọn tệp
                    </div>
                    <div className="w-full text-sm font-normal">
                      <span>1</span> Tệp
                    </div>
                  </div>
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="w-20 h-20 relative">
                      <img
                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png"
                        alt=""
                      />
                      <div className="w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1">
                        <IoCloseSharp />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">
              Hình Ảnh <span className="text-primary">*</span>
            </div>
            <div className="flex gap-2.5 flex-col">
              <div className="flex items-center gap-2.5 bg-white border border-gray-100 shadow-md p-1.5">
                <div className="w-[106px] h-auto text-sm font-normal pt-1.5 pb-1.5 pr-5 pl-5 bg-gray-300 border border-gray-100 rounded">
                  Chọn tệp
                </div>
                <div className="w-full text-sm font-normal">
                  <span>1</span> Tệp
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-3">
                <div className="w-20 h-20 relative">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png"
                    alt=""
                  />
                  <div className="w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1">
                    <IoCloseSharp />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button back="product/list"/>
        </div>
      </div>
    </>
  );
}

export default ProductAdd;
