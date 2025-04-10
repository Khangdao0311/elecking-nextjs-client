import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import * as addressServices from "@/app/services/addressService";
import { useStore, actions } from "@/app/store";

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

  useEffect(() => {
    setSelectedAddress(address);
  }, [address]);

  function handleCancelAddress(addressX: IAddress) {
    const addressCancel = {
      ...addressX,
      status: 0,
    };
    addressServices.edit(addressX.id, addressCancel).then((res) => {
      dispatch(actions.re_render());
    });
  }

  return (
    <div className="w-[80vw] max-w-[600px] h-[70vh] flex flex-col gap-4">
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
                  console.log(eAddress);

                  setAddressEdit(eAddress);
                  setSelectedAddress(address);
                  onEdit();
                }}
                className="text-sm font-semibold text-thirdary select-none cursor-pointer"
              >
                Cập nhật
              </p>
              <p
                onClick={() => handleCancelAddress(eAddress)}
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
  );
}

export default ModalAddress;
