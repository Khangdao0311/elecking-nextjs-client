"use client";
import Button from "@/app/components/admin/Button";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import React, { useEffect, useRef, useState } from "react";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { useStore } from "@/app/store";
import Loading from "@/app/components/client/Loading";
import { Input, Modal, Select, Upload } from "antd";
import { IoCloseSharp } from "react-icons/io5";
import "quill/dist/quill.snow.css";
import { Button as ButtonAnt, notification, Space } from "antd";
import { useRouter } from "next/navigation";
import config from "@/app/config";
import * as proptypeServices from "@/app/services/proptypeService";
import * as categoryServices from "@/app/services/categoryService";
import * as authServices from "@/app/services/authService";
import Cookies from "js-cookie";

function CategoryAdd() {
  const [proptype, setproptype] = useState<IProptype[]>([]);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [selectedProptype, setSelectedProptype] = useState<string[]>([]);
  const quillRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState("");
  const [state, dispatch] = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

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
    const query = { limit: 0 };
    proptypeServices.getQuery(query).then((res) => {
      if (res.status === 200) {
        setproptype(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!quillRef.current) return;
    if (quillRef.current.querySelector(".ql-editor")) return;

    const Quill = require("quill").default;
    const quill = new Quill(quillRef.current, {
      theme: "snow",
    });

    quill.root.innerHTML = editorContent;

    quill.on("text-change", () => {
      setEditorContent(quill.root.innerHTML);
    });
  }, []);

  const handleChange = (value: string[]) => {
    setSelectedProptype(value);
  };

  const [image, setImage] = useState<UploadFile[]>([]);

  const beforeUpload = (file: File) => {
    const newfile: UploadFile = {
      uid: crypto.randomUUID(),
      name: file.name,
      status: "uploading",
      originFileObj: file as RcFile,
    };
    setImage((prev) => {
      const newFile = [newfile];
      return newFile;
    });
    setTimeout(() => {
      setImage((prev) =>
        prev.map((item) =>
          item.uid === newfile.uid ? { ...item, status: "done" } : item
        )
      );
    }, 1000);

    return false;
  };
  const removeimage = (file: UploadFile) => {
    setImage((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  function handleAdd() {
    if (
      image[0]?.originFileObj &&
      selectedProptype &&
      name &&
      editorContent &&
      icon
    ) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image[0].originFileObj as File);
      formData.append("description", editorContent);
      formData.append("proptypes", JSON.stringify(selectedProptype));
      formData.append("icon", icon);
      setLoading(true);
      (function callback() {
        categoryServices.addCategory(formData).then((res) => {
          if (res.status === 200) {
            openNotificationWithIcon(
              "success",
              "Thành công",
              "Thêm danh mục thành công"
            );
            setTimeout(() => {
              router.push(`${config.routes.admin.category.list}`);
            }, 1500);
          } else if (res.status === 401) {
            const resfreshTokenAdmin = authServices.getRefreshTokenAdmin();
            if (resfreshTokenAdmin) {
              authServices.getToken(resfreshTokenAdmin).then((res) => {
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
            setLoading(false);
            openNotificationWithIcon(
              "error",
              "Lỗi dữ liệu",
              res.message
            );
          }
        });
      })();
    } else {
      openNotificationWithIcon(
        "error",
        "Lỗi dữ liệu",
        "Vui lòng nhập đầy đủ thông tin"
      );
    }
  }

  return (
    <>
      {state.load && <Loading />}
      {state.load ? (
        ""
      ) : (
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
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    className="w-[268px] h-11 "
                    placeholder="Nhập Tên Danh Mục"
                  />
                </div>
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium ">
                    Danh Mục Cấu Hình <span className="text-primary">*</span>
                  </div>
                  <Select
                    mode="multiple"
                    placeholder="Chọn Danh Mục Cấu Hình"
                    value={selectedProptype}
                    onChange={handleChange}
                    className=" min-w-[268px] h-[44px] flex items-center justify-center"
                    options={proptype.map((item) => ({
                      value: item.id,
                      label: item.name,
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
                <div className="flex gap-0.5 flex-col">
                  <div className="text-sm font-medium">
                    Biểu Tượng <span className="text-primary">*</span>
                  </div>
                  <Input
                    value={icon}
                    onChange={(e: any) => setIcon(e.target.value)}
                    className="w-[268px] h-11 "
                    placeholder="Nhập Biểu Tượng"
                  />
                </div>
              </div>

              <div>
                <div className="text-sm font-medium">
                  Ảnh <span className="text-primary">*</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <Upload
                    multiple={false}
                    maxCount={1}
                    listType="picture"
                    fileList={image}
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
                        <span>{image.length}</span> Tệp
                      </div>
                    </div>
                  </Upload>

                  <div className="flex items-center flex-wrap gap-3">
                    {image.map((file) => {
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
                  <div className="w-full">
                    <div className="text-sm font-medium">
                      Mô tả <span className="text-primary">*</span>
                    </div>
                    <div
                      ref={quillRef}
                      className="w-full !h-[150px] border border-gray-300 rounded"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {contextHolder}
            <Button back={config.routes.admin.category.list} onClick={handleAdd} loading={loading}/>
          </div>
        </>
      )}
    </>
  );
}

export default CategoryAdd;
