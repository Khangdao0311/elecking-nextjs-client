"use client";
import { Modal } from "antd";
import { Fragment, useEffect, useState } from "react";

import { useStore, actions } from "@/app/store";
import SidebarAccount from "@/app/components/client/SidebarAccount";
import ModalAddressNew from "@/app/components/client/ModalAddress/New";
import ModalAddressEdit from "@/app/components/client/ModalAddress/Edit";
import * as addressServices from "@/app/services/addressService";

function AccountAddress() {
  const [state, dispatch] = useStore();
  const [showModal, setShowModal] = useState({ new: false, edit: false });
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [addressEdit, setAddressEdit] = useState<IAddress>();

  useEffect(() => {
    if (state.user) {
      addressServices
        .getQuery({ user_id: state.user?.id, limit: 0, orderby: "id-asc", status: 1 })
        .then((res) => {
          setAddresses(res.data);
        });
    }
  }, [state.user, state.re_render]);

  function handleCancelAddress(address: IAddress) {
    const addressCancel = {
      ...address,
      status: 0,
    };
    addressServices.edit(address.id, addressCancel).then((res) => {
      dispatch(actions.re_render());
    });
  }

  return (
    <>
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
          width="auto"
        >
          <ModalAddressNew onClose={() => setShowModal({ new: false, edit: false })} />
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
          width="auto"
        >
          <ModalAddressEdit
            addressEdit={addressEdit}
            onClose={() => setShowModal({ new: false, edit: false })}
          />
        </Modal>
      </Fragment>
      <div className="container-custom flex items-start gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="w-3/12 bg-slate-50 rounded-xl p-4">
          <SidebarAccount />
        </div>
        <div className="w-9/12 flex flex-col gap-6 rounded-xl min-h-[calc(100vh-190px)]">
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
            {addresses.map((address: IAddress, iAddress: number) => (
              <div key={iAddress} className="w-full h-auto relative">
                <div className="h-full p-4 shadow-lg border border-gray-200 rounded-lg flex flex-col w-full items-start gap-1.5">
                  <div className="flex justify-between w-full">
                    <div className="flex gap-4">
                      <p className="text-base font-medium">{address.fullname}</p>
                      <p className="text-base font-normal">{address.phone}</p>
                    </div>
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
                    onClick={() => handleCancelAddress(address)}
                    className="text-sm font-semibold text-primary select-none cursor-pointer"
                  >
                    Xóa
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountAddress;
