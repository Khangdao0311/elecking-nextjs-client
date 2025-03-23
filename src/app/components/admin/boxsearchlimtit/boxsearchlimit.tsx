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
    props.onSearch(searchValue); 
  };

  return (
    <div className="flex items-center bg-white shadow-xl rounded-lg px-7 py-3 justify-between">
      <div className="flex w-1/2 gap-4 items-center">
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
      </div>
      <div className="flex w-1/2 gap-2 justify-end items-center">
        <p>Hiện</p>
        <Select
          defaultValue={5}
          style={{ width: 80 }}
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
