"use client"
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input } from 'antd';
import React from 'react';
import { Select } from 'antd';
import ButtonAdmin from "@/app/components/admin/Button";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function UserAdd() {
  return(
    <>
    <TitleAdmin title="Quản lý người dùng / Tạo mới người dùng" />
    <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="py-4 flex flex-col w-full gap-4">
          <div className="p-4 border-b border-primary ">
            <p className="text-2xl font-semibold">Tạo Mới Nhân Viên</p>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap w-full">
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
            <p className="text-sm font-medium">Tên người dùng</p>
            <p className="text-primary w-2 h-2">*</p>
            </div>
            <Input className="w-[268px] rounded shadow-md h-[44px]" placeholder="Nguyễn Văn A" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
            <p className="text-sm font-medium">Mật Khẩu</p>
            <p className="text-primary w-2 h-2">*</p>
            </div>
            <Input className="w-[268px] rounded shadow-md h-[44px]" placeholder="123" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
            <p className="text-sm font-medium">Số Điện Thoại</p>
            </div>
            <Input className="w-[268px] rounded shadow-md h-[44px]" placeholder="Số điện thoại" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
            <p className="text-sm font-medium">Email</p>
            </div>
            <Input className="w-[268px] rounded shadow-md h-[44px]" placeholder="Số điện thoại" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
            <p className="text-sm font-medium">Họ Và Tên</p>
            <p className="text-primary w-2 h-2">*</p>
            </div>
            <Input className="w-[268px] rounded shadow-md h-[44px]" placeholder="Họ và tên" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
            <p className="text-sm font-medium">Vai Trò</p>
            <p className="text-primary w-2 h-2">*</p>
            </div>
           <Select
           className="h-[44px] w-[268px] shadow-md rounded"
           placeholder="Chọn tình trạng"
           onChange={handleChange}
           options={[
           { value: 'jack', label: 'Jack' },
           { value: 'lucy', label: 'Lucy' },
           { value: 'Yiminghe', label: 'yiminghe' },
           { value: 'disabled', label: 'Disabled', disabled: true },
           ]}
           />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
            <p className="text-sm font-medium">Trạng Thái</p>
            <p className="text-primary w-2 h-2">*</p>
            </div>
           <Select
           className="h-[44px] w-[268px] shadow-md rounded"
           placeholder="Chọn tình trạng"
           onChange={handleChange}
           options={[
           { value: 'jack', label: 'Jack' },
           { value: 'lucy', label: 'Lucy' },
           { value: 'Yiminghe', label: 'yiminghe' },
           { value: 'disabled', label: 'Disabled', disabled: true },
           ]}
           />
          </div>
        </div>
        <div className="flex flex-col gap-2.5 w-full">
          <div className="flex gap-1">
            <p className="text-sm font-medium">Ảnh</p>
            <p className="text-primary">*</p>
          </div>
          <div className="p-1.5 flex gap-2.5 border border-gray-100 rounded shadow-md">
            <p className="text-sm font-normal min-w-[101px] px-5 py-2.5 bg-gray-300 rounded">Chọn tệp</p>
            <p className="min-w-full text-gray-400 flex items-center text-sm font-normal">Không có tệp được chọn</p>
          </div>
        </div>
        <ButtonAdmin/>
    </div>
    </>
  )
}

export default UserAdd;
