"use client";

import { Modal } from "antd";
import { Fragment, useEffect, useState } from "react";
import { TbMoodEmpty } from "react-icons/tb";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { useStore, actions } from "@/store";
import ModalAddressNew from "@/components/client/Modal/ModalAddress/New";
import ModalAddressEdit from "@/components/client/Modal/ModalAddress/Edit";
import * as addressServices from "@/services/addressService";
import * as authServices from "@/services/authService";
import Shimmer from "@/components/client/Shimmer";
import Loading from "@/components/client/Loading";
import ModalNotification from "@/components/client/Modal/ModalNotification";
import config from "@/config";

function AccountAddress() {
  const [state, dispatch] = useStore();
  const [showModal, setShowModal] = useState({ new: false, edit: false });
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [addressEdit, setAddressEdit] = useState<IAddress>();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>({ status: null, message: "" });
  const [itemAddressRemove, setItemAddressRemove] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      (function callback() {
        addressServices
          .getQuery({ user_id: state.user?.id, limit: 0, orderby: "id-asc", status: 1 })
          .then((res) => {
            if (res.status === 200) {
              setAddresses(res.data);
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
            }
          });
      })();
    }
  }, [state.user, state.re_render]);

  function handleCancelAddress(address_id: string) {
    (function callback() {
      authServices.removeAddress(address_id).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setNotification({ status: true, message: "Xóa địa chỉ thành công !" });
          setTimeout(() => {
            setNotification({ status: null, message: "" });
            dispatch(actions.re_render());
            setItemAddressRemove("");
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
            dispatch(actions.re_render());
          }, 1000);
        }
      });
    })();
  }

  return (
    <>
      <ModalNotification noti={notification} />
      <Fragment>
        {/* modal address new */}
        <Modal
          open={showModal.new}
          onCancel={() => setShowModal({ new: false, edit: false })}
          footer={null}
          title={null}
          centered
          maskClosable={false}
          closable={false}
          className="!w-[90vw] !max-w-[600px]"
        >
          <ModalAddressNew
            status={true}
            onClose={() => setShowModal({ new: false, edit: false })}
          />
        </Modal>
        {/* modal address edit */}
        <Modal
          open={showModal.edit}
          onCancel={() => setShowModal({ new: false, edit: false })}
          footer={null}
          title={null}
          centered
          maskClosable={false}
          closable={false}
          className="!w-[90vw] !max-w-[600px]"
        >
          <ModalAddressEdit
            addressEdit={addressEdit}
            onClose={() => setShowModal({ new: false, edit: false })}
          />
        </Modal>
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
          zIndex={102}
        >
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
      </Fragment>
      {loading && <Loading />}

      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold uppercase">Địa Chỉ Của Tôi</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal({ new: true, edit: false })}
            className="border border-primary px-8 py-2 rounded-lg text-primary font-bold"
          >
            Thêm địa chỉ
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {state.load &&
            Array.from({ length: 2 }).map((_, i: number) => (
              <div key={i} className="w-full h-auto relative">
                <div className="h-full p-4 shadow-lg border border-gray-200 rounded-lg flex flex-col w-full items-start gap-1.5">
                  <div className="flex items-center gap-4 w-full">
                    <Shimmer className={"w-1/6 h-6 "} />
                    <Shimmer className={"w-1/6 h-6 "} />
                  </div>
                  <Shimmer className={"w-3/4 h-6 "} />
                  <Shimmer className={"w-1/2 h-6 "} />
                  <Shimmer className={"w-24 h-7 "} />
                </div>
                <div className="flex gap-4 absolute right-4 top-4">
                  <Shimmer className={"w-16 h-5 "} />
                  <Shimmer className={"w-8 h-5 "} />
                </div>
              </div>
            ))}

          {!state.load && addresses.length === 0 && (
            <div className="w-full min-h-80 center-flex flex-col gap-2">
              <TbMoodEmpty className="w-36 h-36 text-gray-300" />
              <p className="text-3xl text-gray-400 font-medium">Bạn chưa có địa chỉ giao hàng !</p>
            </div>
          )}
          {addresses.map((address: IAddress, iAddress: number) => (
            <div key={iAddress} className="w-full h-auto relative">
              <div className="h-full p-4 shadow-lg border border-gray-200 rounded-lg flex flex-col w-full items-start gap-1.5">
                <div className="flex items-center gap-4 w-full">
                  <p className="text-base font-medium">{address.fullname}</p>
                  <p className="text-base font-normal">{address.phone}</p>
                </div>
                <p className="line-clamp-1">
                  {address.province.name}, {address.district.name}, {address.ward.name}
                </p>
                <p className="line-clamp-1">{address.description}</p>
                {address.setDefault && (
                  <p className="text-primary select-none text-xs font-medium border border-primary rounded-sm px-4 py-1">
                    Mặc định
                  </p>
                )}
              </div>
              <div className="flex gap-4 absolute right-4 top-4">
                <p
                  onClick={() => {
                    setAddressEdit(address);
                    setShowModal({ new: false, edit: true });
                  }}
                  className="text-sm font-semibold text-thirdary select-none cursor-pointer"
                >
                  Cập nhật
                </p>
                <p
                  onClick={() => setItemAddressRemove(address.id)}
                  className="text-sm font-semibold text-primary select-none cursor-pointer"
                >
                  Xóa
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AccountAddress;
