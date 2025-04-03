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
  setStatus,
  quantityOder,
  paymentStatus,
  setPaymentStatus
}: any) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    onSearch(searchValue);
  };
  console.log(paymentStatus);
  const pathname = usePathname();

  return (
    <div className="flex items-center bg-white shadow-xl rounded-lg px-7 py-3 justify-between">
      <div className={`flex ${pathname.startsWith("/admin/order") ? "w-4/5" : "w-1/5"} gap-4 items-center`}>
        {pathname.startsWith("/admin/order") ? (
          <div className="flex gap-2 px-4 py-2 bg-white rounded-tl-lg rounded-tr-lg">
            <div
              onClick={() => {
                if (status !== "") setStatus("");
                setPaymentStatus(null);
              }}
              className={`${status === ""
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Tất cả ({quantityOder.all})
            </div>
            <div
              onClick={() => {
                if (status !== 2) setStatus(2);
                setPaymentStatus(null);
              }}
              className={`${status === 2
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Chờ xác nhận ({quantityOder[2]})
            </div>
            <div
              onClick={() => {
                if (status !== 3) setStatus(3);
                setPaymentStatus(null);
              }}
              className={`${status === 3
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đã xác nhận ({quantityOder[3]})
            </div>
            <div
              onClick={() => {
                if (status !== 4) setStatus(4);
                setPaymentStatus(null);
              }}
              className={`${status === 4
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đang vận chuyển ({quantityOder[4]})
            </div>
            <div
              onClick={() => {
                if (status !== 1) setStatus(1);
                setPaymentStatus(null);
              }}
              className={`${status === 1
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đã nhận ({quantityOder[1]})
            </div>
            <div
              onClick={() => {
                if (status !== 0) setStatus(0);
                setPaymentStatus(null);
              }}
              className={`${status === 0
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đã hủy ({quantityOder[0]})
            </div>
            <div
              onClick={() => {
                setPaymentStatus(true);
                setStatus(null)
              }}
              className={`${paymentStatus === true
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Đã thanh toán ({quantityOder.payment_status})
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
      <div className="flex w-1/3 gap-2 justify-end items-center">
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
