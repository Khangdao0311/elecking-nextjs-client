"use client";

import { Select } from "antd";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input } from 'antd';
import { IoCloseSharp } from 'react-icons/io5';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import Button from "@/app/components/admin/Button";
import dayjs from 'dayjs';

function VoucherAdd() {
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
            <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">Thêm Voucher</div>
          </div>
          <div className='flex items-center flex-wrap gap-4'>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Mã Khuyến Mãi <span className="text-primary">*</span></div>
              <Input className='w-[268px] h-11 shadow-md' placeholder="Nhập mã khuyễn mãi"/>
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Loại Khuyến Mãi <span className='text-primary'> *</span></div>
              <Select className='shadow-md'
                placeholder = "Chọn loại khuyến mãi"
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
              <Input className='w-[268px] h-11 shadow-md' placeholder="Nhập giá trị của voucher"/>
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Đơn Tối Thiểu<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' placeholder="Nhập đơn tối nhiểu cho voucher"/>
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Giá Trị Cao Nhất<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' placeholder="Nhập giá trị cao nhất" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Ngày Bắt Đầu <span className='text-primary'>*</span></div>
              <Space direction="vertical">
                <DatePicker
                  className="w-[268px] h-11 shadow-md"
                  placeholder="dd/mm/yyy"
                />
              </Space>
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Ngày Kết Thúc <span className='text-primary'>*</span></div>
              <Space direction="vertical">
                <DatePicker
                  className="w-[268px] h-11 shadow-md"
                  placeholder="dd/mm/yyy"
                />
              </Space>
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Số Lượng<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' placeholder="Số lượng" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Trạng Thái <span className='text-primary'>*</span></div>
              <Select className='shadow-md'
                placeholder = "Chọn trạng thái"
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
                placeholder = "Chọn người dùng"
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

export default VoucherAdd;
