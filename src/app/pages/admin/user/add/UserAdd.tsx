"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input, Upload } from "antd";
import { Select } from "antd";
import ButtonAdmin from "@/app/components/admin/Button";
import React, { useState } from "react";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { IoCloseSharp } from "react-icons/io5";
import { number } from "yup";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

function UserAdd() {
  const [images, setImages] = useState<UploadFile[]>([]);
  const beforeUpload = (file: File) => {
    const newfile: UploadFile = {
      uid: crypto.randomUUID(),
      name: file.name,
      status: "uploading",  
      originFileObj: file as RcFile,
    };
    setImages((prev) => [...prev, newfile]);
    setTimeout(() => {
      setImages((prev) =>
        prev.map((item) =>
          item.uid === newfile.uid ? { ...item, status: "done" } : item
        )
      );
    }, 1000);

    return false;
  };
  const removeimage = (file: UploadFile) => {
    setImages((prev) => prev.filter((item) => item.uid !== file.uid));
  };
  return (
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
            <Input
              className="w-[268px] rounded shadow-md h-[44px]"
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
              <p className="text-sm font-medium">Mật Khẩu</p>
              <p className="text-primary w-2 h-2">*</p>
            </div>
            <Input
              className="w-[268px] rounded shadow-md h-[44px]"
              placeholder="123"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
              <p className="text-sm font-medium">Số Điện Thoại</p>
            </div>
            <Input
              className="w-[268px] rounded shadow-md h-[44px]"
              placeholder="Số điện thoại"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
              <p className="text-sm font-medium">Email</p>
            </div>
            <Input
              className="w-[268px] rounded shadow-md h-[44px]"
              placeholder="Số điện thoại"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
              <p className="text-sm font-medium">Họ Và Tên</p>
              <p className="text-primary w-2 h-2">*</p>
            </div>
            <Input
              className="w-[268px] rounded shadow-md h-[44px]"
              placeholder="Họ và tên"
            />
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
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
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
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
                { value: "Yiminghe", label: "yiminghe" },
                { value: "disabled", label: "Disabled", disabled: true },
              ]}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-sm font-medium">
            Ảnh <span className="text-primary">*</span>
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <Upload
              multiple
              listType="picture"
              fileList={images}
              beforeUpload={beforeUpload}
              onRemove={removeimage}
              showUploadList={false}
            >
              <style jsx>{`
                :global(.ant-upload-select) {
                  width: 100% !important;
                }
              `}</style>
              <div className="flex items-center w-full gap-2.5 bg-white border border-gray-100 shadow-md p-1.5 cursor-pointer">
                <div className="w-[110px] h-auto text-sm font-normal bg-gray-300 border border-gray-100 rounded p-2 text-center">
                  Chọn tệp
                </div>
                <div className="w-full text-sm font-normal">
                  <span>{images.length}</span> Tệp
                </div>
              </div>
            </Upload>

            {/* Hiển thị danh sách ảnh đã chọn */}
            <div className="flex items-center flex-wrap gap-3">
              {images.map((file) => {
                const imageSrc = file.originFileObj
                  ? URL.createObjectURL(file.originFileObj)
                  : file.url;

                return (
                  <div key={file.uid} className="w-20 h-20 relative">
                    {file.status === "uploading" ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                      </div>
                    ) : (
                      <img
                        src={imageSrc}
                        alt={file.name}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                    <div
                      className="w-5 h-5 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1 cursor-pointer"
                      onClick={() => removeimage(file)}
                    >
                      <IoCloseSharp className="text-red-500" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ButtonAdmin back="user/list"/>
      </div>
    </>
  );
}

export default UserAdd;
