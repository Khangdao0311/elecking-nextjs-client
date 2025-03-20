"use client";
import Button from "@/app/components/admin/Button";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input, Select, Upload } from "antd";
import React, { useState } from "react";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { IoCloseSharp } from "react-icons/io5";

function CategoryAdd() {
  const [name, setName] = useState();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const OPTIONS = [
    "ram",
    "storege",
    "cpu",
    "gpu",
    "ssd",
    "hdd",
    "screen_size",
    "refresh_rate",
    "resolution",
  ];
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const handleChange = (value: string[]) => {
    console.log("Các giá trị đã chọn:", value);
    setSelectedItems(value);
  };
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
      <TitleAdmin title="Quản lý danh mục / Sửa danh mục" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full">
            <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
              Tạo Mới Danh Mục
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Tên Danh Mục <span className="text-primary">*</span>
              </div>
              <Input
                onChange={(e: any) => console.log(e.target.value)}
                className="w-[268px] h-11 "
                placeholder="Nhập Tên Danh Mục"
              />
            </div>
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium ">
                Biến thể <span className="text-primary">*</span>
              </div>
              <Select
                mode="multiple"
                placeholder="Inserted are removed"
                value={selectedItems}
                onChange={handleChange}
                className=" min-w-[268px] h-[44px] flex items-center justify-center"
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
              <style jsx>{`
                :global(.ant-select-selection-overflow) {
                  height: 44px !important;
                  padding: 0 5px !important;
                  margin-top: 0 !important;
                }
                :global(.ant-select-selection-item) {
                  margin-top: 0 !important;
                }
              `}</style>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Mô Tả <span className="text-primary">*</span>
              </div>
              <Input.TextArea
                onChange={(e) => console.log(e.target.value)}
                className="w-[268px] h-11"
                placeholder="Nhập Tên Danh Mục"
              />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">
              Ảnh <span className="text-primary">*</span>
            </div>
            <div className="flex flex-col gap-2.5">
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
        </div>
        <Button back="category/list" />
      </div>
    </>
  );
}

export default CategoryAdd;
