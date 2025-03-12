"use client";
import React from "react";
import { Select } from "antd";

const BoxSearchLimit = (props: { title: string; onLimitChange: any }) => (
  <div className="flex items-center bg-white shadow-xl rounded-lg px-7 py-3 justify-between">
    <div className="flex gap-4 items-center">
      <p>Tìm kiếm:</p>
      <input type="text" className="w-80 h-8 border rounded outline-none" />
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
export default BoxSearchLimit;
