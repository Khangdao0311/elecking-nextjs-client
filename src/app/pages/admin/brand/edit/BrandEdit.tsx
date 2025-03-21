"use client";
import Button from "@/app/components/admin/Button";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { UploadFile } from "antd/es/upload/interface";
import { IoCloseSharp } from "react-icons/io5";
import Quill from "quill";
import type { RcFile } from "antd/es/upload/interface";
import "quill/dist/quill.snow.css";
import { useParams } from "next/navigation";
import * as uploadServices from "@/app/services/uploadService";
;

function BrandEdit() {
  const quillRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState("");
    const [logo, setLogo] = useState<UploadFile[]>([]);
    const [banner, setBanner] = useState<UploadFile[]>([]);
    const [name, setName] = useState("")
    const {id}: any =useParams();
    console.log(id);
    

  useEffect(() => {
    if (!quillRef.current) return; // Kiểm tra nếu ref tồn tại
    if (quillRef.current.querySelector(".ql-editor")) return; // Tránh khởi tạo lại

    const quill = new Quill(quillRef.current, {
      theme: "snow",
    },);

    // Load dữ liệu cũ nếu có
    quill.root.innerHTML = editorContent;

    quill.on("text-change", () => {
      setEditorContent(quill.root.innerHTML);
    });
  }, [editorContent]); // Chỉ chạy khi editorContent thay đổi
  const handleRemove = (file: UploadFile, type: "logo" | "banner") => {
      if (type === "logo") {
        setLogo((prev) => prev.filter((item) => item.uid !== file.uid));
      } else {
        setBanner((prev) => prev.filter((item) => item.uid !== file.uid));
      }
    };
    const handleBeforeUpload = (file: File, type: "logo" | "banner") => {
      const newFile: UploadFile = {
        uid: crypto.randomUUID(), // Tạo UID mới để đảm bảo duy nhất
        name: file.name,
        status: "uploading",
        originFileObj: file as RcFile,
      };
    
      const setState = type === "logo" ? setLogo : setBanner;
    
      setState((prev) => {
        // Chỉ giữ lại file mới nhất, loại bỏ file cũ
        const newFiles = [newFile];
        return newFiles;
      });
    
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
      <TitleAdmin title="Quản lý thương hiệu / Sửa thương hiệu" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">
            Sửa Thương Hiệu
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Tên Thương Hiệu <span className="text-primary">*</span>
              </div>
              <Input
              value={name}
              onChange={(e)=>setName(e.target.value)}
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
                listType="picture"
                multiple={false}
                fileList={logo}
                beforeUpload={(file)=>handleBeforeUpload(file, "logo")}
                onRemove={(file)=>handleRemove(file, "logo")}
                showUploadList={false}
                maxCount={1}
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
                maxCount={1}
                multiple={false}
                listType="picture"
                fileList={banner}
                beforeUpload={(file)=>handleBeforeUpload(file, "banner")}
                onRemove={(file)=>handleRemove(file, "banner")}
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
            <div
              ref={quillRef}
              className="w-full min-h-[100px] border border-gray-300 rounded"
            ></div>
            </div>
          </div>
        </div>
        <Button back="brand/list" onClick={() => {
          const imglogo= logo[0].originFileObj as File
          const formData = new FormData()
          const imgbanner= banner[0].originFileObj as File
          formData.append("image[]",imglogo)
          formData.append("image[]",imgbanner)
          
          uploadServices.uploadMultiple(formData)
        }}/>
      </div>
    </>
  );
}

export default BrandEdit;
