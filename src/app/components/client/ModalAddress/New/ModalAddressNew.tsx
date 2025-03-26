"use client";

import { Select, Input } from "antd";
import { useEffect, useState } from "react";

import { useStore, actions } from "@/app/store";
import * as locationServices from "@/app/services/locationService";
import * as addressServices from "@/app/services/addressService";

function ModelAddressNew({ onClose }: any) {
  const [state, dispatch] = useStore();

  const [provinces, setProvinces] = useState<any>([]);
  const [district, setDistricts] = useState<any>([]);
  const [ward, setWards] = useState<any>([]);

  const [selectedProvince, setSelectedProvince] = useState<any>(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(undefined);
  const [selectedWard, setSelectedWard] = useState<any>(undefined);
  const [description, setDescription] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [type, setType] = useState<number | undefined>(undefined);
  const [setDefault, setSetDefault] = useState<boolean>(false);

  useEffect(() => {
    locationServices
      .getProvince()
      .then((res) => setProvinces(res.map((e: any) => ({ name: e.name, code: e.code }))));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      locationServices
        .getDistrict(selectedProvince.code)
        .then((res) =>
          setDistricts(res.districts.map((e: any) => ({ name: e.name, code: e.code })))
        );
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      locationServices
        .getWard(selectedDistrict?.code)
        .then((res) => setWards(res.wards.map((e: any) => ({ name: e.name, code: e.code }))));
    }
  }, [selectedDistrict]);

  function handleNewAddress() {
    const addressNew = {
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      description: description,
      phone: phone,
      fullname: fullname,
      type: type,
      setDefault: setDefault,
      user_id: state.user.id,
    };

    addressServices.create(addressNew).then((res) => {
      cancel();
      onClose();
      dispatch(actions.re_render());
    });
  }

  function cancel() {
    setSelectedProvince(undefined);
    setSelectedDistrict(undefined);
    setSelectedWard(undefined);
    setDescription("");
    setPhone("");
    setFullname("");
    setType(undefined);
    setSetDefault(false);
  }

  return (
    <div className="w-[500px]">
      <div className="w-full py-4 flex-center">
        <p className="text-xl font-semibold">Địa Chỉ Mới</p>
      </div>
      <div className="w-full py-4 flex flex-col gap-4  ">
        <div className="grid grid-cols-2 gap-2.5 ">
          <div className="h-10">
            <Input
              type="text"
              placeholder="Họ và tên"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="border border-gray-200 rounded w-full h-full"
            />
          </div>
          <div className="h-10">
            <Input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-200 rounded w-full h-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 ">
          <div className=" h-10">
            <Select
              className="w-full h-full"
              placeholder="Tỉnh / Thành phố"
              showSearch
              value={selectedProvince?.code}
              optionFilterProp="name"
              filterOption={(input: string, option: any) =>
                option.name.toLowerCase().includes(input.toLowerCase())
              }
              fieldNames={{ value: "code", label: "name" }}
              options={provinces}
              onSelect={(value, option) => {
                setSelectedProvince(option);
                setSelectedDistrict(undefined);
                setSelectedWard(undefined);
              }}
            />
          </div>
          <div className=" h-10">
            <Select
              className="w-full h-full"
              placeholder="Quận / Huyện"
              showSearch
              value={selectedDistrict?.code}
              optionFilterProp="name"
              filterOption={(input: string, option: any) =>
                option.name.toLowerCase().includes(input.toLowerCase())
              }
              fieldNames={{ value: "code", label: "name" }}
              disabled={!selectedProvince}
              options={district}
              onSelect={(value, option) => {
                setSelectedDistrict(option);
                setSelectedWard(undefined);
              }}
            />
          </div>
          <div className=" h-10">
            <Select
              className="w-full h-full"
              placeholder="Phường / Xã"
              showSearch
              value={selectedWard?.code}
              optionFilterProp="name"
              filterOption={(input: string, option: any) =>
                option.name.toLowerCase().includes(input.toLowerCase())
              }
              fieldNames={{ value: "code", label: "name" }}
              disabled={!selectedDistrict}
              options={ward}
              onSelect={(value, option) => setSelectedWard(option)}
            />
          </div>
        </div>
        <textarea
          placeholder="Địa chỉ cụ thể"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-200 p-2.5 rounded w-full h-auto min-h-24"
        ></textarea>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-normal">Loại địa chỉ</p>
          <div className="flex gap-2">
            <p
              onClick={() => setType(1)}
              className={`text-sm font-normal border ${
                type === 1 ? "border-primary text-primary" : "border-gray-200 text-gray-700"
              } px-3 py-2.5 rounded cursor-pointer select-none`}
            >
              Nhà Riêng
            </p>
            <p
              onClick={() => setType(2)}
              className={`text-sm font-normal border ${
                type === 2 ? "border-primary text-primary" : "border-gray-200 text-gray-700"
              } px-3 py-2.5 rounded cursor-pointer select-none`}
            >
              Văn Phòng
            </p>
          </div>
        </div>
        <div
          onClick={() => setSetDefault(!setDefault)}
          className="flex gap-2 items-center cursor-pointer"
        >
          <input
            type="checkbox"
            checked={!!setDefault}
            readOnly
            className="w-4 h-4 shrink-0 accent-primary "
          />
          <p className="text-sm font-normal text-gray-500 select-none">Đặt làm địa chỉ mặc định</p>
        </div>
      </div>
      <div className="w-full flex gap-4 justify-end py-4">
        <p
          className="px-10 border border-gray-300 py-2 rounded-lg cursor-pointer"
          onClick={() => {
            onClose();
            cancel();
          }}
        >
          Trở lại
        </p>
        <p
          onClick={handleNewAddress}
          className="px-5 bg-primary py-2 rounded-lg text-white cursor-pointer"
        >
          Hoàn thành
        </p>
      </div>
    </div>
  );
}

export default ModelAddressNew;
