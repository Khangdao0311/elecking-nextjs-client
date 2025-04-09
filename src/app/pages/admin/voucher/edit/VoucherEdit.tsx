"use client";

import { Select } from "antd";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import * as userServices from "@/app/services/userService";
import Button from "@/app/components/admin/Button";
import { useParams } from "next/navigation";
import * as voucherService from "@/app/services/voucherService";
import config from "@/app/config";
import { useRouter } from "next/navigation";
import { Input } from 'antd';
import { useEffect, useState } from "react";
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { notification, } from 'antd';

function VoucherEdit() {
  const [voucher, setVoucher] = useState<IVoucher>();
  const [getUser, setGetUser] = useState<IUser[]>([]);
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<number | null>(null);
  const [discountValue, setDiscountValue] = useState<number | null>(null);
  const [minOrderValue, setMinOrderValue] = useState<number | null>(null);
  const [maxDiscount, setMaxDiscount] = useState<number | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [user, setUser] = useState<number | null>(null);
  const router = useRouter()
  const { id }: any = useParams();
  const createDateNew = dayjs(startDate, "YYYYMMDD");
  const endDatevNew = dayjs(endDate, 'YYYYMMDD');

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: any, description: any) => {
    api[type]({
      message: message,
      description: description,
    });
  }

  const handleDateStart = (date: dayjs.Dayjs | null) => {
    if (date) {
      setStartDate(date.format("YYYYMMDD"));
    } else {
      setStartDate("");
    }
  };

  const handleDateEnd = (date: dayjs.Dayjs | null) => {
    if (date) {
      setEndDate(date.format("YYYYMMDD"));
    } else {
      setEndDate("");
    }
  };

  useEffect(() => {
    if (voucher) {
      setCode(voucher.code);
      setDiscountType(voucher.discount_type);
      setDiscountValue(voucher.discount_value);
      setMinOrderValue(voucher.min_order_value);
      setMaxDiscount(voucher.max_discount);
      setStartDate(voucher.start_date);
      setEndDate(voucher.end_date);
      setQuantity(voucher.quantity);
      setUser(voucher.user_id);
    }
  }, [voucher]);

  useEffect(() => {
    const query = { limit: 7 };
    userServices.getQuery(query).then((res) => {
      setGetUser(res.data);
    });
  }, []);

  useEffect(() => {
    voucherService.getVoucherById(`${id}`).then((res) => setVoucher(res.data));
  }, [id]);

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
              <Input className='w-[268px] h-11 shadow-md' value={code} onChange={(e) => setCode(e.target.value)} disabled />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Loại Khuyến Mãi <span className='text-primary'> *</span></div>
              <Select
                className="shadow-md"
                value={discountType}
                style={{ width: 268, height: 44 }}
                onChange={(value) => {
                  setDiscountType(Number(value));
                }
                }
                options={[
                  { value: 2, label: 'Phần trăm' },
                  { value: 1, label: 'Giá' },
                ]}
              />

            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Giá Trị Khuyến Mãi<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' value={discountValue ?? ''} onChange={(e) => setDiscountValue(Number(e.target.value) || null)} />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Đơn Tối Thiểu<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' value={minOrderValue ?? ''} onChange={(e) => setMinOrderValue(Number(e.target.value) || null)} />
            </div>
            {discountType === 2 && (
              <div className='flex gap-0.5 flex-col'>
                <div className='text-sm font-medium'>Giá Trị Cao Nhất<span className="text-primary"> *</span></div>
                <Input className='w-[268px] h-11 shadow-md' value={maxDiscount ?? ''} onChange={(e) => setMaxDiscount(Number(e.target.value) || null)} />
              </div>
            )}
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Ngày Bắt Đầu <span className='text-primary'>*</span></div>
              <Space direction="vertical">
                <DatePicker
                  className="w-[268px] h-11 shadow-md"
                  value={createDateNew.isValid() ? createDateNew : undefined} format="DD-MM-YYYY"
                  onChange={handleDateStart}
                />
              </Space>
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Ngày Kết Thúc <span className='text-primary'>*</span></div>
              <Space direction="vertical">
                <DatePicker
                  className="w-[268px] h-11 shadow-md"
                  value={endDatevNew.isValid() ? endDatevNew : undefined} format="DD-MM-YYYY"
                  onChange={handleDateEnd}
                />
              </Space>
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Số Lượng<span className="text-primary"> *</span></div>
              <Input className='w-[268px] h-11 shadow-md' value={quantity ?? ''} onChange={(e) => setQuantity(e.target.value === '' ? null : Number(e.target.value))} />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Người Dùng <span className='text-primary'>*</span></div>
              <Select
                className="shadow-md"
                value={user}
                style={{ width: 268, height: 44 }}
                onChange={(value) => {
                  setUser(value);
                }}
                options={getUser.map((e) => ({
                  value: e.id,
                  label: e.fullname,
                }))}
              />
            </div>
          </div>
          {contextHolder}
          <Space>
            <Button
              back="voucher/list/stillexpired"
              onClick={async () => {
                const start = dayjs(startDate, "YYYYMMDD");
                const end = dayjs(endDate, "YYYYMMDD");
                let errors: string[] = [];

                if (
                  !code ||
                  discountType === null ||
                  discountValue === null ||
                  minOrderValue === null ||
                  (discountType !== 1 && maxDiscount === null) ||
                  !startDate ||
                  !endDate ||
                  quantity === null
                ) {
                  errors.push("Vui lòng nhập đầy đủ thông tin.");
                }

                if (start.isAfter(end)) {
                  errors.push("Ngày bắt đầu và ngày kết thúc không hợp lệ.");
                }

                if (discountType === 1 && (discountValue ?? 0) < 1000) {
                  errors.push("Giá trị giảm giá phải lớn hơn hoặc bằng 1000.");
                }

                if (errors.length > 0) {
                  openNotificationWithIcon('error', 'Lỗi dữ liệu !', <>{errors.map((err, index) => <div key={index}>{err}</div>)}</>);
                  return;
                }

                const voucherData = {
                  code,
                  discount_type: discountType,
                  discount_value: discountValue,
                  min_order_value: minOrderValue,
                  max_discount: maxDiscount,
                  start_date: startDate,
                  end_date: endDate,
                  quantity,
                  status: 1,
                  user_id: user || null,
                };

                const voucherResponse = await voucherService.editVoucher(id, voucherData);
                if (voucherResponse?.status == 200) {
                  openNotificationWithIcon('success', "Thành công", "Sửa voucher thành công");
                  setTimeout(() => {
                    router.push(`${config.routes.admin.voucher.list}`); 
                  }, 1000);
                } else {
                  openNotificationWithIcon('error', "Lỗi", "Có lỗi xảy ra, vui lòng thử lại");
                }
              }}
            >
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
}

export default VoucherEdit;


