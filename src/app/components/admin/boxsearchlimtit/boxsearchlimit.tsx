"use client";
import React, { useState } from "react";
import { Select, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const BoxSearchLimit = (props: {
  title: string;
  onLimitChange: (value: number) => void;
  onSearch: (value: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    props.onSearch(searchValue); // Gọi hàm tìm kiếm khi nhấn nút hoặc Enter
  };

  return (
    <div className="flex items-center bg-white shadow-xl rounded-lg px-7 py-3 justify-between">
      <div className="flex gap-4 items-center">
        <p>Tìm kiếm:</p>
        <Input
          className="w-80 h-8"
          placeholder="Nhập từ khóa..."
          allowClear
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={handleSearch} // Tìm kiếm khi nhấn Enter
          addonAfter={
            <SearchOutlined
              className="cursor-pointer text-gray-500 hover:text-blue-500"
              onClick={handleSearch} // Tìm kiếm khi nhấn vào icon
            />
          }
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>Hiện</p>
        <Select
          defaultValue={5}
          style={{ width: 120 }}
          onChange={(value) => props.onLimitChange(value)}
          options={[
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 15, label: "15" },
            { value: 20, label: "20" },
            { value: 30, label: "30" },
          ]}
        />
        <p>{props.title}</p>
      </div>
    </div>
  );
};

export default BoxSearchLimit;
