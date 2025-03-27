"use client";
import Button from "@/app/components/admin/Button";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input, Upload } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import type { RcFile } from "antd/es/upload/interface";
import * as uploadServices from "@/app/services/uploadService";
import * as brandServices from "@/app/services/brandService";
import axios from "axios";
import { notification, Space } from 'antd';
import config from "@/app/config";
import { useRouter } from "next/navigation";



function BrandAdd() {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [imgBanner, setImgBanner] = useState<any>();
  const [imgBrand, setImgBrand] = useState<any>();
  const quillRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState("");
  const [logo, setLogo] = useState<UploadFile[]>([]);
  const [banner, setBanner] = useState<UploadFile[]>([]);
  const router = useRouter()

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: any, description: any) => {
    api[type]({
      message: message,
      description: description,
    });
  }

  useEffect(() => {
    if (!quillRef.current) return;
    if (quillRef.current.querySelector(".ql-editor")) return;

    const quill = new Quill(quillRef.current, {
      theme: "snow",
    });

    quill.root.innerHTML = editorContent;

    quill.on("text-change", () => {
      setEditorContent(quill.root.innerHTML);
      setdescription(quill.root.innerHTML);
    });
  }, []);




  const handleRemove = (file: UploadFile, type: "logo" | "banner") => {
    if (type === "logo") {
      setLogo((prev) => prev.filter((item) => item.uid !== file.uid));
    } else {
      setBanner((prev) => prev.filter((item) => item.uid !== file.uid));
    }
  };

  const handleBeforeUpload = (file: File, type: "logo" | "banner") => {
    const newFile: UploadFile = {
      uid: crypto.randomUUID(),
      name: file.name,
      status: "uploading",
      originFileObj: file as RcFile,
    };


    const setState = type === "logo" ? setLogo : setBanner;

    setState((prev) => {
      const newFiles = [newFile];
      return newFiles;
    });

    // setState((prev) => [...prev, newFile]);

    setTimeout(() => {
      setState((prev) =>
        prev.map((item) =>
          item.uid === newFile.uid ? { ...item, status: "done" } : item
        )
      );
    }, 1000);

    return false;
  };

  return (
    <>
      <TitleAdmin title="Quản lý thương hiệu / Thêm thương hiệu" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
            Tạo Mới Thương Hiệu
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Tên Thương Hiệu <span className="text-primary">*</span>
              </div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[268px] h-11 shadow-md"
                placeholder="Nhập Tên Thương Hiệu"
              />
            </div>
          </div>
          {/* Ảnh */}
          <div>
            <div className="text-sm font-medium">
              Ảnh <span className="text-primary">*</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <Upload
                multiple={false}
                listType="picture"
                fileList={logo}
                onChange={({ fileList }) => {
                  setImgBrand(fileList.map(file => file.originFileObj));
                }}
                beforeUpload={(file) => handleBeforeUpload(file, "logo")}
                onRemove={(file) => handleRemove(file, "logo")}
                showUploadList={false}
              >
                <style jsx>{`
          :global(.ant-upload-select) {
            width: 100%!important
          }
        `}</style>
                <div className="flex items-center w-full gap-2.5 bg-white border border-gray-100 shadow-md p-1.5 cursor-pointer">
                  <div className="w-[110px] h-auto text-sm font-normal bg-gray-300 border border-gray-100 rounded p-2 text-center">
                    Chọn tệp
                  </div>
                  <div className="w-full text-sm font-normal">
                    <span>{logo.length}</span> Tệp
                  </div>
                </div>
              </Upload>

              {/* Hiển thị danh sách ảnh đã chọn */}
              <div className="flex items-center flex-wrap gap-3">
                {logo.map((file) => {
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
                        onClick={() => handleRemove(file, "logo")}
                      >
                        <IoCloseSharp className="text-red-500" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">
              Ảnh Bìa <span className="text-primary">*</span>
            </div>
            <div className="flex flex-col gap-2.5">
              
              <Upload
                multiple={false}
                listType="picture"
                fileList={banner}
                onChange={({ fileList }) => {
                  setImgBanner(fileList.map(file => file.originFileObj));
                }}
                beforeUpload={(file) => handleBeforeUpload(file, "banner")}
                onRemove={(file) => handleRemove(file, "banner")}
                showUploadList={false}
              >
                <div className="flex items-center w-full gap-2.5 bg-white border border-gray-100 shadow-md p-1.5 cursor-pointer">
                  <div className="w-[110px] h-auto text-sm font-normal bg-gray-300 border border-gray-100 rounded p-2 text-center">
                    Chọn tệp
                  </div>
                  <div className="w-full text-sm font-normal">
                    <span>{banner.length}</span> Tệp
                  </div>
                </div>
              </Upload>

              {/* Hiển thị danh sách ảnh đã chọn */}
              <div className="flex items-center flex-wrap gap-3">
                {banner.map((file) => {
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
                        onClick={() => handleRemove(file, "banner")}
                      >
                        <IoCloseSharp className="text-red-500" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
          <div className="w-full">
            <div className="text-sm font-medium">
              Mô tả thương hiệu <span className="text-primary">*</span>
            </div>
            <div
              ref={quillRef}
              className="w-full h-[100px] border border-gray-300 rounded"
            ></div>
          </div>
          {contextHolder}
          <div className="mt-[60px]">
            <Space>
              <Button
                back="brand/list"
                onClick={async () => {
                  if (!name.trim() || !imgBrand?.length || !imgBanner?.length || !description.trim()) {
                    openNotificationWithIcon('error', "Lỗi dữ liệu", "Vui lòng nhập đầy đủ thông tin");
                    return;
                  }
                  const logoFormData = new FormData();
                  logoFormData.append("image", imgBrand[0]);
                  await uploadServices.uploadSingle(logoFormData);
                  const bannerFormData = new FormData();
                  bannerFormData.append("image", imgBanner[0]);
                  await uploadServices.uploadSingle(bannerFormData);
                  const brandData = {
                    name: name,
                    logo: imgBrand[0].name,
                    banner: imgBanner[0].name,
                    description: description,
                  };
                  const brandResponse = await brandServices.addBrand(brandData);
                  if (brandResponse?.status === 200) {
                    openNotificationWithIcon("success", "Thành công", "Thêm thành công");
                    setTimeout(() => {
                      router.push(config.routes.admin.brand.list);
                    }, 1000);
                  } else {
                    openNotificationWithIcon("error", "Lỗi", "Có lỗi xảy ra, vui lòng thử lại");
                  }
                }}
              >
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
}

export default BrandAdd;
