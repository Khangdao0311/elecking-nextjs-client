"use client";

import { Select } from "antd";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input } from 'antd';
import { IoCloseSharp } from 'react-icons/io5';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import Button from "@/app/components/admin/Button";
import dayjs from 'dayjs';

function VoucherEdit() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const createDate = dayjs('2025-02-10', 'YYYY-MM-DD');
  const endDate = dayjs('2025-02-20', 'YYYY-MM-DD');
  return (
    <>
      <TitleAdmin title="Quản lý voucher / Sửa voucher" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full">
            <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">Sửa Voucher</div>
          </div>
          <div className='flex items-center flex-wrap gap-4'>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Mã Khuyến Mãi <span className="text-primary">*</span></div>
              <Input className='w-[268px] h-11 shadow-md' value="ARB421" disabled />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Loại Khuyến Mãi <span className='text-primary'> *</span></div>
              <Select className='shadow-md'
                defaultValue="Phần trăm"
                style={{ width: 268, height: 44 }}
                onChange={handleChange}
                options={[
                  { value: 'Phần trăm', label: 'Phần trăm' },
                  { value: 'Giá', label: 'Giá' },
                ]}
              />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Giá Trị Khuyến Mãi<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' value="10" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Đơn Tối Thiểu<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' value="10000" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Giá Trị Cao Nhất<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' value="400000" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Ngày Bắt Đầu <span className='text-primary'>*</span></div>
              <Space direction="vertical">
                <DatePicker
                  className="w-[268px] h-11 shadow-md"
                  defaultValue={createDate}
                  onChange={onChange}
                />
              </Space>
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Ngày Kết Thúc <span className='text-primary'>*</span></div>
              <Space direction="vertical">
                <DatePicker
                  className="w-[268px] h-11 shadow-md"
                  defaultValue={endDate}
                  onChange={onChange}
                />
              </Space>
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Số Lượng<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' value="30" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Trạng Thái <span className='text-primary'>*</span></div>
              <Select className='shadow-md'
                defaultValue="Hoạt Động"
                style={{ width: 268, height: 44 }}
                onChange={handleChange}
                options={[
                  { value: 'Hoạt Động', label: 'Hoạt Động' },
                  { value: 'Hết Hạn', label: 'Hết Hạn' },
                  { value: 'Hết Voucher', label: 'Hết Voucher' },
                ]}
              />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Người Dùng <span className='text-primary'>*</span></div>
              <Select className='shadow-md'
                defaultValue="Khang Đào"
                style={{ width: 268, height: 44 }}
                onChange={handleChange}
                options={[
                  { value: 'Khang Đào', label: 'Khang Đào' },
                  { value: 'Hưng Nguyễn', label: 'Hưng Nguyễn' },
                  { value: 'Trường Phạm', label: 'Trường Phạm' },
                  { value: 'Khang Dương', label: 'Khang Dương' },
                ]}
              />
            </div>
          </div>
          <Button />
        </div>
      </div>
    </>
  );
}

export default VoucherEdit;
