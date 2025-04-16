"use client";

import { Select, Input } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useStore, actions } from "@/app/store";
import * as locationServices from "@/app/services/locationService";
import * as addressServices from "@/app/services/addressService";
import * as authServices from "@/app/services/authService";
import Loading from "@/app/components/client/Loading";
import ModalNotification from "@/app/components/client/ModalNotification";
import config from "@/app/config";

function ModelAddressNew({ onClose, status }: any) {
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

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>({ status: null, message: "" });

  const router = useRouter();

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
    if (
      !selectedProvince ||
      !selectedDistrict ||
      !selectedWard ||
      !description ||
      !phone ||
      !fullname ||
      !type
    ) {
      setNotification({ status: false, message: "Vui lòng nhập đầy đủ dữ liệu !" });
      setTimeout(() => {
        setNotification({ status: null, message: "" });
      }, 1000);
      return;
    }
    if (!phone.match(/^(0|\+84)[0-9]{9,10}$/)) {
      setNotification({ status: false, message: "Số điện thoại không đúng định dạng !" });
      setTimeout(() => {
        setNotification({ status: null, message: "" });
      }, 1000);
      return;
    }

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
    setLoading(true);
    (function callback() {
      addressServices.create(addressNew).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setNotification({ status: true, message: "Thêm thành địa chỉ công !" });
          setTimeout(() => {
            setNotification({ status: null, message: "" });
            cancel();
            onClose();
            dispatch(actions.re_render());
          }, 1000);
        } else if (res.status === 401) {
          const refreshToken = authServices.getRefreshToken();
          if (refreshToken) {
            authServices.getToken(refreshToken).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token", res.data);
                callback();
              } else {
                authServices.clearUser();
                router.push(config.routes.client.login);
                dispatch(actions.re_render());
              }
            });
          }
        } else {
          setLoading(false);
          setNotification({ status: false, message: res.message });
          setTimeout(() => {
            setNotification({ status: null, message: "" });
          }, 1000);
        }
      });
    })();
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
    <>
      {loading && <Loading />}
      <ModalNotification noti={notification} />
      <div className="w-full h-[70vh] flex flex-col gap-4 overflow-hiden ">
        <div className="w-full flex-center">
          <p className="text-xl font-semibold">Địa Chỉ Mới</p>
        </div>
        <div className="w-full h-full flex flex-col gap-4 overflow-auto ">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 ">
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
            className="border border-gray-200 p-2.5 rounded w-full h-full min-h-24 "
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
            onClick={() => {
              setSetDefault(!setDefault);
            }}
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              type="checkbox"
              checked={!!setDefault}
              readOnly
              className="w-4 h-4 shrink-0 accent-primary "
            />
            <p className="text-sm font-normal text-gray-500 select-none">
              Đặt làm địa chỉ mặc định
            </p>
          </div>
        </div>
        <div className="w-full flex gap-4 justify-end">
          <p
            className="px-10 border border-gray-300 py-2 rounded-lg cursor-pointer"
            onClick={() => {
              if (status) {
                onClose();
                cancel();
              } else {
                router.back();
              }
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
    </>
  );
}

export default ModelAddressNew;
