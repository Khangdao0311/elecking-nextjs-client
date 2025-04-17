import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Modal } from "antd";

import * as authServices from "@/app/services/authService";
import { useStore, actions } from "@/app/store";
import config from "@/app/config";
import Loading from "@/app/components/client/Loading";
import ModalNotification from "@/app/components/client/Modal/ModalNotification";

function ModalAddress({
  addresses,
  address,
  setAddress,
  setAddressEdit,
  onClose,
  onNew,
  onEdit,
}: any) {
  const [state, dispatch] = useStore();
  const [selectedAddress, setSelectedAddress] = useState(address);

  const [itemAddressRemove, setItemAddressRemove] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>({ status: null, message: "" });

  const router = useRouter();

  useEffect(() => {
    setSelectedAddress(address);
  }, [address]);

  function handleCancelAddress(address_id: string) {
    setLoading(true);
    (function callback() {
      authServices.removeAddress(address_id).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setNotification({ status: true, message: "Xóa địa chỉ thành công !" });
          setTimeout(() => {
            setNotification({ status: null, message: "" });
            setItemAddressRemove("");
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

  return (
    <>
      <ModalNotification noti={notification} />
      {/* Bạn có chắc muốn xóa địa chỉ này không ? */}
      <Modal
        open={!!itemAddressRemove}
        onCancel={() => setItemAddressRemove("")}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        closable={false}
        className="!w-[90vw] !max-w-[400px]"
      >
        {loading && <Loading />}
        <div className="p-2 flex flex-col gap-4 w-full">
          <p className="w-full text-center text-lg font-bold text-primary">
            Bạn có chắc muốn xóa địa chỉ này không ?
          </p>
          <div className="w-full flex gap-2 items-center justify-between">
            <button
              className="w-1/2 center-flex py-2 rounded-sm border border-primary text-primary text-base font-bold"
              onClick={() => {
                handleCancelAddress(itemAddressRemove);
              }}
            >
              Có
            </button>
            <button
              className="w-1/2 center-flex py-2 rounded-sm border border-primary text-white bg-primary text-base font-bold"
              onClick={() => setItemAddressRemove("")}
            >
              Không
            </button>
          </div>
        </div>
      </Modal>

      <div className="w-full h-[70vh] flex flex-col gap-4">
        <div className="flex text-justify items-center">
          <p className="text-xl font-semibold">Địa chỉ của tôi</p>
        </div>
        <Swiper
          direction={"vertical"}
          slidesPerView="auto"
          spaceBetween={10}
          mousewheel={true}
          freeMode={true}
          modules={[Mousewheel, FreeMode]}
          className="w-full h-full"
        >
          {addresses.map((eAddress: IAddress, iAddress: number) => (
            <SwiperSlide key={iAddress} className="w-full !h-auto relative">
              <label
                htmlFor={`${iAddress}`}
                key={iAddress}
                className={`flex w-full h-full p-4 gap-4 shadow-lg border border-gray-200 rounded-lg select-none`}
                onClick={() => {}}
              >
                <input
                  type="radio"
                  className="accent-primary w-5 h-5"
                  checked={eAddress?.id === selectedAddress?.id}
                  readOnly
                  id={`${iAddress}`}
                  onClick={() => {
                    if (eAddress.id !== selectedAddress.id) {
                      setSelectedAddress(eAddress);
                    }
                  }}
                />
                <div className="flex flex-col w-full items-start gap-1.5">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                      <p className="text-base font-medium">{eAddress.fullname}</p>
                      <p className="text-base font-normal">{eAddress.phone}</p>
                    </div>
                  </div>
                  <p className="line-clamp-1">
                    {eAddress.province.name}, {eAddress.district.name}, {eAddress.ward.name}
                  </p>
                  <p className="line-clamp-1">{eAddress.description}</p>
                  {eAddress.setDefault && (
                    <p className="text-primary text-xs font-medium border border-primary rounded-sm px-3 py-0.5">
                      Mặc định
                    </p>
                  )}
                </div>
              </label>
              <div className="flex gap-4 absolute right-0 top-0 py-2 px-4">
                <p
                  onClick={() => {
                    setAddressEdit(eAddress);
                    setSelectedAddress(address);
                    onEdit();
                  }}
                  className="text-sm font-semibold text-thirdary select-none cursor-pointer"
                >
                  Cập nhật
                </p>
                <p
                  onClick={() => setItemAddressRemove(eAddress.id)}
                  className="text-sm font-semibold text-primary select-none cursor-pointer"
                >
                  Xóa
                </p>
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide className="w-full !h-fit">
            <div
              onClick={() => {
                setSelectedAddress(address);
                onNew();
              }}
              className="flex w-fit cursor-pointer gap-1 px-4 py-3 items-center shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transition-all duration-300"
            >
              <FaPlus className="w-4 h-4 text-gray-700" />
              <p className="text-sm font-normal text-gray-700">Thêm Địa Chỉ Mới</p>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="flex gap-4 justify-end">
          <p
            onClick={() => {
              onClose();
              setSelectedAddress(address);
            }}
            className="px-10 border border-gray-300 py-2 rounded-lg cursor-pointer font-medium text-base"
          >
            Trở lại
          </p>

          <p
            onClick={() => {
              onClose();
              setAddress(selectedAddress);
            }}
            className="px-5 bg-primary py-2 rounded-lg text-white cursor-pointer font-medium text-base"
          >
            Hoàn thành
          </p>
        </div>
      </div>
    </>
  );
}

export default ModalAddress;
