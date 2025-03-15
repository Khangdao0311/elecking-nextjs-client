"use client";

import { GoArrowLeft } from "react-icons/go";
import { Input, Space } from "antd";
import React, { useState } from "react";

function ForgotPassword() {
  const [currentPopup, setCurrentPopup] = useState<string | null>(null);

  const showPopup = (popupName: string) => {
    setCurrentPopup(popupName);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      <div className="flex items-center justify-center min-h-[500px]">
        {/* Quên mật khẩu */}
        {currentPopup === null && (
          <div className="w-[524px] p-10 shadow-xl">
            <div className="flex items-center justify-center flex-col gap-5">
              <div className="flex items-center w-[100%] gap-28">
                <button className="text-primary" onClick={goBack}>
                  <GoArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-2xl font-bold text-primary">
                  Quên mật khẩu
                </div>
              </div>
              <div className="flex flex-col gap-2 mx-auto w-[100%]">
                <div className="text-base font-medium">
                  Email / Số điện thoại
                </div>
                <Input
                  className="text-sm font-normal text-gray-500 pt-4 pb-4 pl-4 border border-gray-200 rounded"
                  placeholder="Nhập email hoặc số điện thoại"
                />
              </div>
              <button
                className="text-lg text-center font-bold text-white pt-2.5 pb-2.5 pl-[180px] pr-[180px] bg-primary rounded"
                onClick={() => showPopup("resetEmail")}
              >
                Tiếp theo
              </button>
            </div>
          </div>
        )}

        {/* Đặt lại mật khẩu theo email */}
        {currentPopup === "resetEmail" && (
          <div className="w-[524px] p-10 shadow-xl">
            <div className="flex items-center justify-center flex-col gap-5">
              <div className="flex items-center w-[100%] gap-28">
                <button className="text-primary" onClick={() => setCurrentPopup(null)}>
                  <GoArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-2xl font-bold text-primary">
                  Đặt lại mật khẩu
                </div>
              </div>
              <div className="text-base font-normal">
                Mã xác nhận đã được gửi đến email
              </div>
              <div className="text-base font-medium text-primary">
                nguyenvana@gmail.com
              </div>
              <button
                className="text-lg text-center font-bold text-white pt-2.5 pb-2.5 pl-[180px] pr-[180px] bg-primary rounded"
                onClick={() => showPopup("setPasswordEmail")}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Thiết lập mật khẩu theo email */}
        {currentPopup === "setPasswordEmail" && (
          <div className="w-[524px] p-10 shadow-xl">
            <div className="flex items-center justify-center flex-col gap-5">
              <div className="flex items-center w-[100%] gap-24">
                <button className="text-primary" onClick={() => showPopup("resetEmail")}>
                  <GoArrowLeft className="w-6 h-6" />
                </button>
                <div className="text-2xl font-bold text-primary">
                  Thiết lập mật khẩu
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-lg font-medium">Tạo mật khẩu mới cho</div>
                <div className="text-lg font-medium">nguyenvana@gmail.com</div>
              </div>
              <Space direction="vertical">
                <Input.Password
                  className="text-sm font-normal text-gray-500 pt-4 pb-4 pl-4 border border-gray-200 rounded w-[444px]"
                  placeholder="Mật khẩu"
                />
              </Space>
              <button
                className="text-lg text-center font-bold text-white pt-2.5 pb-2.5 pl-[180px] pr-[180px] bg-primary rounded"
                onClick={() => setCurrentPopup(null)}
              >
                Tiếp theo
              </button>
            </div>
          </div>
        )}

        {/* Đặt lại mật khẩu theo sđt*/}
      {/* <div className="w-[524px] p-10 shadow-xl">
        <div className="flex items-center justify-center flex-col gap-5">
          <div className="flex items-center w-[100%] gap-24">
            <div className="text-primary">
              <GoArrowLeft className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-primary">Đặt lại mật khẩu</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center flex-col gap-2">
              <div className="text-base font-normal">Mã xác minh của bạn sẽ được gửi bằng tin nhắn đến</div>
              <div className="text-base font-medium">0976767676</div>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <div className="w-[50px] h-[100px] border-b border-gray-500"></div>
              <div className="w-[50px] h-[100px] border-b border-gray-500"></div>
              <div className="w-[50px] h-[100px] border-b border-gray-500"></div>
              <div className="w-[50px] h-[100px] border-b border-gray-500"></div>
              <div className="w-[50px] h-[100px] border-b border-gray-500"></div>
            </div>
            <div className="pt-12 pb-12 text-center">
              vui lòng chờ 60s để gửi lại
            </div>
          </div>
          <div className="text-lg text-center font-bold text-white pt-2.5 pb-2.5 pl-[180px] pr-[180px] bg-primary rounded">
            Tiếp theo
          </div>
        </div>
      </div> */}

      {/* Đặt lại mật khẩu theo sđt*/}
      {/* <div className="w-[524px] p-10 shadow-xl">
        <div className="flex items-center justify-center flex-col gap-5">
          <div className="flex items-center w-[100%] gap-24">
            <div className="text-primary">
              <GoArrowLeft className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-primary">Thiết lập mật khẩu</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-lg font-medium">Tạo mật khẩu mới cho</div>
            <div className="text-lg font-medium">0976767676</div>
          </div>
          <div className="flex flex-col gap-4">
            <Space direction="vertical">
              <Input.Password className="text-sm font-normal text-gray-500 pt-4 pb-4 pl-4 border border-gray-200 rounded w-[444px]" placeholder="Mật khẩu" />
            </Space>
              <div className="text-base font-normal text-gray-500">Ít nhất một kí tự viết thường.</div>
              <div className="text-base font-normal text-gray-500">Ít nhất một kí tự viết hoa.</div>
              <div className="text-base font-normal text-gray-500">8 - 16 kí tự.</div>
              <div className="text-base font-normal text-gray-500">Chỉ các chữ cái, số và ký tự phổ biến mới có thể được sử dụng.</div>
          </div>
          <div className="text-lg text-center font-bold text-white pt-2.5 pb-2.5 pl-[180px] pr-[180px] bg-primary rounded">
            Tiếp theo
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default ForgotPassword;
