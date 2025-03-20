"use client";
import React from "react";
import { Select} from "antd";
import { usePathname } from "next/navigation";
const TitleAdmin = (props: {
  title: string;
  yearChange?: (value: number) => void;
}) => {
  const pathname = usePathname();
  return (<div className="flex justify-between items-center bg-white shadow-xl rounded-lg px-7 py-3 relative">
    <div>
    <div className="absolute left-0 top-0 bottom-0 w-[10px] bg-yellow-400 rounded-l-lg"></div>
    <p className="text-sm font-normal">{props.title}</p>
    </div>
    {pathname.startsWith("/admin/dashboard") && props.yearChange && ( <Select
          defaultValue="Tổng doanh thu"
          onChange={(value) => props.yearChange?.(parseInt(value))}
          options={[
            { value: 2021, label: '2021' },
            { value: 2022, label: '2022' },
            { value: 2023, label: '2023' },
            { value: 2024, label: '2024' },
            { value: 2025, label: '2025' }
          ]}
        />)}
   
    </div>
  );
}
export default TitleAdmin;
