"use client";
import Button from "@/app/components/admin/Button";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { RcFile, UploadFile } from "antd/es/upload/interface";
import { IoCloseSharp } from "react-icons/io5";
import * as proptypeService from "@/app/services/proptypeService";
import * as uploadService from "@/app/services/uploadService"
import * as categoryService from "@/app/services/categoryService"
function CategoryAdd() {
  const [proptype, setproptype] = useState<IProptype[]>([]);
  useEffect(() => {
    const query = { limit: 0 };
    proptypeService.getQuery(query).then((res) => setproptype(res.data));
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProptype, setSelectedProptype] = useState<string[]>([]);

  // chạy mảng để lấy tên của proptype
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
    if (image[0]?.originFileObj) {
      const formData = new FormData();
      formData.append("image", image[0].originFileObj as File);
      uploadService.uploadSingle(formData)
    } else {
      console.warn("Không có ảnh được chọn!");
    }
    if(image[0]?.originFileObj && selectedProptype && name && description){
      categoryService.addCategory({name:name, image: image[0].name, description: description, proptypes: JSON.stringify(selectedProptype)})
      .then(res => {
        res.data
        console.log('Thêm thành công')
      })
    }
  }


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
                onChange={(e: any) => setName(e.target.value)}
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
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-0.5 flex-col">
              <div className="text-sm font-medium">
                Mô Tả <span className="text-primary">*</span>
              </div>
              <Input.TextArea
                onChange={(e) => setDescription(e.target.value)}
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

              {/* Hiển thị danh sách ảnh đã chọn */}
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
            </div>
          </div>
        </div>
        <Button
          back="category/list"
          onClick={handleAdd}
        />
      </div>
    </>
  );
}

export default CategoryAdd;
