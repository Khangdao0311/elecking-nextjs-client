"use client";

import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { FaChevronRight, FaMapLocationDot, FaPlus } from "react-icons/fa6";
import { LuLoaderCircle, LuTicket } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";
import { Modal, notification } from "antd";

import config from "@/app/config";
import { useStore, actions } from "@/app/store";
import * as addressServices from "@/app/services/addressService";
import * as productServices from "@/app/services/productService";
import * as orderServices from "@/app/services/orderService";
import * as vnpayServices from "@/app/services/vnpayService";
import * as authServices from "@/app/services/authService";
import ModalVoucher from "@/app/components/client/ModalVoucher";
import ModalAddressNew from "@/app/components/client/ModalAddress/New";
import ModalAddressEdit from "@/app/components/client/ModalAddress/Edit";
import ModalAddress from "./components/ModalAddress";
import ModalPaymentMethod from "./components/ModalPaymentMethod";
import ModalOrderStatus from "./components/ModalOrderStatus";
import Loading from "@/app/components/client/Loading";
import Shimmer from "@/app/components/client/Shimmer";

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

  const query = useSearchParams();
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message: string) => {
    api.info({
      message: message,
      placement: "topRight",
      style: {
        width: "fit-content",
        display: "inline-block",
        whiteSpace: "nowrap",
      },
    });
  };

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
    orderSuccess: false,
    orderErorr: false,
  });

  useLayoutEffect(() => {
    if (
      query.get("vnp_TransactionStatus") &&
      query.get("vnp_TransactionNo") &&
      query.get("vnp_TxnRef") &&
      state.user
    ) {
      orderServices.getById(query.get("vnp_TxnRef")!).then((res) => {
        if (query.get("vnp_TransactionStatus") === "00") {
          orderServices
            .updateTransactionCode(res.data.id, query.get("vnp_TransactionNo")!)
            .then((res) => {
              setShowModal({ ...showModal, orderSuccess: true });

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
            });
        } else {
          orderServices.updateStatus(res.data.id, 0).then((res) => {
            setShowModal({ ...showModal, orderErorr: true });
            setTimeout(() => setShowModal({ ...showModal, orderErorr: false }), 1000);
            router.push(`?`, { scroll: false });
          });
        }
      });
    }
  }, [query.toString(), state.user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkoutJSON = localStorage.getItem("checkout");
      setCheckout(checkoutJSON ? JSON.parse(checkoutJSON) : []);
    }
  }, []);

  useEffect(() => {
    async function _() {
      if (checkout?.order?.length) {
        let _total: number = 0;
        let _totalSale: number = 0;
        const _: IProduct[] = [];
        for (const item of checkout?.order) {
          await productServices.getProById(item.product.id).then((res: any) => {
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
          });
        }
        setProductsOrder(_);
        setVoucher(checkout.voucher);
        setTotal({
          original: _total,
          sale: _totalSale,
        });
      }
    }
    _();

    if (state.user) {
      addressServices
        .getQuery({ user_id: state.user?.id, limit: 0, orderby: "id-asc" })
        .then((res) => {
          if (res.data.length === 0)
            setShowModal({ ...showModal, address: { list: false, new: true, edit: false } });
          setAddresses(res.data);
          setAddress(res.data.find((e: IAddress) => e.setDefault === true));
        });
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
      orderServices.inset(orderNew).then((res) => {
        if (paymentMethod?.id === "67be8349447c10378c42365f") {
          vnpayServices.createPaymentUrl(res.data._id, res.data.total).then((res) => {
            window.location.href = res.paymentUrl;
          });
        } else {
          if (res.status === 200) {
            setLoading(false);
            setShowModal({ ...showModal, orderSuccess: true });
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
          } else {
            setLoading(false);
            setShowModal({ ...showModal, orderErorr: true });
            setTimeout(() => setShowModal({ ...showModal, orderErorr: false }), 1000);
          }
        }
      });
    } else {
      openNotification("Vui lòng chọn phương thức thanh toán !");
    }
  }

  return (
    <>
      {loading && <Loading />}
      {contextHolder}
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
          width="auto"
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
          width="auto"
        >
          <ModalAddressNew
            onClose={() => {
              if (addresses.length === 0) {
                router.back();
              } else {
                setShowModal({ ...showModal, address: { list: true, new: false, edit: false } });
              }
            }}
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
          width="auto"
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
        width="auto"
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
        width="auto"
      >
        <ModalPaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onClose={() => setShowModal({ ...showModal, payment_method: false })}
        />
      </Modal>
      <Fragment>
        <Modal
          open={showModal.orderSuccess}
          footer={null}
          title={null}
          centered
          maskClosable={false}
          closable={false}
          width="auto"
        >
          <ModalOrderStatus status="success" content="Đặt hàng thành công" />
        </Modal>
        <Modal
          open={showModal.orderErorr}
          footer={null}
          title={null}
          centered
          maskClosable={false}
          closable={false}
          width="auto"
        >
          <ModalOrderStatus status="erorr" content="Đặt hàng Thất Bại" />
        </Modal>
      </Fragment>

      <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 p-4 flex flex-col gap-6">
        {state.load ? (
          <Fragment>
            <div className="bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <Shimmer className={"w-1/4 h-8"} />
              <div className="flex justify-between items-center gap-10">
                <Shimmer className={"w-full h-8"} />
                <Shimmer className={"w-20 h-11 shrink-0"} />
              </div>
            </div>
            <div className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4 ">
              <div className="flex gap-2.5 pb-4 border-b border-gray-300">
                <Shimmer className={"w-[730px] h-6"} />
                <Shimmer className={"w-[160px] h-6"} />
                <Shimmer className={"w-[160px] h-6"} />
                <Shimmer className={"w-[160px] h-6"} />
              </div>
              <div className="center-flex gap-2.5 ">
                <div className="w-[730px]  flex gap-4 items-center">
                  <Shimmer className={"w-24 h-24 shrink-0"} image />
                  <Shimmer className={"w-full h-6"} />
                </div>
                <Shimmer className={"w-[160px] h-6"} />
                <Shimmer className={"w-[160px] h-6"} />
                <Shimmer className={"w-[160px] h-6"} />
              </div>
            </div>
            <div className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <Shimmer className={"w-1/6 h-7"} />
              <Shimmer className={"w-full h-14"} />
            </div>
            <div className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <Shimmer className={"w-1/5 h-7"} />
              <div className="flex place-content-between border-gray-100 border px-10 py-4 gap-10 items-center rounded-lg cursor-pointer">
                <div className="flex w-full gap-6 items-center">
                  <Shimmer className={"w-20 h-20 shrink-0"} image />
                  <Shimmer className={"w-full h-7"} />
                </div>
                <Shimmer className="w-6 h-6 " />
              </div>
            </div>
            <div className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col">
              <div className="flex items-center place-content-between px-5 py-2.5">
                <Shimmer className={"w-1/5 h-8"} />
                <Shimmer className={"w-20 h-7"} />
              </div>

              <div className="flex justify-end gap-32 py-4 border-y border-gray-300 border-dashed">
                <div className="flex flex-col gap-7">
                  <Shimmer className={"w-40 h-7"} />
                  <Shimmer className={"w-40 h-7"} />
                  <Shimmer className={"w-40 h-7"} />
                  <Shimmer className={"w-40 h-7"} />
                  <Shimmer className={"w-44 h-8"} />
                </div>
                <div className="flex flex-col gap-7 items-end">
                  <Shimmer className={"w-40 h-7"} />
                  <Shimmer className={"w-40 h-7"} />
                  <Shimmer className={"w-40 h-7"} />
                  <Shimmer className={"w-40 h-7"} />
                  <Shimmer className={"w-44 h-8"} />
                </div>
              </div>

              <div className="flex justify-between items-center py-4">
                <Shimmer className={"w-1/2 h-6"} />
                <Shimmer className={"w-1/4 h-16"} />
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <FaMapLocationDot className="w-8 h-8 text-primaryDark" />
                <p className="text-2xl font-bold text-primary text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary">
                  Địa chỉ nhận hàng
                </p>
              </div>
              <div className="flex items-center gap-10 w-full place-content-between">
                <div className="flex gap-6 items-center">
                  {address && (
                    <Fragment>
                      <div className="flex gap-4 text-lg font-semibold shrink-0">
                        <p>{address?.fullname}</p>
                        <p>{address?.phone}</p>
                      </div>
                      <p className="text-base font-normal w-[812px]">
                        {address?.province?.name}, {address?.district?.name}, {address?.ward?.name}
                      </p>
                    </Fragment>
                  )}
                </div>
                <p
                  className="text-base font-semibold text-blue-500 p-2.5 gap-2.5 cursor-pointer"
                  onClick={() =>
                    setShowModal({
                      ...showModal,
                      address: { list: true, new: false, edit: false },
                    })
                  }
                >
                  Thay đổi
                </p>
              </div>
            </div>

            <div className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4 ">
              <div className="flex gap-2.5 pb-4 border-b border-gray-300">
                <p className="w-[730px] text-base font-medium">Sản phẩm</p>
                <p className="w-[160px] text-center text-base font-medium">Đơn giá</p>
                <p className="w-[160px] text-center text-base font-medium">Số lượng</p>
                <p className="w-[160px] text-center text-base font-medium">Thành tiền</p>
              </div>
              {productsOrder.length === 0 && (
                <div className="center-flex gap-2.5 ">
                  <div className="w-[730px]  flex gap-4 items-center">
                    <Shimmer className={"w-24 h-24 shrink-0"} image />
                    <Shimmer className={"w-full h-6"} />
                  </div>
                  <Shimmer className={"w-[160px] h-6"} />
                  <Shimmer className={"w-[160px] h-6"} />
                  <Shimmer className={"w-[160px] h-6"} />
                </div>
              )}
              {productsOrder.map((product: IProduct, iProduct: number) => (
                <div key={iProduct} className="flex gap-2.5 items-center">
                  <div className="flex gap-2.5 items-center w-[730px]">
                    <img
                      src={
                        product.variants[checkout?.order[iProduct].product.variant]?.colors[
                          checkout?.order[iProduct].product.color
                        ].image
                      }
                      alt="Ảnh"
                      className="w-24 h-24"
                    />
                    <p className="text-base font-medium">{`${product.name} ${
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
                 }
                  `}</p>
                  </div>
                  <div className="text-center w-[160px] ">
                    <p className="text-base font-medium text-primary">
                      {(
                        product.variants[checkout?.order[iProduct]?.product?.variant]?.price -
                        product.variants[checkout?.order[iProduct]?.product?.variant]?.price_sale +
                        product.variants[checkout?.order[iProduct]?.product?.variant]?.colors[
                          checkout?.order[iProduct]?.product?.color
                        ].price_extra
                      ).toLocaleString("vi-VN")}{" "}
                      đ
                    </p>
                    {product.variants[checkout?.order[iProduct]?.product?.variant]?.price_sale !==
                      0 && (
                      <del className="text-gray-700 text-sm font-normal ">
                        {(
                          product.variants[checkout?.order[iProduct]?.product?.variant]?.price || 0
                        ).toLocaleString("vi-VN")}
                        đ
                      </del>
                    )}
                  </div>
                  <p className="text-base font-medium w-[160px] text-center">
                    {checkout?.order[iProduct].quantity}
                  </p>
                  <p className="text-base font-bold text-primary w-[160px] text-center">
                    {(
                      (product.variants[checkout?.order?.[iProduct]?.product?.variant]?.price -
                        product.variants[checkout?.order?.[iProduct]?.product?.variant]
                          ?.price_sale +
                        product.variants[checkout?.order?.[iProduct]?.product?.variant]?.colors[
                          checkout?.order?.[iProduct]?.product?.color
                        ]?.price_extra) *
                      checkout?.order?.[iProduct]?.quantity
                    ).toLocaleString("vi-VN")}{" "}
                    đ
                  </p>
                </div>
              ))}
            </div>

            <div className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <p className="text-xl font-bold w-full ">Lời nhắn</p>
              <div>
                <TextArea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Lưu ý cho cửa hàng ..."
                  className="h-[64px]"
                ></TextArea>
              </div>
            </div>

            <div className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col gap-4">
              <p className="text-xl font-bold w-full">Phương Thức Thanh Toán</p>
              <div
                onClick={() => setShowModal({ ...showModal, payment_method: true })}
                className="flex place-content-between border-gray-300 border px-10 py-4 gap-10 items-center rounded-lg cursor-pointer"
              >
                <div className="flex gap-6 items-center">
                  <img
                    src={
                      "https://www.shutterstock.com/image-vector/credit-card-cartoon-vector-illustration-600nw-2472976831.jpg"
                    }
                    alt="payment"
                    className="w-20 h-20"
                  />
                  <p className="text-xl font-bold text-primary">Chọn phương thức thanh toán</p>
                </div>
                <FaChevronRight className="w-6 h-6 " />
              </div>
            </div>

            <div className=" bg-white shadow-xl rounded-2xl p-5 flex flex-col">
              <div className="flex items-center place-content-between px-5 py-2.5">
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
              <div className="flex justify-end gap-32 py-4 border-y border-gray-300 border-dashed">
                <div className="flex flex-col gap-7">
                  <p className="text-lg font-normal">Tổng tiền hàng</p>
                  <p className="text-lg font-normal">Giá giảm sản phẩm</p>
                  <p className="text-lg font-normal">Vận chuyển</p>
                  {voucher && <p className="text-lg font-normal">Voucher</p>}
                  <p className="text-2xl font-medium">Tổng số tiền</p>
                </div>
                <div className="flex flex-col gap-7 text-end">
                  <p className="text-lg font-normal">{total.original.toLocaleString("vi-VN")} ₫</p>
                  <p className="text-lg font-normal">
                    - {(total.original - total.sale).toLocaleString("vi-VN")} ₫
                  </p>
                  <p className="text-lg font-normal">0 ₫</p>
                  {voucher && (
                    <p className="text-lg font-normal">
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
                  <p className="text-2xl font-bold text-primary">
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
              <div className="flex justify-between items-center py-4">
                <p className="text-base font-normal">
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                  <span className="text-base font-bold">Điều khoản Elecking</span>
                </p>

                <button
                  onClick={handleOrder}
                  className="bg-primary py-4 px-24 text-white text-2xl font-bold rounded-lg"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </>
  );
}

export default Checkout;
