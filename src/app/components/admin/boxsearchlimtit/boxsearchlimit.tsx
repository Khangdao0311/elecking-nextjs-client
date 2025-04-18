"use client";
import React, { useEffect, useRef, useState } from "react";
import { Select, Input, Space, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

const BoxSearchLimit = ({
  title,
  onLimitChange,
  onSearch,
  status,
  setStatus,
  quantityOder,
  totalActiveVoucher,
  totalExpiredVoucher,
  paymentStatus,
  setPaymentStatus,
  selectedDay = '',
  setSelectedDay,
  selectedYear,
  setSelectedYear,
  selectedMonth = '',
  setSelectedMonth

}: any) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    onSearch(searchValue);
  };
  const pathname = usePathname();
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const getDaysInMonth = (year: number, month: number) => {
    const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
    if (monthsWith31Days.includes(month)) return 31;
    const monthsWith30Days = [4, 6, 9, 11];
    if (monthsWith30Days.includes(month)) return 30;
    return isLeapYear(year) ? 29 : 28;
  };

  const preValue = useRef(searchValue);
  
  useEffect(() => {
    if(searchValue === "" && preValue.current !== ""){
      handleSearch();
    }
    preValue.current = searchValue;
  }, [searchValue]);

  return (
    <div className="flex items-center bg-white shadow-xl rounded-lg px-7 py-3 justify-between">
      <div className={`flex ${["/admin/order", "/admin/voucher"].some((p) => pathname.startsWith(p)) ? "w-5/6" : "w-1/2"} gap-4 items-center`}>
        {pathname.startsWith("/admin/order") ? (
          <div className="flex w-[100%] gap-2 bg-white rounded-tl-lg rounded-tr-lg">
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 'auto',
                  spaceBetween: 8,
                },
                640: {
                  slidesPerView: 'auto',
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 'auto',
                  spaceBetween: 8,
                },
                1024: {
                  slidesPerView: 'auto',
                  spaceBetween: 8,
                },
              }}
              className="flex w-full gap-2 bg-white rounded-tl-lg rounded-tr-lg"
            >
              <SwiperSlide
                onClick={() => {
                  if (status !== "") setStatus("");
                  setPaymentStatus(null);
                }}
                className={`!w-auto flex-shrink-0 px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl transition-all duration-200 ${status === ""
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                  }`}
              >
                Tất cả ({quantityOder.all})
              </SwiperSlide>

              <SwiperSlide
                onClick={() => {
                  if (status !== 2) setStatus(2);
                  setPaymentStatus(null);
                }}
                className={`!w-auto flex-shrink-0 px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl transition-all duration-200 ${status === 2
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                  }`}
              >
                Chờ xác nhận ({quantityOder[2]})
              </SwiperSlide>

              <SwiperSlide
                onClick={() => {
                  if (status !== 3) setStatus(3);
                  setPaymentStatus(null);
                }}
                className={`!w-auto flex-shrink-0 px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl transition-all duration-200 ${status === 3
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                  }`}
              >
                Đã xác nhận ({quantityOder[3]})
              </SwiperSlide>

              <SwiperSlide
                onClick={() => {
                  if (status !== 4) setStatus(4);
                  setPaymentStatus(null);
                }}
                className={`!w-auto flex-shrink-0 px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl transition-all duration-200 ${status === 4
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                  }`}
              >
                Đang vận chuyển ({quantityOder[4]})
              </SwiperSlide>

              <SwiperSlide
                onClick={() => {
                  if (status !== 1) setStatus(1);
                  setPaymentStatus(null);
                }}
                className={`!w-auto flex-shrink-0 px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl transition-all duration-200 ${status === 1
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                  }`}
              >
                Đã nhận ({quantityOder[1]})
              </SwiperSlide>

              <SwiperSlide
                onClick={() => {
                  if (status !== 0) setStatus(0);
                  setPaymentStatus(null);
                }}
                className={`!w-auto flex-shrink-0 px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl transition-all duration-200 ${status === 0
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                  }`}
              >
                Đã hủy ({quantityOder[0]})
              </SwiperSlide>

              <SwiperSlide
                onClick={() => {
                  setPaymentStatus(true);
                  setStatus(null);
                }}
                className={`!w-auto flex-shrink-0 px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl transition-all duration-200 ${paymentStatus === true
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                  }`}
              >
                Đã thanh toán ({quantityOder.payment_status})
              </SwiperSlide>
              <SwiperSlide className="!w-[16px] pointer-events-none select-none" />
              <SwiperSlide className="!w-[16px] pointer-events-none select-none" />
              <SwiperSlide className="!w-[16px] pointer-events-none select-none" />
            </Swiper>

            <div>
              <Space>
                <Select
                  value={selectedYear || undefined}
                  style={{ width: 120 }}
                  showSearch
                  filterOption={(input: string, option: any) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                  placeholder="Chọn năm"
                  onChange={(value) => {
                    setSelectedYear(value);
                  }}
                  options={[
                    { value: "2025", label: "2025" },
                    { value: "2024", label: "2024" },
                  ]}
                />

                <Select
                  value={selectedMonth}
                  style={{ width: 120 }}
                  showSearch
                  filterOption={(input: string, option: any) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                  placeholder="Chọn tháng"
                  onChange={(value) => setSelectedMonth(value)}
                  disabled={!selectedYear}
                  options={[
                    { value: "", label: "Tất cả" },
                    ...Array.from({ length: 12 }, (_, i) => ({
                      value: (i + 1).toString(),
                      label: `Tháng ${i + 1}`,
                    })),
                  ]}
                />

                <Select
                  value={selectedDay}
                  style={{ width: 120 }}
                  showSearch
                  filterOption={(input: string, option: any) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                  placeholder="Chọn ngày"
                  onChange={(value) => setSelectedDay(value)}
                  disabled={!selectedMonth}
                  options={[
                    { value: "", label: "Tất cả" },
                    ...Array.from({ length: getDaysInMonth(Number(selectedYear), Number(selectedMonth)) }, (_, i) => ({
                      value: (i + 1).toString(),
                      label: `Ngày ${i + 1}`,
                    })),
                  ]}
                />
              </Space>
            </div>
          </div>
        ) : pathname.startsWith("/admin/voucher") ? (
          <div className="flex w-[100%] gap-2 bg-white rounded-tl-lg rounded-tr-lg">
            <div
              onClick={() => setStatus(0)}
              className={`${status === 0
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Còn hạn ({totalActiveVoucher})
            </div>
            <div
              onClick={() => setStatus(1)}
              className={`${status === 1
                ? "border-primary bg-primary text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                } px-3 py-1 text-sm font-medium border rounded-lg select-none cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              Hết hạn ({totalExpiredVoucher})
            </div>
          </div>
        ) : (
          <>
            <p className="shrink-0">Tìm kiếm:</p>
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
          </>
        )}
      </div>

      <div className="flex 1/3 gap-2 justify-end items-center">
        <p>Hiện</p>
        <Select
          defaultValue={5}
          style={{ width: 80 }}
          onChange={(value) => onLimitChange(value)}
          options={[
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 15, label: "15" },
            { value: 20, label: "20" },
            { value: 30, label: "30" },
          ]}
        />
        <p>{title}</p>
      </div>
    </div>

  );

};

export default BoxSearchLimit;
