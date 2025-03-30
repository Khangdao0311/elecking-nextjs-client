"use client";
import React, { useState } from "react";
import { Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

const BoxSearchLimit = ({
  title,
  onLimitChange,
  onSearch,
  status,
  setStatus
}: any) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };
  console.log(searchValue);
  const pathname = usePathname();

  return (
    <div className="flex items-center bg-white shadow-xl rounded-lg px-7 py-3 justify-between">
      <div className={`flex ${pathname.startsWith("/admin/order") ? "w-2/3" : "w-1/2"} gap-4 items-center`}>
        {pathname.startsWith("/admin/order") ? (
          <div className="flex gap-2 px-4 py-2 bg-white rounded-tl-lg rounded-tr-lg">
            <div
              onClick={() => {
                if (status !== "") setStatus("");
              }}
              className={`${status === ""
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Tất cả
            </div>
            <div
              onClick={() => {
                if (status !== 2) setStatus(2);
              }}
              className={`${status === 2
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Chờ xác nhận
            </div>
            <div
              onClick={() => {
                if (status !== 3) setStatus(3);
              }}
              className={`${status === 3
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đã xác nhận
            </div>
            <div
              onClick={() => {
                if (status !== 4) setStatus(4);
              }}
              className={`${status === 4
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đang vận chuyển
            </div>
            <div
              onClick={() => {
                if (status !== 1) setStatus(1);
              }}
              className={`${status === 1
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đã nhận
            </div>
            <div
              onClick={() => {
                if (status !== 0) setStatus(0);
              }}
              className={`${status === 0
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đã hủy
            </div>
          </div>
        ) : <>
          <p>Tìm kiếm:</p>
          <Input
            className="w-80 h-8"
            placeholder="Nhập từ khóa..."
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
            addonAfter={
              <SearchOutlined
                className="cursor-pointer text-gray-500 hover:text-blue-500"
                onClick={handleSearch}
              />
            }
          />
        </>}
      </div>
      <div className="flex w-1/2 gap-2 justify-end items-center">
        <p>Hiện</p>
        <Select
          defaultValue={5}
          style={{ width: 80 }}
          onChange={(value) => onLimitChange(value)}
          options={[
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 15, label: "15" },
            { value: 20, label: "20" },
            { value: 30, label: "30" },
          ]}
        />
        <p>{title}</p>
      </div>
    </div>
  );
};

export default BoxSearchLimit;
