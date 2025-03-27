"use client"
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Input, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import ButtonAdmin from "@/app/components/admin/Button";
import * as userServices from "@/app/services/userService";
import { useParams } from "next/navigation";
import { notification, Space } from 'antd';
import config from "@/app/config";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";

function UserEdit() {
  const [user, setUsers] = useState<IUser>();
  const [role, setRole] = useState(Number)
  const [status, setStautus] = useState(Number)
  const router = useRouter()


  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: any, description: any) => {
    api[type]({
      message: message,
      description: description,
    });
  }

  const { id }: any = useParams();

  useEffect(() => {
    userServices.getById(`${id}`).then((res) => {
      setUsers(res.data);
      setRole(res.data.role);
      setStautus(res.data.status);
    });
  }, [id]);

  return (
    <>
      <TitleAdmin title="Quản lý người dùng / Sửa Người Dùng" />
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="py-4 flex flex-col w-full gap-4">
          <div className="p-4 border-b border-primary ">
            <p className="text-2xl font-semibold">Sửa Người Dùng</p>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap w-full">
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
              <p className="text-sm font-medium">Tên người dùng</p>
              <p className="text-primary w-2 h-2">*</p>
            </div>
            <Input disabled className="w-[268px] rounded shadow-md h-[44px]" placeholder="Nguyễn Văn A" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
              <p className="text-sm font-medium">Số Điện Thoại</p>
            </div>
            <Input disabled className="w-[268px] rounded shadow-md h-[44px]" placeholder="Số điện thoại" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
              <p className="text-sm font-medium">Email</p>
            </div>
            <Input disabled className="w-[268px] rounded shadow-md h-[44px]" placeholder="Số điện thoại" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
              <p className="text-sm font-medium">Họ Và Tên</p>
              <p className="text-primary w-2 h-2">*</p>
            </div>
            <Input disabled className="w-[268px] rounded shadow-md h-[44px]" placeholder="Họ và tên" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-1">
              <p className="text-sm font-medium">Vai Trò</p>
              <p className="text-primary w-2 h-2">*</p>
            </div>
            <Select
              className="h-[44px] w-[268px] shadow-md rounded"
              value={role}
              onChange={(value) => {
                setRole(Number(value));
              }
              }
              options={[
                { value: 1, label: 'Admin' },
                { value: 0, label: 'Khách hàng' },
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
              value={status}
              onChange={(value) => {
                setStautus(Number(value));
              }
              }
              options={[
                { value: 0, label: 'Ngưng hoạt động' },
                { value: 1, label: 'Đang hoạt động' },
              ]}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="text-sm font-medium w-full">
            Ảnh Bìa <span className="text-primary">*</span>
          </div>


          {/* <div className="flex flex-col gap-2.5 ">
            <Upload
              style={{ width: "100%" }}
              multiple={false}
              listType="picture"
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

            <div className="flex items-center flex-wrap gap-3">

              <div className="w-20 h-20 relative">
                <img
                  src={user?.avatar}
                  className="w-full h-full object-cover rounded"
                />
                <div
                  className="w-5 h-5 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1 cursor-pointer"
                onClick={() => handleRemove(file, "banner")}
                >
                  <IoCloseSharp className="text-red-500" />
                </div>
              </div>
            </div>
          </div> */}

        </div>
        {contextHolder}
        <ButtonAdmin back="user/list"
          onClick={async () => {
            if (
              role === null ||
              status === null
            ) {
              openNotificationWithIcon("error", "Lỗi dữ liệu", "Vui lòng nhập đầy đủ thông tin");
            }
            const userData = {
              role: role,
              status: status,
            };
            const userResponse = await userServices.updateStatus(id, userData);
            if (userResponse?.status === 200) {
              openNotificationWithIcon("success", "Thành công", "Thêm thành công");
              setTimeout(() => {
                router.push(config.routes.admin.brand.list);
              }, 1000);
            } else {
              openNotificationWithIcon("error", "Lỗi", "Có lỗi xảy ra, vui lòng thử lại");
            }
          }}
        />
      </div>
    </>
  );
}

export default UserEdit;