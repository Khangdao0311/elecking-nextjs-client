"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { HiOutlineTicket } from "react-icons/hi";
import { FaCaretDown, FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdCheckmark } from "react-icons/io";
import { Modal, Popover } from "antd";
import Cookies from "js-cookie";
import { SlTag } from "react-icons/sl";
import moment from "moment";

import config from "@/config";
import * as productServices from "@/services/productService";
import * as authServices from "@/services/authService";
import { useStore, actions } from "@/store";
import ModalVoucher from "@/components/client/Modal/ModalVoucher";
import Shimmer from "@/components/client/Shimmer";
import ModalNotification from "@/components/client/Modal/ModalNotification";
import Loading from "@/components/client/Loading";

function Cart() {
  const [state, dispatch] = useStore();
  const [productsCart, setProductsCart] = useState<IProduct[]>([]);
  const [voucher, setVoucher] = useState<any>(null);
  const [showModalVoucher, setShowModalVoucher] = useState(false);
  const [itemCartRemove, setItemCartRemove] = useState<any>(null);
  const [showModalRemoveItems, setShowModalRemoveItems] = useState<any>(false);
  const [notification, setNotification] = useState<any>({ status: null, message: "" });
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState<any>({
    original: 0,
    sale: 0,
  });

  const router = useRouter();

  useEffect(() => {
    (async function () {
      if (state.cart.length) {
        const _: IProduct[] = [];
        for (const item of state.cart) {
          await productServices.getProById(item.product.id).then((res: any) => {
            if (res.status === 200) _.push(res.data);
          });
        }
        setProductsCart(_);
      }
    })();
  }, [state.cart]);

  useEffect(() => {
    const _total = state.cart.reduce((acc: number, item: any, index: number) => {
      if (item.checked) {
        acc +=
          (productsCart[index]?.variants[item.product?.variant]?.price +
            productsCart[index]?.variants[item.product?.variant]?.colors[item.product?.color]
              ?.price_extra) *
          item.quantity;
      }
      return acc;
    }, 0);

    const _totalSale = state.cart.reduce((acc: number, item: any, index: number) => {
      if (item.checked) {
        acc +=
          (productsCart[index]?.variants[item.product?.variant]?.price -
            productsCart[index]?.variants[item.product?.variant]?.price_sale +
            productsCart[index]?.variants[item.product?.variant]?.colors[item.product?.color]
              ?.price_extra) *
          item.quantity;
      }
      return acc;
    }, 0);

    setTotal({
      original: _total,
      sale: _totalSale,
    });

    if (
      voucher &&
      (!state.cart.some((item: any) => item.checked) || _totalSale < voucher!.min_order_value)
    ) {
      setVoucher(null);
    }
  }, [productsCart, state.cart]);

  function handleChangeVariant(iProduct: number, iVariant: number) {
    const cartNew = state.cart.map((item: any, index: number) => {
      if (index === iProduct) {
        return {
          ...item,
          product: {
            ...item.product,
            variant: iVariant,
            color: productsCart[iProduct]?.variants[iVariant]?.colors.findIndex(
              (e: IProductColor) => e.quantity > 0 && e.status
            ),
          },
          quantity:
            item.quantity >
            productsCart[iProduct]?.variants[iVariant]?.colors[
              productsCart[iProduct]?.variants[iVariant]?.colors.findIndex(
                (e: IProductColor) => e.quantity > 0 && e.status
              )
            ]?.quantity
              ? productsCart[iProduct]?.variants[iVariant]?.colors[
                  productsCart[iProduct]?.variants[iVariant]?.colors.findIndex(
                    (e: IProductColor) => e.quantity > 0 && e.status
                  )
                ]?.quantity
              : item.quantity,
        };
      }
      return item;
    });

    const cartFinal = cartNew.reduce((acc: any, item: any) => {
      const existing = acc.find(
        (e: any) =>
          e.product.id === item.product.id &&
          e.product.variant === item.product.variant &&
          e.product.color === item.product.color
      );

      if (existing) {
        existing.quantity =
          existing.quantity + item.quantity >
          productsCart[iProduct]?.variants[iVariant]?.colors[
            productsCart[iProduct]?.variants[iVariant]?.colors.findIndex(
              (e: IProductColor) => e.quantity > 0 && e.status
            )
          ]?.quantity
            ? productsCart[iProduct]?.variants[iVariant]?.colors[
                productsCart[iProduct]?.variants[iVariant]?.colors.findIndex(
                  (e: IProductColor) => e.quantity > 0 && e.status
                )
              ]?.quantity
            : existing.quantity + item.quantity;
      } else {
        acc.push({ ...item });
      }

      return acc;
    }, []);

    if (cartNew.length !== cartFinal.length) setProductsCart([]);

    // setLoading(true);
    (function callback() {
      authServices.cart(state.user.id, cartFinal).then((res) => {
        if (res.status === 200) {
          // setLoading(false);
          dispatch(actions.re_render());
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
          // setLoading(false);
          handleNotification(false, res.message);
        }
      });
    })();
  }

  function handleChangeColor(iProduct: number, iColor: number) {
    const cartNew = state.cart.map((item: any, index: number) => {
      if (index === iProduct) {
        return {
          ...item,
          product: {
            ...item.product,
            color: iColor,
          },
          quantity:
            item.quantity >
            productsCart[iProduct]?.variants[item.product.variant]?.colors[iColor]?.quantity
              ? productsCart[iProduct]?.variants[item.product.variant]?.colors[iColor]?.quantity
              : item.quantity,
        };
      }
      return item;
    });

    const cartFinal = cartNew.reduce((acc: any, item: any) => {
      const existing = acc.find(
        (e: any) =>
          e.product.id === item.product.id &&
          e.product.variant === item.product.variant &&
          e.product.color === item.product.color
      );

      if (existing) {
        existing.quantity =
          existing.quantity + item.quantity >
          productsCart[iProduct]?.variants[item.product.variant]?.colors[iColor]?.quantity
            ? productsCart[iProduct]?.variants[item.product.variant]?.colors[iColor]?.quantity
            : existing.quantity + item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    if (cartNew.length !== cartFinal.length) setProductsCart([]);

    // setLoading(true);
    (function callback() {
      authServices.cart(state.user.id, cartFinal).then((res) => {
        if (res.status === 200) {
          // setLoading(false);
          dispatch(actions.re_render());
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
          // setLoading(false);
          handleNotification(false, res.message);
        }
      });
    })();
  }

  function handleChangeQuantity(iProduct: number, quantity: number) {
    const cartNew = state.cart.map((item: any, index: number) => {
      if (index === iProduct) {
        return {
          ...item,
          quantity: quantity,
        };
      }
      return item;
    });

    // setLoading(true);
    (function callback() {
      authServices.cart(state.user.id, cartNew).then((res) => {
        if (res.status === 200) {
          // setLoading(false);
          dispatch(actions.re_render());
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
          // setLoading(false);
          handleNotification(false, res.message);
        }
      });
    })();
  }

  function handleRemoveItem(iProduct: number) {
    const cartNew = state.cart.filter((item: any, index: number) => index !== iProduct);

    setLoading(true);
    (function callback() {
      authServices.cart(state.user.id, cartNew).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setNotification({ status: true, message: "Xóa sản phẩm thành công !" });
          setTimeout(() => {
            setNotification({ status: null, message: "" });
            setProductsCart([]);
            dispatch(actions.re_render());
          }, 1200);
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
          handleNotification(false, res.message);
        }
      });
    })();
  }

  function handleRemoveItems() {
    const cartNew = state.cart.filter((item: any, index: number) => !item.checked);

    setLoading(true);
    (function callback() {
      authServices.cart(state.user.id, cartNew).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setNotification({ status: true, message: "Xóa sản phẩm thành công !" });
          setTimeout(() => {
            setProductsCart([]);
            setNotification({ status: null, message: "" });
            setShowModalRemoveItems(false);
            dispatch(actions.re_render());
          }, 1200);
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
          handleNotification(false, res.message);
        }
      });
    })();
  }

  function handleCheckItem(value: number) {
    const cartNew = state.cart.map((item: any, index: number) => {
      if (index === value) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });

    // setLoading(true);
    (function callback() {
      authServices.cart(state.user.id, cartNew).then((res) => {
        if (res.status === 200) {
          // setLoading(false);
          dispatch(actions.re_render());
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
          // setLoading(false);
          handleNotification(false, res.message);
        }
      });
    })();
  }

  function handleCheckItems(value: boolean) {
    const cartNew = state.cart.map((item: any, index: number) => {
      return {
        ...item,
        checked: value,
      };
    });

    // setLoading(true);
    (function callback() {
      authServices.cart(state.user.id, cartNew).then((res) => {
        if (res.status === 200) {
          // setLoading(false);
          dispatch(actions.re_render());
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
          // setLoading(false);
          handleNotification(false, res.message);
        }
      });
    })();

    // setCheckItems((prev) =>
    //   prev.map((e, i) => {
    //     if (i === iProduct) return !e;
    //     return e;
    //   })
    // );
  }

  function totalSale() {
    return `${(
      state.cart.reduce((acc: number, item: any, index: number) => {
        if (item.checked) {
          acc +=
            (productsCart[index]?.variants[item.product?.variant]?.price +
              productsCart[index]?.variants[item.product?.variant]?.colors[item.product?.color]
                ?.price_extra) *
            item.quantity;
        }
        return acc;
      }, 0) -
      state.cart.reduce((acc: number, item: any, index: number) => {
        if (item.checked) {
          acc +=
            (productsCart[index]?.variants[item.product?.variant]?.price -
              productsCart[index]?.variants[item.product?.variant]?.price_sale +
              productsCart[index]?.variants[item.product?.variant]?.colors[item.product?.color]
                ?.price_extra) *
            item.quantity;
        }
        return acc;
      }, 0)
    ).toLocaleString("vi-VN")} ₫`;
  }

  function handleCheckout() {
    if (state.cart.some((item: any) => item.checked)) {
      const checkout = {
        order: state.cart.filter((item: any, index: number) => item.checked),
        voucher: voucher,
        index: state.cart
          .map((item: any, index: number) => {
            if (item.checked) return index;
            return null;
          })
          .filter((item: any) => item !== null),
      };
      localStorage.setItem("checkout", JSON.stringify(checkout));
      dispatch(actions.set_routing(true));
      router.push(config.routes.client.checkout);
    } else {
      handleNotification(false, "Vui lòng chọn sản phẩm !");
    }
  }

  function handleNotification(status: boolean, message: string) {
    setNotification({ status: status, message: message });
    setTimeout(() => setNotification({ status: null, message: "" }), 1000);
  }

  return (
    <>
      {loading && <Loading />}
      <Fragment>
        {/* Modal voucher */}
        <Modal
          open={showModalVoucher}
          onCancel={() => setShowModalVoucher(false)}
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
            onClose={() => setShowModalVoucher(false)}
          />
        </Modal>
        {/* Modal bạn có muốn xóa sản phẩm này không ? */}
        <Modal
          open={!!itemCartRemove}
          onCancel={() => setItemCartRemove(null)}
          footer={null}
          title={null}
          centered
          maskClosable={false}
          closable={false}
          className="!w-[90vw] !max-w-[600px]"
          zIndex={102}
        >
          <div className="p-2 flex flex-col gap-4 w-full">
            <p className="w-full text-center text-lg font-bold text-primary">
              Bạn có muốn xóa sản phẩm này không ?
            </p>
            <p className="font-medium text-base py-4">{itemCartRemove?.name}</p>
            <div className="w-full flex gap-2 items-center justify-between">
              <button
                className="w-1/2 center-flex py-2 rounded-sm border border-primary text-primary text-base font-bold"
                onClick={() => {
                  handleRemoveItem(itemCartRemove?.index);
                  setItemCartRemove(null);
                }}
              >
                Có
              </button>
              <button
                className="w-1/2 center-flex py-2 rounded-sm border border-primary text-white bg-primary text-base font-bold"
                onClick={() => setItemCartRemove(null)}
              >
                Không
              </button>
            </div>
          </div>
        </Modal>
        {/* Modal bạn có muốn xóa các sản phẩm này không ? */}
        <Modal
          open={!!showModalRemoveItems}
          onCancel={() => setShowModalRemoveItems(false)}
          footer={null}
          title={null}
          centered
          maskClosable={false}
          closable={false}
          className="!w-[90vw] !max-w-[600px]"
          zIndex={102}
        >
          <div className="p-2 flex flex-col gap-4 w-full">
            <p className="w-full text-center text-lg font-bold text-primary">
              Bạn có chắc muốn xóa các sản phẩm này không ?
            </p>
            <div className="w-full flex gap-2 items-center justify-between">
              <button
                className="w-1/2 center-flex py-2 rounded-sm border border-primary text-primary text-base font-bold"
                onClick={() => {
                  handleRemoveItems();
                }}
              >
                Có
              </button>
              <button
                className="w-1/2 center-flex py-2 rounded-sm border border-primary text-white bg-primary text-base font-bold"
                onClick={() => setShowModalRemoveItems(false)}
              >
                Không
              </button>
            </div>
          </div>
        </Modal>
        {/* notification */}
        <ModalNotification noti={notification} />
      </Fragment>
      <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <section>
          <div className="flex flex-col items-center gap-4 ">
            {state.load && (
              <Fragment>
                {/*  */}
                <div className="hidden md:flex w-full overflow-hidden items-center border rounded-xl shadow-lg p-4 gap-2.5 ">
                  <div className="1/12 shrink-0 flex justify-center">
                    <Shimmer className={"w-6 h-6"} />
                  </div>
                  <div className="flex flex-1 gap-2.5">
                    {/* sản phẩm */}
                    <div className="flex flex-1 gap-2.5">
                      <div className="flex flex-1 gap-2.5">
                        <Shimmer className="w-1/3 max-w-24 h-6 shrink-0 center-flex" />
                        <Shimmer className="flex flex-col h-6 lg:flex-row gap-2.5 flex-1 items-center" />
                      </div>
                      <div className="w-1/2 lg:w-5/12 flex gap-2.5">
                        <Shimmer className="w-5/12 h-6 center-flex" />
                        <Shimmer className="w-5/12 h-6 center-flex" />
                        <Shimmer className="w-2/12 h-6 center-flex" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center border rounded-xl shadow-lg p-4 gap-2.5 cursor-pointer w-full">
                  <Shimmer className={"w-6 h-6"} />

                  <div className="flex flex-col md:flex-row flex-1 gap-2.5">
                    <div className="flex flex-1 gap-2.5">
                      <div className=" w-1/3 max-w-24 shrink-0">
                        <Shimmer
                          className="w-full !aspect-square object-cover shrink-0 rounded"
                          image
                        />
                      </div>
                      <div className="flex flex-col lg:flex-row gap-2.5 flex-1">
                        <div className="flex flex-1 flex-col gap-3">
                          <Shimmer className={"w-full h-6"} />
                          <Shimmer className={"w-2/3 h-6"} />
                          <div className="flex gap-2 items-center">
                            <Shimmer className={"w-7/12 h-6"} />
                            <Shimmer className={"w-5/12 h-6"} />
                          </div>
                        </div>
                        <div className="flex-1 flex  gap-2 items-center select-none">
                          <Shimmer className={"w-1/2 h-10"} />
                          <Shimmer className={"w-1/2 h-10"} />
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-5/12 shrink-0 flex items-center justify-between  gap-2.5">
                      <div className="w-5/12 flex justify-center items-center rounded-lg overflow-hidden ">
                        <Shimmer className={"shrink-0 w-10 h-10 !rounded-none"} />
                        <Shimmer className={"w-full h-10 !rounded-none"} />
                        <Shimmer className={"shrink-0 w-10 h-10 !rounded-none"} />
                      </div>
                      <Shimmer className={"w-5/12 h-6"} />
                      <Shimmer className={"w-2/12  h-6"} />
                    </div>
                  </div>
                </div>
              </Fragment>
            )}

            {!state.load && state.cart.length === 0 && (
              <div className="center-fixed w-[90vw]">
                <div className="flex items-center justify-between flex-col gap-5">
                  <div>
                    <BsCartX className="w-[96px] h-[96px] text-primary" />
                  </div>
                  <div className="flex flex-col gap-2.5 items-center">
                    <div className="text-2xl font-semibold text-center">
                      Giỏ hàng của bạn đang trống.
                    </div>
                    <div className="text-2xl font-normal text-center">
                      Hãy chọn thêm sản phẩm để mua sắm nhé
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!state.load && state.cart.length > 0 && (
              <Fragment>
                <div className="hidden md:flex w-full overflow-hidden items-center border rounded-xl shadow-lg p-4 gap-2.5 ">
                  <div className="1/12 shrink-0 flex justify-center">
                    <input
                      type="checkbox"
                      className="w-6 h-6 accent-primary cursor-pointer"
                      checked={
                        state.cart.length !== 0 && state.cart.every((item: any) => item.checked)
                      }
                      onChange={() => {
                        if (state.cart.length !== 0) {
                          state.cart.every((item: any) => item.checked)
                            ? handleCheckItems(false)
                            : handleCheckItems(true);
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-1 gap-2.5">
                    {/* sản phẩm */}
                    <div className="flex flex-1 gap-2.5">
                      <div className="flex flex-1 gap-2.5">
                        <div className="w-1/3 max-w-24 shrink-0 center-flex">Hình ảnh</div>
                        <div className="flex flex-col lg:flex-row gap-2.5 flex-1 items-center">
                          Sản phẩm
                        </div>
                      </div>
                      <div className="w-1/2 lg:w-5/12 flex gap-2.5">
                        {/* số lượng */}
                        <div className="w-5/12 center-flex">Số lượng</div>

                        {/* tổng tiền */}
                        <div className="w-5/12 center-flex">Tổng tiền</div>

                        {/* xóa */}
                        <button className="w-2/12 center-flex line-clamp-1"></button>
                        {/*  */}
                      </div>
                    </div>
                  </div>
                </div>

                {productsCart.map((product: IProduct, iProduct: number) => (
                  <div
                    key={iProduct}
                    className="flex items-center border rounded-xl shadow-lg p-4 gap-2.5 cursor-pointer w-full"
                  >
                    <div className="w-6 shrink-0 flex">
                      <input
                        id={`${iProduct}`}
                        type="checkbox"
                        className="w-5 h-5 accent-primary cursor-pointer"
                        checked={state.cart[iProduct]?.checked}
                        onChange={() => handleCheckItem(iProduct)}
                      />
                    </div>

                    <div className="flex flex-col md:flex-row flex-1 gap-2.5">
                      <div className="flex flex-1 gap-2.5">
                        {/* ảnh */}
                        <label
                          htmlFor={`${iProduct}`}
                          className="cursor-pointer w-1/3 max-w-24 shrink-0"
                        >
                          <img
                            src={
                              product.variants[state.cart?.[iProduct]?.product?.variant]?.colors[
                                state.cart?.[iProduct]?.product?.color
                              ]?.image
                            }
                            alt="Sản Phẩm"
                            className="w-full !aspect-square object-cover shrink-0 rounded"
                          />
                        </label>
                        {/* sản phẩm */}
                        <div className="flex flex-col lg:flex-row gap-2.5 flex-1">
                          {/* name */}
                          <div className="flex flex-1 flex-col gap-3">
                            <Link
                              onClick={() => dispatch(actions.set_routing(true))}
                              href={`${config.routes.client.productDetail}${product.id}`}
                              className="font-bold text-base line-clamp-2"
                            >
                              {product.name}
                            </Link>
                            <div className="text-primary text-b font-bold flex gap-2 items-center flex-wrap">
                              {(
                                product.variants[state.cart?.[iProduct]?.product?.variant]?.price -
                                product.variants[state.cart?.[iProduct]?.product?.variant]
                                  ?.price_sale +
                                product.variants[state.cart?.[iProduct]?.product?.variant]?.colors[
                                  state.cart?.[iProduct]?.product?.color
                                ]?.price_extra
                              ).toLocaleString("vi-VN")}
                              đ
                              {product.variants[0]?.price_sale !== 0 && (
                                <del className="text-gray-700 text-sm font-normal ">
                                  {(
                                    product.variants[state.cart?.[iProduct]?.product?.variant]
                                      ?.price || 0
                                  ).toLocaleString("vi-VN")}
                                  đ
                                </del>
                              )}
                            </div>
                          </div>
                          {/* biến thể */}
                          <div className="flex-1 flex flex-wrap gap-2 items-center select-none">
                            {product.variants.length > 1 && (
                              <Popover
                                placement="bottomLeft"
                                title={null}
                                trigger="click"
                                zIndex={102}
                                content={
                                  <div
                                    className="z-10  max-w-[404px] flex flex-col sm:flex-row flex-wrap gap-2 "
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {product.variants.map((variant: any, ivariant: number) => (
                                      <div
                                        key={ivariant}
                                        onClick={() => {
                                          if (
                                            variant.colors.some(
                                              (e: any) => e.quantity > 0 && e.status
                                            ) &&
                                            ivariant != state.cart?.[iProduct]?.product?.variant
                                          ) {
                                            handleChangeVariant(iProduct, ivariant);
                                          }
                                        }}
                                        className={`relative px-4 py-2 border rounded-lg shadow-lg  transition-all duration-200 select-none ${
                                          ivariant == state.cart?.[iProduct]?.product?.variant
                                            ? "border-primary"
                                            : "border-gray-300"
                                        } ${
                                          !variant.colors.some(
                                            (e: any) => e.quantity > 0 && e.status
                                          )
                                            ? "opacity-35"
                                            : "cursor-pointer hover:shadow-xl hover:scale-105"
                                        }`}
                                      >
                                        {variant.properties
                                          .map((e: IProperty) => e.name)
                                          .join(" - ")}
                                        {ivariant == state.cart?.[iProduct]?.product?.variant && (
                                          <div className="absolute w-5 h-3 bg-primary top-0 left-0 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                            <IoMdCheckmark className="w-3 h-3 text-white" />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                }
                              >
                                <div className="border rounded-md px-1.5 py-1.5 text-base font-normal flex items-center gap-1.5 ">
                                  <div className="line-clamp-1">
                                    {product.variants[
                                      state.cart?.[iProduct]?.product?.variant
                                    ]?.properties
                                      .map((e: any) => e.name)
                                      .join(" - ") || ""}
                                  </div>
                                  <FaCaretDown />
                                </div>
                              </Popover>
                            )}
                            {product?.variants[state.cart?.[iProduct]?.product?.variant]?.colors
                              .length > 1 && (
                              <Popover
                                placement="bottomLeft"
                                title={null}
                                trigger="click"
                                zIndex={102}
                                content={
                                  <div
                                    className="z-10 max-w-[404px] flex flex-col sm:flex-row flex-wrap gap-2 "
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {product?.variants[
                                      state.cart?.[iProduct]?.product?.variant
                                    ]?.colors.map((color, iColor: number) => (
                                      <div
                                        key={iColor}
                                        onClick={() => {
                                          if (
                                            color.quantity > 0 &&
                                            color.status &&
                                            iColor !== state.cart?.[iProduct]?.product?.color
                                          ) {
                                            handleChangeColor(iProduct, iColor);
                                          }
                                        }}
                                        className={`relative px-4 py-2 border rounded-lg shadow-lg transition-all duration-200 select-none ${
                                          iColor === state.cart?.[iProduct]?.product?.color
                                            ? "border-primary"
                                            : "border-gray-300"
                                        } ${
                                          color.quantity > 0 && color.status
                                            ? "hover:shadow-xl hover:scale-105 cursor-pointer"
                                            : "opacity-35"
                                        }`}
                                      >
                                        {color.name}
                                        {iColor === state.cart?.[iProduct]?.product?.color && (
                                          <div className="absolute w-5 h-3 bg-primary top-0 left-0 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                            <IoMdCheckmark className="w-3 h-3 text-white" />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                }
                              >
                                <div className="border rounded-md px-1.5 py-1.5 text-base font-normal line-clamp-1 flex items-center gap-1.5 ">
                                  <div className="line-clamp-1">
                                    {
                                      product.variants[state.cart?.[iProduct]?.product?.variant]
                                        ?.colors[state.cart?.[iProduct]?.product?.color]?.name
                                    }
                                  </div>
                                  <FaCaretDown />
                                </div>
                              </Popover>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-1/2 lg:w-5/12 shrink-0 flex items-center justify-between  gap-2.5">
                        {/* số lượng */}
                        <div className="w-5/12 flex justify-center items-center ">
                          <div className="w-full flex justify-center items-center border rounded-lg">
                            <button
                              onClick={() => {
                                if (state.cart?.[iProduct]?.quantity - 1 === 0) {
                                  setItemCartRemove({
                                    index: iProduct,
                                    name: `${product.name} ${
                                      product.variants[
                                        state.cart[iProduct].product.variant
                                      ].properties
                                        .map((e: any) => e.name)
                                        .join(" - ") !== ""
                                        ? `- ${product.variants[
                                            state.cart[iProduct].product.variant
                                          ].properties
                                            .map((e: any) => e.name)
                                            .join(" - ")}`
                                        : ""
                                    }
                                    - ${
                                      product.variants[state.cart[iProduct].product.variant].colors[
                                        state.cart[iProduct].product.color
                                      ].name
                                    }
                                    `,
                                  });
                                } else {
                                  handleChangeQuantity(
                                    iProduct,
                                    state.cart?.[iProduct]?.quantity - 1
                                  );
                                }
                              }}
                              className="w-9 h-9 text-lg flex justify-center items-center"
                            >
                              <FaMinus className="w-4 h-4" />
                            </button>
                            <div className="flex-1 h-9 text-center font-base font-bold border-l border-r center-flex">
                              {state.cart?.[iProduct]?.quantity}
                            </div>
                            <button
                              onClick={() => {
                                if (
                                  state.cart?.[iProduct]?.quantity + 1 >
                                  product.variants[state.cart?.[iProduct]?.product?.variant]
                                    ?.colors[state.cart?.[iProduct]?.product?.color]?.quantity
                                ) {
                                  handleNotification(
                                    false,
                                    "Bạn đã vược số lượng có không kho hàng !"
                                  );
                                } else {
                                  handleChangeQuantity(
                                    iProduct,
                                    state.cart?.[iProduct]?.quantity + 1
                                  );
                                }
                              }}
                              className="w-9 h-9 text-lg flex justify-center items-center"
                            >
                              <FaPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* tổng tiền */}
                        <div className="w-5/12 center-flex text-primary text-base font-bold">
                          {(
                            (product.variants[state.cart?.[iProduct]?.product?.variant]?.price -
                              product.variants[state.cart?.[iProduct]?.product?.variant]
                                ?.price_sale +
                              product.variants[state.cart?.[iProduct]?.product?.variant]?.colors[
                                state.cart?.[iProduct]?.product?.color
                              ]?.price_extra) *
                            state.cart?.[iProduct]?.quantity
                          ).toLocaleString("vi-VN")}
                          đ
                        </div>

                        {/* xóa */}
                        <div className="w-2/12 center-flex !justify-end sm:!justify-center">
                          <div
                            className="text-black text-base font-bold hover:text-red-600"
                            onClick={() => {
                              setItemCartRemove({
                                index: iProduct,
                                name: `${product.name} ${
                                  product.variants[state.cart[iProduct].product.variant].properties
                                    .map((e: any) => e.name)
                                    .join(" - ") !== ""
                                    ? `- ${product.variants[
                                        state.cart[iProduct].product.variant
                                      ].properties
                                        .map((e: any) => e.name)
                                        .join(" - ")}`
                                    : ""
                                }
                                  - ${
                                    product.variants[state.cart[iProduct].product.variant].colors[
                                      state.cart[iProduct].product.color
                                    ].name
                                  }
                                    `,
                              });
                            }}
                          >
                            Xóa
                          </div>
                        </div>
                        {/*  */}
                      </div>
                    </div>
                  </div>
                ))}
              </Fragment>
            )}
          </div>
        </section>

        <div className="h-48"></div>
        <section className="fixed left-0 right-0 bottom-0 z-[98] sm:bottom-0 w-full">
          {state.load && (
            <div className="container-custom  p-4 bg-white border border-gray-300 rounded-2xl shadow-xl">
              <div className="flex  flex-col lg:flex-row justify-betweens border-t border-b p-2 border-dotted mb-2 gap-2.5 ">
                <div className="flex flex-1 items-start gap-5">
                  <div className="flex items-center gap-2 flex-1  ">
                    <Shimmer className={"w-6 h-6 shrink-0"} />
                    <Shimmer className={"w-1/3 h-6"} />
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <Shimmer className={"w-1/3 h-8"} />
                  <Shimmer className={"w-1/5 h-6"} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-2.5 justify-between items-center relative">
                <div className="flex w-full items-end gap-2.5 select-none cursor-pointer group">
                  <Shimmer className={"w-1/3 h-6"} />
                  <Shimmer className={"w-1/5 h-6"} />
                </div>
                <Shimmer className={"w-full md:w-1/3 h-14"} />
              </div>
            </div>
          )}
          {state.cart.length > 0 && (
            <div className="container-custom  p-4 bg-white border border-gray-300 rounded-2xl shadow-xl">
              <div className="flex  flex-col lg:flex-row justify-betweens border-t border-b p-2 border-dotted mb-2 gap-2.5 ">
                <div className="flex flex-1 items-start gap-5">
                  <div className="flex items-center gap-2 center-flex h-full">
                    <input
                      type="checkbox"
                      className="mr-2 w-6 h-6 accent-primary cursor-pointer"
                      checked={
                        state.cart.length !== 0 && state.cart.every((item: any) => item.checked)
                      }
                      onChange={() => {
                        if (state.cart.length !== 0) {
                          state.cart.every((item: any) => item.checked)
                            ? handleCheckItems(false)
                            : handleCheckItems(true);
                        }
                      }}
                    />
                    <span className="text-base font-medium text-nowrap center-flex h-full gap-2">
                      Chọn tất cả{" "}
                      <span>( {state.cart.filter((item: any) => item.checked).length} )</span>
                    </span>
                  </div>
                  {state.cart.some((item: any) => item.checked) && (
                    <div
                      className="relative group cursor-pointer center-flex h-full"
                      onClick={() => setShowModalRemoveItems(true)}
                    >
                      <em className="cursor-pointer  text-gray-500 group-hover:text-primary transition-all duration-100 line-clamp-1">
                        Xóa các sản phẩm đã chọn
                      </em>
                      <hr className="w-[0%] group-hover:w-[100%] absolute bottom-0 left-0 border-primary transition-all duration-150" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 justify-between">
                  <Popover
                    placement="top"
                    title={null}
                    trigger="hover"
                    zIndex={102}
                    content={
                      voucher && (
                        <div className="flex w-[90vw] max-w-[420px] items-start gap-4">
                          <div className="bg-primary text-white w-1/4 !aspect-square rounded-lg flex items-center justify-center">
                            <SlTag className="text-2xl w-1/2 h-1/2" />
                          </div>
                          <div className="flex flex-col items-start">
                            <p className="text-primary text-base font-semibold uppercase">
                              {voucher!.code}
                            </p>
                            <p className="text-primary gap-1 flex-wrap text-xl font-semibold">
                              {`Giảm ${voucher!.discount_value.toLocaleString("vn-VN")}${
                                voucher!.discount_type == 1 ? "đ" : "%"
                              }`}
                              {voucher!.discount_type === 2 && (
                                <span className="text-base text-gray-500">
                                  Tối Đa {voucher!.max_discount.toLocaleString("vn-VN")} đ
                                </span>
                              )}
                            </p>
                            <p className="text-base text-gray-500">
                              Đơn Tối Thiểu {voucher!.min_order_value.toLocaleString("vn-VN")} đ
                            </p>

                            <p className="text-base text-gray-500">
                              HSD:{" "}
                              <span>
                                {moment(voucher!.end_date, "YYYYMMDD").format("DD/MM/YYYY")}
                              </span>
                            </p>
                          </div>
                        </div>
                      )
                    }
                  >
                    <div
                      className={`flex items-center gap-2 text-primary ${
                        voucher && "cursor-pointer"
                      }`}
                    >
                      <HiOutlineTicket className=" w-8 h-8" />
                      <span className="text-lg uppercase font-bold">
                        {voucher?.code || "ElecKing Voucher"}
                      </span>
                    </div>
                  </Popover>

                  <p
                    onClick={() => {
                      if (state.cart.some((item: any) => item.checked)) {
                        setShowModalVoucher(true);
                      } else {
                        handleNotification(false, "Vui lòng chọn sản phẩm để áp dụng voucher !");
                      }
                    }}
                    className="ml-2 text-blue-600 cursor-pointer center-flex"
                  >
                    {voucher ? "Đổi mã" : "Chọn mã"}
                  </p>
                </div>
              </div>

              {/*  */}
              <div className="flex flex-col md:flex-row gap-2.5 justify-between items-center relative">
                <div className="flex w-full  items-end flex-col sm:flex-row gap-2.5 select-none cursor-pointer ">
                  <span className="text- line-clamp-1">
                    Tổng thanh toán ({" "}
                    <span>{state.cart.filter((item: any) => item.checked).length}</span> sản phẩm )
                  </span>
                  <Popover
                    placement="top"
                    title={null}
                    trigger="hover"
                    zIndex={102}
                    content={
                      <div className="w-[95vw] max-w-[600px] flex flex-col divide-y-[1px] divide-gray-200">
                        <p className="text-3xl w-full py-4 px-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary">
                          Chi tiết thanh toán
                        </p>
                        <div className="py-4 px-2 flex justify-between">
                          <span className="text-gray-600 text-lg font-normal">Tổng tiền hàng</span>
                          <span className="text-black text-lg font-normal">
                            {total.original.toLocaleString("vi-VN")} ₫
                          </span>
                        </div>
                        {totalSale() !== "0 ₫" && (
                          <div className="py-4 px-2 flex justify-between">
                            <span className="text-gray-600 text-lg font-normal">
                              Giảm giá sản phẩm
                            </span>
                            <span className="text-black text-lg font-normal">
                              - {(total.original - total.sale).toLocaleString("vi-VN")} ₫
                            </span>
                          </div>
                        )}
                        {voucher && (
                          <div className="py-4 px-2 flex  items-center justify-between">
                            <span className="text-gray-600 text-lg font-normal">Voucher</span>
                            <span className="text-black text-lg font-normal">
                              -{" "}
                              {(voucher.discount_type === 1
                                ? voucher.discount_value.toLocaleString("vi-VN")


                                : total.sale * (voucher.discount_value / 100) >
                                  voucher.max_discount
                                ? voucher.max_discount
                                : total.sale * (voucher.discount_value / 100)
                              ).toLocaleString("vi-VN")}
                              ₫
                            </span>
                          </div>
                        )}
                        <div className="py-4 px-2 flex justify-between">
                          <span className="font-medium text-xl">Tổng thanh toán</span>
                          <span className="text-primary font-bold text-xl text-nowrap center-flex">
                            {(
                              total.sale -
                              (voucher
                                ? voucher.discount_type === 1
                                  ? voucher.discount_value
                                  : total.sale * (voucher.discount_value / 100) >
                                    voucher.max_discount
                                  ? voucher.max_discount
                                  : total.sale * (voucher.discount_value / 100)
                                : 0)
                            ).toLocaleString("vi-VN")}{" "}
                            ₫
                          </span>
                        </div>
                      </div>
                    }
                  >
                    <div className="center-flex group">
                      <span className="text-primary text-lg font-bold cursor-pointer relative">
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
                      </span>
                      <IoMdArrowDropdown className="w-6 h-6 inline text-black group-hover:rotate-180" />
                    </div>
                  </Popover>
                </div>

                <button
                  onClick={() => handleCheckout()}
                  className="bg-primary text-white w-full md:w-auto px-24 py-2.5 sm:py-4 rounded-lg font-bold text-xl text-nowrap"
                >
                  Mua Hàng
                </button>
              </div>
            </div>
          )}
          {!state.load && state.cart.length === 0 && (
            <Link
              onClick={() => dispatch(actions.set_routing(true))}
              href={config.routes.client.products}
              className=" font-medium w-full  container-custom cursor-pointer h-20 bg-primary border border-gray-300 rounded-2xl shadow-xl center-flex"
            >
              <p className="text-white text-xl !uppercase">Tiếp tục mua sắm</p>
            </Link>
          )}
        </section>
      </div>
    </>
  );
}

export default Cart;
