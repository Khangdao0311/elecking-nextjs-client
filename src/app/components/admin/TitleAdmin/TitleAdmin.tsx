"use client";
import React from "react";
import { Select } from "antd";
import { usePathname } from "next/navigation";
import config from "@/app/config";
const TitleAdmin = (props: {
  title: string;
  yearChange?: (value: string) => void;
}) => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center bg-white shadow-xl rounded-lg px-7 py-3 relative">
      <div>
        <div className="absolute left-0 top-0 bottom-0 w-[10px] bg-yellow-400 rounded-l-lg"></div>
        <p className="text-sm font-normal">{props.title}</p>
      </div>
      {pathname === config.routes.admin.dashboard && props.yearChange && (
        <Select
          value ="Tổng doanh thu"
          onChange={(value) => props.yearChange?.(value)}
          options={[
            { value: '', label: "Tổng danh thu" },
            ...Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return { value: year, label: year.toString() };
            }),
          ]}
        />
      )}
    </div>
  );
};
export default TitleAdmin;
