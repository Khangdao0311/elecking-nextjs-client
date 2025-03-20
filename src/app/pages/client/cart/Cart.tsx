"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BsCartX } from "react-icons/bs";
import { HiOutlineTicket } from "react-icons/hi";
import { FaCaretDown, FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdCheckmark } from "react-icons/io";
import { Modal, notification, Popover } from "antd";

import config from "@/app/config";
import * as productServices from "@/app/services/productService";
import * as authServices from "@/app/services/authService";
import { useStore, actions } from "@/app/store";
import ModalVoucher from "@/app/components/client/ModalVoucher";

function Cart() {
  const [state, dispatch] = useStore();
  const [checkedItems, setCheckItems] = useState<boolean[]>([]);
  const [productsCart, setProductsCart] = useState<IProduct[]>([]);
  const [voucher, setVoucher] = useState<any>("");
  const [showModelVoucher, setShowModelVoucher] = useState(false);

  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message: string) => {
    api.info({
      message: message,
      placement: "topRight",
    });
  };

  useEffect(() => {
    async function _() {
      if (state.cart.length) {
        const _: IProduct[] = [];
        for (const item of state.cart) {
          await productServices.getProById(item.product.id).then((res: any) => {
            _.push(res.data);
          });
        }
        setProductsCart(_);
        setCheckItems(state.cart.map(() => false));
      }
    }
    _();
  }, [state.cart]);

  function handleChangeVariant(iProduct: number, iVariant: number) {
    const cartNew = state.cart.map((item: any, index: number) => {
      if (index === iProduct) {
        return {
          ...item,
          product: {
            ...item.product,
            variant: iVariant,
            color: 0,
          },
          quantity:
            item.quantity > productsCart[iProduct]?.variants[iVariant]?.colors[0]?.quantity
              ? productsCart[iProduct]?.variants[iVariant]?.colors[0]?.quantity
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
          productsCart[iProduct]?.variants[iVariant]?.colors[0]?.quantity
            ? productsCart[iProduct]?.variants[iVariant]?.colors[0]?.quantity
            : existing.quantity + item.quantity;
      } else {
        acc.push({ ...item });
      }

      return acc;
    }, []);

    authServices.cart(state.user.id, cartFinal).then((res) => dispatch(actions.re_render()));
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

    authServices.cart(state.user.id, cartFinal).then((res) => dispatch(actions.re_render()));
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

    authServices.cart(state.user.id, cartNew).then((res) => dispatch(actions.re_render()));
  }

  function handleRemoveItem(iProduct: number) {
    const cartNew = state.cart.filter((item: any, index: number) => index !== iProduct);
    setProductsCart([]);
    authServices.cart(state.user.id, cartNew).then((res) => dispatch(actions.re_render()));
  }

  function handleRemoveItems() {
    const cartNew = state.cart.filter((item: any, index: number) => !checkedItems[index]);
    setProductsCart([]);
    authServices.cart(state.user.id, cartNew).then((res) => dispatch(actions.re_render()));
  }

  function handleCheckItem(iProduct: number) {
    setCheckItems((prev) =>
      prev.map((e, i) => {
        if (i === iProduct) return !e;
        return e;
      })
    );
  }

  function totalCart() {
    return `${state.cart
      .reduce((acc: number, item: any, index: number) => {
        if (checkedItems[index]) {
          acc +=
            (productsCart[index]?.variants[item.product?.variant]?.price -
              productsCart[index]?.variants[item.product?.variant]?.price_sale +
              productsCart[index]?.variants[item.product?.variant]?.colors[item.product?.color]
                ?.price_extra) *
            item.quantity;
        }
        return acc;
      }, 0)
      .toLocaleString("vi-VN")} ₫`;
  }

  function totalSale() {
    return `${(
      state.cart.reduce((acc: number, item: any, index: number) => {
        if (checkedItems[index]) {
          acc +=
            (productsCart[index]?.variants[item.product?.variant]?.price +
              productsCart[index]?.variants[item.product?.variant]?.colors[item.product?.color]
                ?.price_extra) *
            item.quantity;
        }
        return acc;
      }, 0) -
      state.cart.reduce((acc: number, item: any, index: number) => {
        if (checkedItems[index]) {
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
    if (checkedItems.some((e) => e === true)) {
      const checkout = {
        order: state.cart.filter((item: any, index: number) => checkedItems[index]),
        voucher_id: voucher,
      };
      localStorage.setItem("checkout", JSON.stringify(checkout));
      router.push(config.routes.client.checkout);
    } else {
      openNotification("Vui lòng chọn sản phẩm !");
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={showModelVoucher}
        onCancel={() => setShowModelVoucher(false)}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        closable={false}
      >
        <ModalVoucher
          voucher={voucher}
          setVoucher={setVoucher}
          onClose={() => setShowModelVoucher(false)}
        />
      </Modal>
      <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <section>
          <div className="flex flex-col items-center gap-4 mb-40">
            {state.load ? (
              <Fragment>
                <div className="relative h-14 bg-gray-200 rounded-lg  shadow !w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                  w-full h-full animate-[shimmer_1.5s_infinite]"
                  ></div>
                </div>
                <div className="relative h-32 bg-gray-200 rounded-lg  shadow !w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                  w-full h-full animate-[shimmer_1.5s_infinite]"
                  ></div>
                </div>
                <div className="relative h-32 bg-gray-200 rounded-lg  shadow !w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                  w-full h-full animate-[shimmer_1.5s_infinite]"
                  ></div>
                </div>
                <div className="relative h-32 bg-gray-200 rounded-lg  shadow !w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                  w-full h-full animate-[shimmer_1.5s_infinite]"
                  ></div>
                </div>
              </Fragment>
            ) : (
              state.cart.length > 0 && (
                <Fragment>
                  <div className="flex items-center border rounded-xl shadow-lg p-4 gap-2.5 ">
                    <div className="w-16 flex justify-center">
                      <input
                        type="checkbox"
                        className="w-6 h-6 accent-primary cursor-pointer"
                        checked={checkedItems.length !== 0 && checkedItems.every((e) => e === true)}
                        onChange={() => {
                          if (state.cart.length !== 0) {
                            checkedItems.every((e) => e === true)
                              ? setCheckItems(state.cart.map(() => false))
                              : setCheckItems(state.cart.map(() => true));
                          }
                        }}
                      />
                    </div>
                    <div className="w-[660px] flex-shrink-0 font-normal text-base">Sản Phẩm</div>
                    <span className="w-40 text-center text-base font-normal flex-shrink-0">
                      Số Lượng
                    </span>
                    <span className="w-40 text-center text-base font-normal flex-shrink-0">
                      Số Tiền
                    </span>
                    <span className="w-40 text-center text-base font-normal flex-shrink-0">
                      Thao Tác
                    </span>
                  </div>

                  {productsCart.map((product: IProduct, iProduct: number) => (
                    <div
                      key={iProduct}
                      className="flex items-center border rounded-xl shadow-lg p-4 gap-2.5 cursor-pointer w-full"
                    >
                      <div className="w-16 flex justify-center">
                        <input
                          id={`${iProduct}`}
                          type="checkbox"
                          className="w-5 h-5 accent-primary cursor-pointer"
                          checked={checkedItems[iProduct]}
                          onChange={() => handleCheckItem(iProduct)}
                        />
                      </div>
                      <div className="w-[660px] flex gap-2.5">
                        <label htmlFor={`${iProduct}`} className="cursor-pointer">
                          <img
                            src={
                              product.variants[state.cart?.[iProduct]?.product?.variant]?.colors[
                                state.cart?.[iProduct]?.product?.color
                              ]?.image
                            }
                            alt="Sản Phẩm"
                            className="w-24 h-24 object-cover rounded"
                          />
                        </label>
                        <div className="flex w-64 flex-col gap-3">
                          <div className="font-bold text-base">
                            <Link href={`${config.routes.client.productDetail}/${product.id}`}>
                              {product.name}
                            </Link>
                          </div>
                          <div className="text-primary text-b font-bold flex gap-2 items-center">
                            {(
                              product.variants[state.cart?.[iProduct]?.product?.variant]?.price -
                              product.variants[state.cart?.[iProduct]?.product?.variant]
                                ?.price_sale +
                              product.variants[state.cart?.[iProduct]?.product?.variant]?.colors[
                                state.cart?.[iProduct]?.product?.color
                              ]?.price_extra
                            ).toLocaleString("vi-VN")}
                            đ
                            <del className="text-gray-700 text-sm font-normal ">
                              {(
                                product.variants[state.cart?.[iProduct]?.product?.variant]?.price ||
                                0
                              ).toLocaleString("vi-VN")}
                              đ
                            </del>
                          </div>
                        </div>

                        <div className="w-72 flex gap-2 items-center select-none">
                          {product.variants.length > 1 && (
                            <Popover
                              placement="bottomLeft"
                              title={null}
                              trigger="click"
                              zIndex={20}
                              content={
                                <div
                                  className="z-10 w-[404px] flex flex-wrap gap-2 "
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {product.variants.map((variant: any, ivariant: number) => (
                                    <div
                                      key={ivariant}
                                      onClick={
                                        ivariant == state.cart?.[iProduct]?.product?.variant
                                          ? () => {}
                                          : () => handleChangeVariant(iProduct, ivariant)
                                      }
                                      className={`relative px-4 py-2 border rounded-lg cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 select-none ${
                                        ivariant == state.cart?.[iProduct]?.product?.variant
                                          ? "border-primary"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {variant.properties.map((e: IProperty) => e.name).join(" - ")}
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
                              zIndex={20}
                              content={
                                <div
                                  className="z-10 w-[404px] flex flex-wrap gap-2 "
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {product?.variants[
                                    state.cart?.[iProduct]?.product?.variant
                                  ]?.colors.map((color, iColor: number) => (
                                    <div
                                      key={iColor}
                                      onClick={
                                        iColor === state.cart?.[iProduct]?.product?.color
                                          ? () => {}
                                          : () => handleChangeColor(iProduct, iColor)
                                      }
                                      className={`relative px-4 py-2 border rounded-lg cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 select-none ${
                                        iColor === state.cart?.[iProduct]?.product?.color
                                          ? "border-primary"
                                          : "border-gray-300"
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
                      <div className="w-40 flex justify-center items-center">
                        <div className="w-[136px] flex justify-center items-center border rounded-lg">
                          <button
                            onClick={() => {
                              if (state.cart?.[iProduct]?.quantity - 1 === 0) {
                                console.log(2121212);

                                openNotification("S");
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
                          <div className="w-16 h-9 text-center font-base font-bold border-l border-r center-flex">
                            {state.cart?.[iProduct]?.quantity}
                          </div>
                          <button
                            onClick={() => {
                              if (
                                state.cart?.[iProduct]?.quantity + 1 >
                                product.variants[state.cart?.[iProduct]?.product?.variant]?.colors[
                                  state.cart?.[iProduct]?.product?.color
                                ]?.quantity
                              ) {
                                openNotification("Bạn đã vược số lượng có không kho hàng !");
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

                      <div className="w-40 text-center text-primary text-base font-bold">
                        {(
                          (product.variants[state.cart?.[iProduct]?.product?.variant]?.price -
                            product.variants[state.cart?.[iProduct]?.product?.variant]?.price_sale +
                            product.variants[state.cart?.[iProduct]?.product?.variant]?.colors[
                              state.cart?.[iProduct]?.product?.color
                            ]?.price_extra) *
                          state.cart?.[iProduct]?.quantity
                        ).toLocaleString("vi-VN")}
                        đ
                      </div>
                      <button
                        onClick={() => {
                          handleRemoveItem(iProduct);
                          setCheckItems((prev) => prev.filter((e, i) => i !== iProduct));
                        }}
                        className="w-40 text-center text-black text-base font-bold hover:text-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </Fragment>
              )
            )}
            {!state.load && state.cart.length === 0 && (
              <div className="center-fixed">
                <div className="flex items-center justify-between flex-col gap-5">
                  <div>
                    <BsCartX className="w-[96px] h-[96px] text-primary" />
                  </div>
                  <div className="flex flex-col gap-2.5 items-center">
                    <div className="text-2xl font-semibold">Giỏ hàng của bạn đang trống.</div>
                    <div className="text-2xl font-normal">
                      Hãy chọn thêm sản phẩm để mua sắm nhé
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className=" fixed left-0 right-0 bottom-0 w-full">
          {state.load ? (
            <div className="relative container-custom h-40 bg-gray-200 rounded-lg  shadow !w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                      w-full h-full animate-[shimmer_1.5s_infinite]"
              ></div>
            </div>
          ) : state.cart.length > 0 ? (
            <div className="container-custom  p-4 bg-white border border-gray-300 rounded-2xl shadow-xl">
              <div className="flex justify-between items-center  border-t border-b p-2 border-dotted mb-2 ">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="mr-2 w-6 h-6 accent-primary cursor-pointer"
                      checked={checkedItems.length !== 0 && checkedItems.every((e) => e === true)}
                      onChange={() => {
                        if (state.cart.length !== 0) {
                          checkedItems.every((e) => e === true)
                            ? setCheckItems(state.cart.map(() => false))
                            : setCheckItems(state.cart.map(() => true));
                        }
                      }}
                    />
                    <span className="text-base font-medium">
                      Chọn tất cả <span>( {checkedItems.filter((e) => e === true).length} )</span>
                    </span>
                  </div>
                  {checkedItems.some((e) => e === true) && (
                    <div className="relative group cursor-pointer" onClick={handleRemoveItems}>
                      <em className="cursor-pointer text-gray-500 group-hover:text-primary transition-all duration-100">
                        Xóa các sản phẩm đã chọn
                      </em>
                      <hr className="w-[0%] group-hover:w-[100%] absolute bottom-0 left-0 border-primary transition-all duration-150" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-60">
                  <div className="flex items-center gap-2">
                    <HiOutlineTicket className=" w-8 h-8" />
                    <span className="text-base font-normal">ElecKing Voucher</span>
                  </div>
                  <p
                    onClick={() => setShowModelVoucher(true)}
                    className="ml-2 text-blue-600 cursor-pointer"
                  >
                    Chọn mã
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center relative">
                <div className="flex items-center gap-2.5 select-none cursor-pointer group">
                  <span className="text-base">
                    Tổng thanh toán ( <span>{checkedItems.filter((e) => e === true).length}</span>{" "}
                    sản phẩm )
                  </span>
                  <Popover
                    placement="top"
                    title={null}
                    trigger="hover"
                    zIndex={20}
                    content={
                      <div className="w-[740px]  flex flex-col divide-y-[1px] divide-gray-200">
                        <h2 className="text-3xl py-4 px-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary">
                          Chi tiết thanh toán
                        </h2>
                        <div className="py-4 px-2 flex justify-between">
                          <span className="text-gray-600 text-lg font-normal">Tổng tiền hàng</span>
                          <span className="text-black text-lg font-normal">
                            {state.cart
                              .reduce((acc: number, item: any, index: number) => {
                                if (checkedItems[index]) {
                                  acc +=
                                    (productsCart[index]?.variants[item.product?.variant]?.price +
                                      productsCart[index]?.variants[item.product?.variant]?.colors[
                                        item.product?.color
                                      ]?.price_extra) *
                                    item.quantity;
                                }
                                return acc;
                              }, 0)
                              .toLocaleString("vi-VN")}{" "}
                            ₫
                          </span>
                        </div>
                        {totalSale() !== "0 ₫" && (
                          <div className="py-4 px-2 flex justify-between">
                            <span className="text-gray-600 text-lg font-normal">
                              Giảm giá sản phẩm
                            </span>
                            <span className="text-black text-lg font-normal">- {totalSale()}</span>
                          </div>
                        )}
                        {voucher && (
                          <div className="py-4 px-2 flex justify-between">
                            <span className="text-gray-600 text-lg font-normal">Voucher</span>
                            <span className="text-black text-lg font-normal">{"0 ₫"}</span>
                          </div>
                        )}
                        <div className="py-4 px-2 flex justify-between">
                          <span className="font-medium text-xl">Tổng số tiền thanh toán</span>
                          <span className="text-primary font-bold text-xl">{totalCart()}</span>
                        </div>
                      </div>
                    }
                  >
                    <div className="center-flex">
                      <span className="text-primary text-lg font-bold cursor-pointer relative">
                        {totalCart()}
                      </span>
                      <IoMdArrowDropdown className="w-6 h-6 inline text-black group-hover:rotate-180" />
                    </div>
                  </Popover>
                </div>

                <button
                  onClick={() => handleCheckout()}
                  className="bg-primary text-white px-24 py-4 rounded-lg font-bold text-xl"
                >
                  Mua Hàng
                </button>
              </div>
            </div>
          ) : (
            <Link
              href={config.routes.client.products}
              className="text-white text-lg font-medium w-full h-full center-flex container-custom cursor-pointer p-4 bg-primary border border-gray-300 rounded-2xl shadow-xl center-flex"
            >
              Tiếp tục mua sắm
            </Link>
          )}
        </section>
      </div>
    </>
  );
}

export default Cart;
