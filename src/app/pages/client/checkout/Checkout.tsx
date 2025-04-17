"use client";

import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { FaChevronRight, FaMapLocationDot } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { Modal } from "antd";
import Cookies from "js-cookie";

import config from "@/app/config";
import { useStore, actions } from "@/app/store";
import * as addressServices from "@/app/services/addressService";
import * as productServices from "@/app/services/productService";
import * as orderServices from "@/app/services/orderService";
import * as vnpayServices from "@/app/services/vnpayService";
import * as authServices from "@/app/services/authService";
import ModalVoucher from "@/app/components/client/Modal/ModalVoucher";
import ModalAddressNew from "@/app/components/client/Modal/ModalAddress/New";
import ModalAddressEdit from "@/app/components/client/Modal/ModalAddress/Edit";
import ModalAddress from "./components/ModalAddress";
import ModalPaymentMethod from "./components/ModalPaymentMethod";
import Loading from "@/app/components/client/Loading";
import Shimmer from "@/app/components/client/Shimmer";
import { BsChevronRight } from "react-icons/bs";
import TextArea from "antd/es/input/TextArea";
import { LuTicket } from "react-icons/lu";
import ModalNotification from "@/app/components/client/Modal/ModalNotification";

function Checkout() {
  const [state, dispatch] = useStore();
  const [checkout, setCheckout] = useState<any>();
  const [productsOrder, setProductsOrder] = useState<IProduct[]>([]);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [address, setAddress] = useState<IAddress>();
  const [addressEdit, setAddressEdit] = useState<IAddress>();
  const [voucher, setVoucher] = useState<IVoucher | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<IPaymment | null>(null);
  const [note, setNote] = useState<string>("");

  const [loading, setLoading] = useState<Boolean>(false);
  const [notification, setNotification] = useState<any>({ status: null, message: "" });

  const query = useSearchParams();
  const router = useRouter();

  const [total, setTotal] = useState<any>({
    original: 0,
    sale: 0,
  });

  const [showModal, setShowModal] = useState({
    voucher: false,
    address: {
      list: false,
      new: false,
      edit: false,
    },
    payment_method: false,
  });

  useLayoutEffect(() => {
    if (
      query.get("vnp_TransactionStatus") &&
      query.get("vnp_TransactionNo") &&
      query.get("vnp_TxnRef") &&
      state.user
    ) {
      (function callback() {
        orderServices.getById(query.get("vnp_TxnRef")!).then((res) => {
          if (res.status === 200) {
            if (query.get("vnp_TransactionStatus") === "00") {
              (function callback2() {
                orderServices
                  .updateTransactionCode(res.data.id, query.get("vnp_TransactionNo")!)
                  .then((res) => {
                    if (res.status === 200) {
                      setNotification({ status: true, message: "Đạt hàng thành công !" });
                      const checkout = JSON.parse(localStorage.getItem("checkout")!);
                      if (checkout?.index) {
                        const cartNew = state.cart.filter(
                          (item: any, index: number) => !checkout.index.includes(index)
                        );
                        authServices
                          .cart(state.user.id, cartNew)
                          .then((res) => dispatch(actions.re_render()));
                      }
                      localStorage.removeItem("checkout");
                      setTimeout(() => router.push(config.routes.client.home), 1000);
                    } else if (res.status === 401) {
                      const refreshToken = authServices.getRefreshToken();
                      if (refreshToken) {
                        authServices.getToken(refreshToken).then((res) => {
                          if (res.status === 200) {
                            Cookies.set("access_token", res.data);
                            callback2();
                          } else {
                            authServices.clearUser();
                            router.push(config.routes.client.login);
                            dispatch(actions.re_render());
                          }
                        });
                      }
                    } else {
                      setNotification({ status: false, message: res.message });
                      setTimeout(() => setNotification({ status: null, message: "" }), 1000);
                    }
                  });
              })();
            } else {
              (function callback3() {
                authServices.cancelOrder(res.data.id).then((res) => {
                  if (res.status === 200) {
                    setNotification({ status: false, message: "Đạt hàng thất bại !" });
                    setTimeout(() => setNotification({ status: null, message: "" }), 1000);
                    router.push(`?`, { scroll: false });
                  } else if (res.status === 401) {
                    const refreshToken = authServices.getRefreshToken();
                    if (refreshToken) {
                      authServices.getToken(refreshToken).then((res) => {
                        if (res.status === 200) {
                          Cookies.set("access_token", res.data);
                          callback3();
                        } else {
                          authServices.clearUser();
                          router.push(config.routes.client.login);
                          dispatch(actions.re_render());
                        }
                      });
                    }
                  } else {
                    setNotification({ status: false, message: res.message });
                    setTimeout(() => setNotification({ status: null, message: "" }), 1000);
                  }
                });
              })();
            }
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
  }, [query.toString(), state.user]);

  useEffect(() => {
    const checkoutJSON = localStorage.getItem("checkout") || "[]";
    setCheckout(checkoutJSON ? JSON.parse(checkoutJSON) : []);
  }, []);

  useEffect(() => {
    (async function () {
      if (checkout?.order?.length) {
        let _total: number = 0;
        let _totalSale: number = 0;
        const _: IProduct[] = [];
        for (const item of checkout?.order) {
          await productServices.getProById(item.product.id).then((res: any) => {
            if (res.status === 200) {
              _.push(res.data);
              _total +=
                (res.data?.variants[item.product?.variant]?.price +
                  res.data?.variants[item.product?.variant]?.colors[item.product?.color]
                    ?.price_extra) *
                item.quantity;
              _totalSale +=
                (res.data?.variants[item.product?.variant]?.price -
                  res.data?.variants[item.product?.variant]?.price_sale +
                  res.data?.variants[item.product?.variant]?.colors[item.product?.color]
                    ?.price_extra) *
                item.quantity;
            }
          });
        }
        setProductsOrder(_);
        setVoucher(checkout.voucher);
        setTotal({
          original: _total,
          sale: _totalSale,
        });
      }
    })();

    if (state.user) {
      (function callback() {
        addressServices
          .getQuery({ user_id: state.user?.id, limit: 0, orderby: "id-asc" })
          .then((res) => {
            if (res.status === 200) {
              if (res.data.length === 0)
                setShowModal({ ...showModal, address: { list: false, new: true, edit: false } });
              setAddresses(res.data);
              setAddress(res.data.find((e: IAddress) => e.setDefault === true));
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
  }, [state.user, state.re_render, checkout]);

  function handleOrder() {
    if (paymentMethod?.id) {
      const orderNew = {
        total:
          total.sale -
          (voucher
            ? voucher.discount_type === 1
              ? voucher.discount_value
              : total.sale - total.sale * (voucher.discount_value / 100) > voucher.max_discount
              ? voucher.max_discount
              : total.sale - total.sale * (voucher.discount_value / 100)
            : 0),
        price_ship: 0,
        note: note,
        products: JSON.stringify(
          checkout.order.map((e: any, i: number) => ({
            ...e,
            product: {
              ...e.product,
              price:
                productsOrder[i].variants[e.product.variant].price -
                productsOrder[i].variants[e.product.variant].price_sale +
                productsOrder[i].variants[e.product.variant].colors[e.product.color].price_extra,
            },
          }))
        ),
        user_id: state.user.id,
        voucher_id: voucher?.id,
        payment_method_id: paymentMethod?.id,
        address_id: address?.id,
      };
      setLoading(true);
      (function callback() {
        orderServices.inset(orderNew).then((res) => {
          if (res.status === 200) {
            if (paymentMethod?.id === "67be8349447c10378c42365f") {
              (function callback2() {
                vnpayServices.createPaymentUrl(res.data._id, res.data.total).then((res) => {
                  if (res.status === 200) {
                    window.location.href = res.paymentUrl;
                  } else if (res.status === 401) {
                    const refreshToken = authServices.getRefreshToken();
                    if (refreshToken) {
                      authServices.getToken(refreshToken).then((res) => {
                        if (res.status === 200) {
                          Cookies.set("access_token", res.data);
                          callback2();
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
            } else {
              setLoading(false);
              setNotification({ status: true, message: "Đạt hàng thành công !" });
              if (checkout?.index) {
                const cartNew = state.cart.filter(
                  (item: any, index: number) => !checkout.index.includes(index)
                );
                authServices
                  .cart(state.user.id, cartNew)
                  .then((res) => dispatch(actions.re_render()));
              }
              localStorage.removeItem("checkout");
              setTimeout(() => router.push(config.routes.client.home), 1000);
            }
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
    } else {
      setNotification({ status: false, message: "Vui lòng chọn phương thức thanh toán !" });
      setTimeout(() => setNotification({ status: null, message: "" }), 1000);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <ModalNotification noti={notification} />
      <Fragment>
        {/* model address  */}
        <Modal
          open={showModal.address.list}
          onCancel={() =>
            setShowModal({ ...showModal, address: { list: false, new: false, edit: false } })
          }
          footer={null}
          title={null}
          centered
          maskClosable={false}
          closable={false}
          className="!w-[90vw] !max-w-[600px]"
          zIndex={100}
        >
          <ModalAddress
            addresses={addresses}
            address={address}
            setAddress={setAddress}
            setAddressEdit={setAddressEdit}
            onClose={() =>
              setShowModal({ ...showModal, address: { list: false, new: false, edit: false } })
            }
            onNew={() =>
              setShowModal({ ...showModal, address: { list: false, new: true, edit: false } })
            }
            onEdit={() =>
              setShowModal({ ...showModal, address: { list: false, new: false, edit: true } })
            }
          />
        </Modal>
        {/* modal address new */}
        <Modal
          open={showModal.address.new}
          onCancel={() =>
            setShowModal({ ...showModal, address: { list: true, new: false, edit: false } })
          }
          footer={null}
          title={null}
          centered
          maskClosable={false}
          closable={false}
          className="!w-[90vw] !max-w-[600px]"
          zIndex={101}
        >
          <ModalAddressNew
            status={addresses.length > 0}
            onClose={() =>
              setShowModal({ ...showModal, address: { list: true, new: false, edit: false } })
            }
          />
        </Modal>
        {/* modal address edit */}
        <Modal
          open={showModal.address.edit}
          onCancel={() =>
            setShowModal({ ...showModal, address: { list: true, new: false, edit: false } })
          }
          footer={null}
          title={null}
          centered
          maskClosable={false}
          closable={false}
          className="!w-[90vw] !max-w-[600px]"
          zIndex={101}
        >
          <ModalAddressEdit
            addressEdit={addressEdit}
            onClose={() =>
              setShowModal({ ...showModal, address: { list: true, new: false, edit: false } })
            }
          />
        </Modal>
      </Fragment>
      {/* modal voucher */}
      <Modal
        open={showModal.voucher}
        onCancel={() => setShowModal({ ...showModal, voucher: false })}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        closable={false}
        className="!w-[90vw] !max-w-[600px]"
        zIndex={102}
      >
        <ModalVoucher
          orderPrice={total.sale}
          voucher={voucher}
          setVoucher={setVoucher}
          onClose={() => setShowModal({ ...showModal, voucher: false })}
        />
      </Modal>
      <Modal
        open={showModal.payment_method}
        onCancel={() => setShowModal({ ...showModal, payment_method: false })}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        closable={false}
        className="!w-[90vw] !max-w-[600px]"
        zIndex={102}
      >
        <ModalPaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onClose={() => setShowModal({ ...showModal, payment_method: false })}
        />
      </Modal>
      <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 p-4 flex flex-col gap-6">
        {state.load ? (
          <Fragment>
            <section className="bg-white shadow-xl rounded-2xl p-4 flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <Shimmer className={"w-8 h-8"} />
                <Shimmer className={"w-1/2 h-8"} />
              </div>
              <div className="flex items-center gap-4 w-full place-content-between">
                <div className="flex flex-1 flex-col lg:flex-row gap-2 lg:gap-4 items-start lg:items-center">
                  <div className="flex w-full sm:flex-nowrap flex-wrap gap-x-4 gap-y-2 text-lg font-semibold">
                    <Shimmer className={"w-5/12 md:w-1/3 lg:w-1/2  h-8"} />
                    <Shimmer className={"w-5/12 md:w-1/3 lg:w-1/2  h-8"} />
                  </div>
                  <Shimmer className={"w-full h-6"} />
                </div>
                <Shimmer className={"w-20 h-6 !hidden sm:!flex shrink-0"} />
                <Shimmer className={"w-6 h-10 flex sm:!hidden shrink-0"} />
              </div>
            </section>
            {/*  */}
            <section className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <div className="hidden lg:flex gap-2.5 pb-4 border-b border-gray-300">
                <Shimmer className={"w-24 h-6"} />
                <div className="flex flex-1 gap-2.5">
                  <Shimmer className={"w-5/12 h-6"} />
                  <div className="flex gap-2.5 flex-1 ">
                    <Shimmer className={"w-2/5 h-6"} />
                    <Shimmer className={"w-1/5 h-6"} />
                    <Shimmer className={"w-2/5 h-6"} />
                  </div>
                </div>
              </div>

              <div className=" flex flex-col">
                <div className="flex gap-2.5 items-center py-2.5">
                  <Shimmer className={"w-24 h-24"} image />
                  <div className="flex flex-col lg:flex-row gap-1 items-center sm:gap-2.5 flex-1">
                    <Shimmer className={"w-full lg:w-5/12 h-6"} />
                    <div className="flex w-full lg:w-7/12 flex-col sm:flex-row gap-1 sm:gap-2.5 ">
                      <div className="w-full sm:w-2/5 center-flex !justify-start sm:!justify-center flex-row lg:flex-col gap-1 ">
                        <Shimmer className={"w-full h-6"} />
                        <Shimmer className={"w-9/12 h-5"} />
                      </div>
                      <div className="w-full sm:w-1/5 center-flex !justify-start gap-2.5 sm:!justify-center text-base font-medium ">
                        <Shimmer className={"w-full h-6"} />
                      </div>
                      <div className="w-full sm:w-2/5 center-flex !justify-start sm:!justify-center gap-2.5 text-base font-bold text-primary text-center text-nowrap">
                        <Shimmer className={"w-full h-6"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*  */}
            <section className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <Shimmer className={"w-2/6 h-7"} />
              <Shimmer className={"w-full h-24"} />
            </section>
            {/*  */}
            <section className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <Shimmer className={"w-1/2 h-7"} />
              <div className="flex place-content-between border-gray-300 border px-4 md:px-10 py-4 gap-10 items-center rounded-lg cursor-pointer">
                <div className="flex w-full gap-6 items-center">
                  <Shimmer className={"w-20 h-20 shrink-0"} image />
                  <Shimmer className={"w-full h-7"} />
                </div>
                <Shimmer className="w-6 h-6 " />
              </div>
            </section>
            {/*  */}
            <section className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col">
              <div className="flex items-center place-content-between py-2.5">
                <Shimmer className={"w-1/2 max-w-40 h-8"} />
                <Shimmer className={"w-1/2 max-w-20 h-8"} />
              </div>
              {/*  */}
              <div className="flex justify-between sm:justify-end gap-0 sm:gap-32 py-4 border-y border-gray-300 border-dashed">
                <div className="flex flex-col gap-7 w-5/12 max-w-36">
                  <Shimmer className={"w-full h-7"} />
                  <Shimmer className={"w-full h-7"} />
                  <Shimmer className={"w-full h-7"} />
                  <Shimmer className={"w-full h-7"} />
                  <Shimmer className={"w-full h-8"} />
                </div>
                <div className="flex flex-col gap-7 text-end  w-5/12 max-w-36">
                  <Shimmer className={"w-full h-7"} />
                  <Shimmer className={"w-full h-7"} />
                  <Shimmer className={"w-full h-7"} />
                  <Shimmer className={"w-full h-7"} />
                  <Shimmer className={"w-full h-8"} />
                </div>
              </div>
              {/*  */}
              <div className="flex flex-col lg:flex-row gap-2.5 w-full justify-between items-center py-4">
                <Shimmer className={"w-full h-8"} />
                <Shimmer className={"w-full lg:w-1/4 h-16 shrink-0"} />
              </div>
            </section>
          </Fragment>
        ) : (
          <Fragment>
            <section className="bg-white shadow-xl rounded-2xl p-4 flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <FaMapLocationDot className="w-8 h-8 text-primaryDark" />
                <p className="text-2xl font-bold text-primary text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary line-clamp-1">
                  Địa chỉ nhận hàng
                </p>
              </div>
              <div
                className="flex items-center gap-4 w-full place-content-between"
                onClick={() =>
                  setShowModal({
                    ...showModal,
                    address: { list: true, new: false, edit: false },
                  })
                }
              >
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-start lg:items-center">
                  {address && (
                    <Fragment>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-lg font-semibold shrink-0">
                        <p>{address?.fullname}</p>
                        <p>{address?.phone}</p>
                      </div>
                      <p className="text-base font-normal line-clamp-1">
                        {address?.province?.name}, {address?.district?.name}, {address?.ward?.name}
                      </p>
                    </Fragment>
                  )}
                </div>
                <p className="text-base hidden sm:flex font-semibold text-blue-500 p-2.5 gap-2.5 shrink-0 cursor-pointer">
                  Thay đổi
                </p>
                <BsChevronRight className="felx w-6 h-10 shrink-0 sm:hidden text-base font-semibold text-blue-500" />
              </div>
            </section>

            <section className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <div className="hidden lg:flex gap-2.5 pb-4 border-b border-gray-300">
                <p className="w-24 text-base center-flex font-medium">Hình ảnh</p>
                <div className="flex flex-1 gap-2.5">
                  <p className="w-5/12 text-base font-medium">Sản phẩm</p>
                  <div className="flex gap-2.5 flex-1 ">
                    <p className="w-2/5 text-center text-base font-medium">Đơn giá</p>
                    <p className="w-1/5 text-center text-base font-medium">Số lượng</p>
                    <p className="w-2/5 text-center text-base font-medium">Thành tiền</p>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col divide-y-2">
                {productsOrder.length === 0 && (
                  <div className="flex gap-2.5 items-center py-2.5">
                    <Shimmer className={"w-24 h-24"} image />
                    <div className="flex flex-col lg:flex-row gap-1 items-center sm:gap-2.5 flex-1">
                      <Shimmer className={"w-full lg:w-5/12 h-6"} />
                      <div className="flex w-full lg:w-7/12 flex-col sm:flex-row gap-1 sm:gap-2.5 ">
                        <div className="w-full sm:w-2/5 center-flex !justify-start sm:!justify-center flex-row lg:flex-col gap-1 ">
                          <Shimmer className={"w-full h-6"} />
                          <Shimmer className={"w-9/12 h-5"} />
                        </div>
                        <div className="w-full sm:w-1/5 center-flex !justify-start gap-2.5 sm:!justify-center text-base font-medium ">
                          <Shimmer className={"w-full h-6"} />
                        </div>
                        <div className="w-full sm:w-2/5 center-flex !justify-start sm:!justify-center gap-2.5 text-base font-bold text-primary text-center text-nowrap">
                          <Shimmer className={"w-full h-6"} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {productsOrder.map((product: IProduct, iProduct: number) => (
                  <div key={iProduct} className="flex gap-2.5 items-center py-2.5">
                    <img
                      src={
                        product.variants[checkout?.order[iProduct].product.variant]?.colors[
                          checkout?.order[iProduct].product.color
                        ].image
                      }
                      alt="Ảnh"
                      className="w-24 h-24"
                    />
                    <div className="flex flex-col lg:flex-row gap-1 sm:gap-2.5 flex-1">
                      <p className="w-full lg:w-5/12 text-base font-medium line-clamp-2">
                        {`${product.name} ${
                          product.variants[checkout?.order[iProduct].product.variant].properties
                            .map((e: any) => e.name)
                            .join(" - ") !== ""
                            ? `- ${product.variants[
                                checkout?.order[iProduct].product.variant
                              ].properties
                                .map((e: any) => e.name)
                                .join(" - ")}`
                            : ""
                        }
                     - ${
                       product.variants[checkout?.order[iProduct].product.variant].colors[
                         checkout?.order[iProduct].product.color
                       ].name
                     }`}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2.5 flex-1 ">
                        <div className="w-full sm:w-2/5 center-flex !justify-start lg:!justify-center flex-row lg:flex-col gap-1 ">
                          <p className="text-base font-medium text-primary text-nowrap">
                            {(
                              product.variants[checkout?.order[iProduct]?.product?.variant]?.price -
                              product.variants[checkout?.order[iProduct]?.product?.variant]
                                ?.price_sale +
                              product.variants[checkout?.order[iProduct]?.product?.variant]?.colors[
                                checkout?.order[iProduct]?.product?.color
                              ].price_extra
                            ).toLocaleString("vi-VN")}{" "}
                            đ
                          </p>
                          {product.variants[checkout?.order[iProduct]?.product?.variant]
                            ?.price_sale !== 0 && (
                            <del className="text-gray-700 text-sm font-normal text-nowrap">
                              {(
                                product.variants[checkout?.order[iProduct]?.product?.variant]
                                  ?.price || 0
                              ).toLocaleString("vi-VN")}{" "}
                              đ
                            </del>
                          )}
                        </div>
                        <p className="w-full sm:w-1/5 center-flex !justify-start gap-2.5 sm:!justify-center text-base font-medium text-center">
                          <span className="flex sm:hidden">Số lượng</span>
                          {checkout?.order[iProduct].quantity}
                        </p>
                        <p className="w-full sm:w-2/5 center-flex !justify-start sm:!justify-center gap-2.5 text-base font-bold text-primary text-center text-nowrap">
                          <span className="flex sm:hidden text-black font-medium">Tổng tiền</span>
                          {(
                            (product.variants[checkout?.order?.[iProduct]?.product?.variant]
                              ?.price -
                              product.variants[checkout?.order?.[iProduct]?.product?.variant]
                                ?.price_sale +
                              product.variants[checkout?.order?.[iProduct]?.product?.variant]
                                ?.colors[checkout?.order?.[iProduct]?.product?.color]
                                ?.price_extra) *
                            checkout?.order?.[iProduct]?.quantity
                          ).toLocaleString("vi-VN")}{" "}
                          đ
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <p className="text-xl font-bold w-full line-clamp-1">Lời nhắn</p>
              <div>
                <TextArea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Lưu ý cho cửa hàng ..."
                  className="!min-h-24"
                ></TextArea>
              </div>
            </section>

            <section className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <p className="text-xl font-bold w-full">Phương Thức Thanh Toán</p>
              <div
                onClick={() => setShowModal({ ...showModal, payment_method: true })}
                className="flex place-content-between border-gray-300 border px-4 md:px-10 py-4 gap-10 items-center rounded-lg cursor-pointer"
              >
                <div className="flex gap-6 items-center">
                  <img
                    src={
                      paymentMethod?.image ||
                      "https://www.shutterstock.com/image-vector/credit-card-cartoon-vector-illustration-600nw-2472976831.jpg"
                    }
                    alt="payment"
                    className="w-20 h-20"
                  />
                  <p className="text-xl font-bold text-primary">
                    {paymentMethod?.name || "Chọn phương thức thanh toán"}
                  </p>
                </div>
                <FaChevronRight className="w-6 h-6 " />
              </div>
            </section>

            <section className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col">
              <div className="flex items-center place-content-between py-2.5">
                <div className="flex items-center gap-2">
                  <LuTicket className="w-8 h-8" />
                  <p className="text-lg font-normal">ElecKing Voucher</p>
                </div>
                <p
                  onClick={() => setShowModal({ ...showModal, voucher: true })}
                  className="text-lg font-bold text-blue-600 cursor-pointer"
                >
                  Chọn mã
                </p>
              </div>
              {/*  */}
              <div className="flex justify-between sm:justify-end gap-0 sm:gap-32 py-4 border-y border-gray-300 border-dashed">
                <div className="flex flex-col gap-7">
                  <p className="line-clamp-1 text-lg font-normal">Tổng tiền hàng</p>
                  <p className="line-clamp-1 text-lg font-normal">Giá giảm sản phẩm</p>
                  <p className="line-clamp-1 text-lg font-normal">Vận chuyển</p>
                  {voucher && <p className="line-clamp-1 text-lg font-normal">Voucher</p>}
                  <p className="line-clamp-1 text-2xl font-medium">Tổng số tiền</p>
                </div>
                <div className="flex flex-col gap-7 text-end">
                  <p className="text-nowrap text-lg font-normal">
                    {total.original.toLocaleString("vi-VN")} ₫
                  </p>
                  <p className="text-nowrap text-lg font-normal">
                    - {(total.original - total.sale).toLocaleString("vi-VN")} ₫
                  </p>
                  <p className="text-nowrap text-lg font-normal">0 ₫</p>
                  {voucher && (
                    <p className="text-nowrap text-lg font-normal">
                      -{" "}
                      {(voucher.discount_type === 1
                        ? voucher.discount_value.toLocaleString("vi-VN")
                        : total.sale - total.sale * (voucher.discount_value / 100) >
                          voucher.max_discount
                        ? voucher.max_discount
                        : total.sale - total.sale * (voucher.discount_value / 100)
                      ).toLocaleString("vi-VN")}
                      ₫
                    </p>
                  )}
                  <p className="text-nowrap text-2xl font-bold text-primary">
                    {(
                      total.sale -
                      (voucher
                        ? voucher.discount_type === 1
                          ? voucher.discount_value
                          : total.sale - total.sale * (voucher.discount_value / 100) >
                            voucher.max_discount
                          ? voucher.max_discount
                          : total.sale - total.sale * (voucher.discount_value / 100)
                        : 0)
                    ).toLocaleString("vi-VN")}{" "}
                    ₫
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="flex flex-col lg:flex-row gap-2.5 w-full justify-between items-center py-4">
                <p className="w-full text-base font-normal">
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                  <span className="text-base font-bold">Điều khoản Elecking</span>
                </p>

                <button
                  onClick={handleOrder}
                  className="bg-primary p-4 w-full lg:w-1/4 shrink-0 text-white text-2xl font-bold rounded-lg text-nowrap"
                >
                  Đặt hàng
                </button>
              </div>
            </section>
          </Fragment>
        )}
      </div>
    </>
  );
}

export default Checkout;
