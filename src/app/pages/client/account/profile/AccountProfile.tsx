"use client";
import Sidebar from "@/app/components/client/Sidebar_user";
import { FaUser } from "react-icons/fa6";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

function AccountProfile() {
  const { Option } = Select;
  
  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex gap-4">
      <Sidebar />
      <div className="mx-auto w-9/12 border border-gray-200 shadow-xl rounded-lg flex justify-center items-center">
        <div className="w-[740px]  flex flex-col gap-6 justify-center items-center m-auto">
          <div className="flex flex-col gap-4 justify-center items-center w-[308px]">
            <div className="rounded-full bg-gray-300 w-[93px] h-[93px] py-7 px-7 flex items-center justify-center">
              <FaUser className="w-16 h-16 text-white" />
            </div>
            <p className="text-lg font-bold">Nguyễn Đặng</p>
          </div>
          <Form className="w-[500px]">
            <Form.Item  labelAlign="right" labelCol={{ flex: "150px" }} name="nickname" label="Họ và Tên">
              <Input placeholder="Họ và Tên" />
            </Form.Item>
            <Form.Item labelAlign="right" labelCol={{ flex: "150px" }}  name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>
            <Form.Item labelAlign="right" labelCol={{ flex: "150px" }} name="nickname" label="Email">
              <Input placeholder="example@gmail.com" />
            </Form.Item>
            <Form.Item labelAlign="right" labelCol={{ flex: "150px" }} name="gender" label="Gender">
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item labelAlign="right" labelCol={{ flex: "150px" }} name="nickname" label="Ngày tham gia" >
              <Input placeholder="dd-mm-yy" />
            </Form.Item>
            <div className="px-24 py-4 bg-primary rounded-lg w-full">
              <p className="text-base font-bold text-white text-center">
                Cập nhật thông tin
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;
