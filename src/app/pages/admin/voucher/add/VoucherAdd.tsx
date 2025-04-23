"use client";
import { Select } from "antd";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input } from "antd";
import Button from "@/app/components/admin/Button";
import { useEffect, useState } from "react";
import * as userServices from "@/app/services/userService";
import * as voucherServices from "@/app/services/voucherService";
import { useRouter } from "next/navigation";
import config from "@/app/config";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { notification } from "antd";
import * as authServices from "@/app/services/authService";
import Cookies from "js-cookie";


function VoucherAdd() {
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<number | null>(null);
  const [discountValue, setDiscountValue] = useState<number | null>(null);
  const [minOrderValue, setMinOrderValue] = useState<number | null>(null);
  const [maxDiscount, setMaxDiscount] = useState<number | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [getUser, setGetUser] = useState([]);
  const [user, setUser] = useState("");
  const router = useRouter();

  type NotificationType = "success" | "info" | "warning" | "error";
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: any,
    description: any
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  useEffect(() => {
    const query = { limit: 7 };
    userServices.getQuery(query).then((res) => {
      if (res.status === 200) {
        setGetUser(res.data);
      }
    });
  }, []);

  const handleChangeUser = (value: string) => {
    setUser(value);
  };

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

  return (
    <>
      <TitleAdmin title="Quản lý voucher / Sửa voucher" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full">
            <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
              Thêm Voucher
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Mã Khuyến Mãi <span className="text-primary">*</span>
              </div>
              <Input
                onChange={(e) => setCode(e.target.value)}
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập mã khuyễn mãi"
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Loại Khuyến Mãi <span className="text-primary"> *</span>
              </div>
              <Select
                className="shadow-md"
                value={discountType}
                style={{ width: 268, height: 44 }}
                onChange={(value) => {
                  setDiscountType(Number(value));
                }}
                options={[
                  { value: 2, label: "Phần trăm" },
                  { value: 1, label: "Giá" },
                ]}
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Giá Trị Khuyến Mãi<span className="text-primary"> *</span>
              </div>
              <Input
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập giá trị của voucher"
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Đơn Tối Thiểu<span className="text-primary"> *</span>
              </div>
              <Input
                onChange={(e) => setMinOrderValue(Number(e.target.value))}
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập đơn tối nhiểu cho voucher"
              />
            </div>
            {discountType === 2 && (
              <div className="flex gap-0.5 flex-col">
                <div className="text-sm font-medium">
                  Giá Trị Cao Nhất<span className="text-primary"> *</span>
                </div>
                <Input
                  onChange={(e) => setMaxDiscount(Number(e.target.value))}
                  className="w-[268px] h-11 shadow-md"
                  placeholder="Nhập giá trị cao nhất"
                />
              </div>
            )}
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Ngày Bắt Đầu <span className="text-primary">*</span>
              </div>
              <Space direction="vertical">
                <DatePicker
                  className="w-[268px] h-11 shadow-md"
                  placeholder="dd/mm/yyy"
                  onChange={handleDateStart}
                />
              </Space>
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Ngày Kết Thúc <span className="text-primary">*</span>
              </div>
              <Space direction="vertical">
                <DatePicker
                  className="w-[268px] h-11 shadow-md"
                  placeholder="dd/mm/yyy"
                  onChange={handleDateEnd}
                />
              </Space>
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Số Lượng<span className="text-primary"> *</span>
              </div>
              <Input
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-[268px] h-11 shadow-md"
                placeholder="Số lượng"
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Người Dùng <span className="text-primary">*</span>
              </div>
              <Select
                className="shadow-md"
                placeholder="Chọn người dùng"
                style={{ width: 268, height: 44 }}
                onChange={handleChangeUser}
                options={getUser.map((e: any) => ({
                  value: e.id,
                  label: e.fullname,
                }))}
              />
            </div>
          </div>
          {contextHolder}
          <Space>
            <Button
              back={config.routes.admin.voucher.list}
              onClick={async () => {
                const start = dayjs(startDate, "YYYYMMDD");
                const end = dayjs(endDate, "YYYYMMDD");
                let errors: string[] = [];
                if (
                  !code ||
                  discountType === null ||
                  discountValue === null ||
                  minOrderValue === null ||
                  maxDiscount === null ||
                  !startDate ||
                  !endDate ||
                  quantity === null ||
                  !user
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
                  openNotificationWithIcon(
                    "error",
                    "Lỗi dữ liệu !",
                    <>
                      {errors.map((err, index) => (
                        <div key={index}>{err}</div>
                      ))}
                    </>
                  );
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
                  user_id: user,
                  status: 1,
                };

                (async function callback() {
                  const voucherResponse = await voucherServices.addVoucher(voucherData);
                  if (voucherResponse.status === 200) {
                    openNotificationWithIcon(
                      "success",
                      "Thành công",
                      "Thêm voucher thành công"
                    );
                    setTimeout(() => {
                      router.push(config.routes.admin.voucher.list);
                    }, 1000);
                  } else if (voucherResponse.status === 401) {
                    const refreshTokenAdmin = authServices.getRefreshTokenAdmin();
                    if (refreshTokenAdmin) {
                      authServices.getToken(refreshTokenAdmin).then((res) => {
                        if (res.status === 200) {
                          Cookies.set("access_token_admin", res.data);
                          callback();
                        } else {
                          authServices.clearAdmin();
                          router.push(config.routes.admin.login);
                        }
                      });
                    }
                  } else {
                    openNotificationWithIcon("error", "Lỗi", "Có lỗi xảy ra, vui lòng thử lại");
                  }
                })();



              }}
            ></Button>
          </Space>
        </div>
      </div>
    </>
  );
}

export default VoucherAdd;
