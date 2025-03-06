"use client";
import React from 'react';
import { Input } from 'antd';
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Select } from 'antd';

function CategoryEdit() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <TitleAdmin title="Quản lý danh mục / Sửa danh mục" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full">
          <div className="w-full">
            <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">Sửa Danh Mục</div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Mã Danh Mục</div>
              <Input className='w-[268px] h-11 shadow-md' placeholder="aht1h3rt1h32rt1321313213213" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Mã Danh Mục <span className='text-primary'>*</span></div>
              <Input className='w-[268px] h-11 shadow-md' placeholder="aht1h3rt1h32rt1321313213213" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Trạng Thái <span className='text-primary'>*</span></div>
              <Select className='shadow-md'
                defaultValue="lucy"
                style={{ width: 268, height: 44 }}
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Trạng Thái <span className='text-primary'>*</span></div>
              <Select className='shadow-md'
                defaultValue="lucy"
                style={{ width: 268, height: 44 }}
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
          <div>
            <div className='text-sm font-medium'>Trạng Thái <span className='text-primary'>*</span></div>
            <div>
              <div className='w-[101px] text-sm font-normal pt-1.5 pb-1.5 pr-5 pl-5 bg-gray-300 border border-gray-100 rounded'>Chọn tệp</div>
              <div><span>1</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryEdit;
