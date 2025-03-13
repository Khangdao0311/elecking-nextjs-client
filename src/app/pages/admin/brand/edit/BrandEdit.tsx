"use client";
import Button from "@/app/components/admin/Button";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Quill from "quill";
import "quill/dist/quill.snow.css";

function BrandEdit() {
  const quillRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    if (!quillRef.current) return; // Kiểm tra nếu ref tồn tại
    if (quillRef.current.querySelector(".ql-editor")) return; // Tránh khởi tạo lại

    const quill = new Quill(quillRef.current, {
      theme: "snow",
    });

    // Load dữ liệu cũ nếu có
    quill.root.innerHTML = editorContent;

    quill.on("text-change", () => {
      setEditorContent(quill.root.innerHTML);
    });
  }, [editorContent]); // Chỉ chạy khi editorContent thay đổi

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
            <div className="flex gap-2.5 flex-col">
              <div className="flex items-center gap-2.5 bg-white border border-gray-100 shadow-md p-1.5">
                <div className="w-[110px] h-auto text-sm font-normal bg-gray-300 border border-gray-100 rounded p-2 text-center">
                  Chọn tệp
                </div>
                <div className="w-full text-sm font-normal">
                  <span>1</span> Tệp
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-3">
                <div className="w-20 h-20 relative">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png"
                    alt=""
                  />
                  <div className="w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1">
                    <IoCloseSharp />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">
              Ảnh Bìa <span className="text-primary">*</span>
            </div>
            <div className="flex gap-2.5 flex-col">
              <div className="flex items-center gap-2.5 bg-white border border-gray-100 shadow-md p-1.5">
                <div className="w-[110px] h-auto text-sm font-normal bg-gray-300 border border-gray-100 rounded p-2 text-center">
                  Chọn tệp
                </div>
                <div className="w-full text-sm font-normal">
                  <span>1</span> Tệp
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-3">
                <div className="w-20 h-20 relative">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png"
                    alt=""
                  />
                  <div className="w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1">
                    <IoCloseSharp />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="text-sm font-medium">
              Mô tả thương hiệu <span className="text-primary">*</span>
            </div>
            <div
              ref={quillRef}
              className="w-full min-h-[100px] border border-gray-300 rounded"
            ></div>
          </div>
        </div>

        <Button back="brand/list" />
      </div>
    </>
  );
}

export default BrandEdit;
