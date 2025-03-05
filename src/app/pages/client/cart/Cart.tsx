"use client";

import Voucher from "@/app/components/client/Voucher";
import Item from "antd/es/list/Item";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretDown, FaMinus, FaPlus, FaSortDown } from "react-icons/fa6";
import { HiOutlineTicket } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdCheckmark } from "react-icons/io";
import config from "@/app/config";
import * as productServices from "@/app/services/productService";
import { BsCartX } from "react-icons/bs";

function Cart() {
  const [productCart, setProductCart] = useState<IProduct[]>([]);

  const [load, setLoad] = useState(true)

  const cart = JSON.parse(localStorage.getItem('cartJSON') || '[]');

  useEffect(() => {
    async function _() {
      const _: IProduct[] = [];
      if (cart?.length) {
        for (const item of cart) {
          await productServices.getProById(item.product_id).then((res: any) => {
            _.push(res.data);
          });
        }
      }
      setProductCart(_);
    }
    _();
  }, []);

  const [showVoucher, setVoucher] = useState(false);
  const [showVariant, setShowVariant] = useState<number[]>([]);
  const [showColor, setShowColor] = useState<number[]>([]);


  const [quantities, setQuantities] = useState<number[]>(cart.map((product: { quantity: number }) => product.quantity));

  const increaseQuantity = (index: number) => {
    const quantity: number = productCart[index].variants[cart[index].variant].colors[cart[index].color].quantity
    const cartNew = cart.map((e: any, i: number) => {
      if (index === i) return {
        ...e,
        quantity: +e.quantity + 1 > quantity ? quantity : +e.quantity + 1
      }
      return e
    })
    localStorage.setItem("cartJSON", JSON.stringify(cartNew))
    setLoad(!load)
  };

  const decreaseQuantity = (index: number) => {
    const cartNew = cart.map((e: any, i: number) => {
      if (index === i) return {
        ...e,
        quantity: +e.quantity - 1 <= 0 ? 1 : +e.quantity - 1
      }
      return e
    })
    localStorage.setItem("cartJSON", JSON.stringify(cartNew))
    setLoad(!load)
  };

  function handlChangeVariant(index: number) {
    if (showVariant.includes(index)) {
      setShowVariant(showVariant.filter(e => e != index))
    } else {
      setShowVariant([...showVariant, index])
    }
  }

  function handlChangeColor(index: number) {
    if (showColor.includes(index)) {
      setShowColor(showColor.filter(e => e != index))
    } else {
      setShowColor([...showColor, index])
    }
  }
















  const [checkedItems, setCheckedItems] = useState<boolean[]>(cart.map(() => false));
  const [totalPrice, setTotalPrice] = useState(0);
  const calculateProductPrice = (product: IProduct, iProduct: number) => {
    return (
      (
        product.variants[cart[iProduct].variant].price -
        product.variants[cart[iProduct].variant].price_sale +
        product.variants[cart[iProduct].variant].colors[
          cart[iProduct].color
        ].price_extra) * quantities[iProduct]
    );
  };


  const calculateTotalPrice = () => {
    // const total = productCart.reduce((sum: any, product: IProduct, index: any) => {
    // if (checkedItems[index]) {
    // return sum + calculateProductPrice(product, index);
    // }
    // return sum;
    // }, 0);
    // setTotalPrice(total);
  };


  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const isChecked = e.target.checked;
    // setCheckedItems(cart.map(() => isChecked));
  };
  const handleCheckItem = (index: number) => {
    // const newCheckedItems = [...checkedItems];
    // newCheckedItems[index] = !newCheckedItems[index];
    // setCheckedItems(newCheckedItems);
  };
  useEffect(() => {
    // calculateTotalPrice();
  }, [checkedItems, quantities]);

  useEffect(() => {
    // const updatedProducts = cart.map((product: any, index: number) => ({
    // ...product,
    // quantity: quantities[index],
    // }));
    // localStorage.setItem("cart", JSON.stringify(updatedProducts));
  }, [quantities]);

  const handleRemoveItem = (index: number) => {
    // const updatedProducts = cart.filter((_: any, iProduct: any) => iProduct !== index);
    // // localStorage.setItem("cart", JSON.stringify(updatedProducts));
    // setProductCart(productCart.filter((_: any, iProduct: any) => iProduct !== index));
    // setCheckedItems(checkedItems.filter((_, iProduct) => iProduct !== index));
    // setQuantities(quantities.filter((_, iProduct) => iProduct !== index));
  };





  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      {productCart.length > 0 ? (
        <div>
          <section>
            <div className="flex flex-col items-center min-h-[678px] gap-5">
              <div className="flex items-center border rounded-xl shadow-[0_4px_6px_rgba(209,213,219,0.5)] p-4 gap-2.5 ">
                <div className="w-16 flex justify-center">
                  <input onChange={handleCheckAll} checked={checkedItems.every(item => item)} type="checkbox" className="w-6 h-6" />
                </div>
                <div className="w-[660px] flex-shrink-0 font-normal text-base">
                  Sản Phẩm
                </div>
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

              {productCart.map((product: IProduct, iProduct: number) => (
                <div key={iProduct} className="flex items-center border rounded-xl shadow-[0_4px_6px_rgba(209,213,219,0.5)] p-4 gap-2.5 cursor-pointer w-full">
                  <div className="w-16 flex justify-center">
                    <input onChange={() => handleCheckItem(iProduct)} checked={checkedItems[iProduct]} type="checkbox" className="w-5 h-5 text-red-600 focus:ring-0" />
                  </div>
                  <div className="w-[660px] flex gap-2.5">
                    <img
                      src={
                        product.variants[cart[iProduct].variant].colors[
                          cart[iProduct].color
                        ].image
                      }
                      alt="Sản Phẩm"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex w-64 flex-col gap-3">
                      <div className="font-bold text-base">
                        {product.name}
                      </div>
                      <div className="text-primary text-base font-bold">
                        {(

                          product.variants[cart[iProduct].variant].price -
                          product.variants[cart[iProduct].variant].price_sale +
                          product.variants[cart[iProduct].variant].colors[
                            cart[iProduct].color
                          ].price_extra
                        ).toLocaleString("vi-VN")} đ <del className="text-black text-xs font-normal ">
                          {(product.variants[cart[iProduct].variant].price).toLocaleString('vn-VN')}
                          đ</del>
                      </div>
                    </div>

                    <div className="w-72 flex gap-2 items-center select-none">
                      <div
                        onClick={() => {
                          // setShowVariant(prev => prev === iProduct ? null : iProduct);
                          handlChangeVariant(iProduct)
                        }}
                        className="border rounded-md px-1.5 py-1.5 text-base font-normal h-10 flex items-center gap-1.5 relative"
                      >
                        <div>{product.variants[cart[iProduct].variant].properties.map(e => e.name).join(" - ")}</div>
                        <FaCaretDown />

                        {showVariant.includes(iProduct) && (
                          <div
                            className="z-10 w-[404px] flex flex-wrap gap-2 p-4 border border-gray-300 bg-white rounded-2xl absolute top-12 left-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {product.variants.map((variant: any, ivariant: number) => (
                              <div
                                key={ivariant}
                                onClick={() => {
                                  handlChangeVariant(iProduct)
                                }}

                                className={`relative px-4 py-2 border rounded-lg cursor-pointer ${ivariant == cart[iProduct].variant ? "border-primary" : "border-gray-300"
                                  }`}
                              >
                                {variant.properties.map((e: IProperty) => e.name).join(" - ")}
                                {ivariant == cart[iProduct].variant && (
                                  <div className="absolute w-5 h-3 bg-primary top-0 left-0 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                    <IoMdCheckmark className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div
                        onClick={() => {
                          // setShowColor(prev => prev === iProduct ? null : iProduct);
                          handlChangeColor(iProduct)
                        }}
                        className="border rounded-md px-1.5 py-1.5 text-base font-normal h-10 flex items-center gap-1.5 relative"
                      >
                        <div>{product.variants[cart[iProduct].variant].colors[cart[iProduct].color].name}</div>
                        <FaCaretDown />

                        {showColor.includes(iProduct) && (
                          <div
                            className="z-10 w-[404px] flex flex-wrap gap-2 p-4 border border-gray-300 bg-white rounded-2xl absolute top-12 left-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {product.variants[cart[iProduct].variant].colors.map((color, icolor: number) => (
                              <div
                                key={icolor}
                                onClick={() => {
                                  // const newCheckedColor = [...isCheckedColor];
                                  // newCheckedColor[iProduct] = colorItem;
                                  // setCheckedColor(newCheckedColor);
                                  handlChangeColor(iProduct)
                                }}
                                className={`relative px-4 py-2 border rounded-lg cursor-pointer ${icolor === cart[iProduct].color ? "border-primary" : "border-gray-300"
                                  }`}
                              >
                                {color.name}
                                {icolor === cart[iProduct].color && (
                                  <div className="absolute w-5 h-3 bg-primary top-0 left-0 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                    <IoMdCheckmark className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* // ))} */}
                  <div className="w-40 flex justify-center items-center">
                    <div className="w-[136px] flex justify-center items-center border rounded-lg">
                      <button onClick={() => decreaseQuantity(iProduct)} className="w-9 h-9 text-lg flex justify-center items-center">
                        <FaMinus className="w-4 h-4" />
                      </button>
                      <input type="text" value={cart[iProduct].quantity} readOnly className="w-16 h-9 text-center font-base font-bold border-l border-r" />
                      <button onClick={() => increaseQuantity(iProduct)} className="w-9 h-9 text-lg flex justify-center items-center">
                        <FaPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="w-40 text-center text-primary text-base font-bold">
                    {calculateProductPrice(product, iProduct)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                  </div>
                  <button onClick={() => handleRemoveItem(iProduct)} className="w-40 text-center text-black text-base font-bold hover:text-red-600">
                    Xóa
                  </button>
                </div>
              ))}




            </div>
          </section>

          <section>
            <div className="w-full p-4 bg-white border border-gray-300 rounded-2xl shadow-xl">
              <div className="flex justify-between items-center  border-t border-b p-2 border-dotted mb-2 ">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <input onChange={handleCheckAll} checked={checkedItems.every(item => item)} type="checkbox" className="mr-2 w-6 h-6" />
                    <span className="text-base font-medium">Chọn tất cả <span>
                      (3)
                    </span></span>
                  </div>
                  <div>
                    <p>Xóa các sản phẩm đã chọn</p>
                  </div>
                </div>
                <div className="flex items-center gap-60">
                  <div className="flex items-center gap-2">
                    <HiOutlineTicket className=" w-8 h-8" />
                    <span className="text-base font-normal">ElecKing Voucher</span>
                  </div>
                  <p className="ml-2 text-blue-600 cursor-pointer" onClick={() => setVoucher(showVoucher ? false : true)}>Chọn mã</p>
                </div>
              </div>
              <div className="flex justify-between items-center relative">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">
                    Tổng thanh toán (<span> 1</span> sản phẩm ) :
                  </span>

                  <span className="text-primary text-lg font-bold cursor-pointer relative group">
                    {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₫
                    <div className="absolute hidden group-hover:block w-[740px] left-1/2 transform -translate-x-1/3 bottom-full mb-2 p-5 bg-white rounded-lg shadow-lg">
                      <h2 className="text-2xl font-medium py-5">Chi tiết thanh toán</h2>
                      <div className="border-t border-gray-300 py-4 px-1 flex justify-between">
                        <span className="text-gray-600 text-lg font-normal">Tổng tiền hàng</span>
                        <span className="text-black text-lg font-normal">34.990.000 ₫</span>
                      </div>
                      <div className="border-t border-gray-300 py-4 px-1 flex justify-between">
                        <span className="text-gray-600 text-lg font-normal">Giảm giá sản phẩm</span>
                        <span className="text-black text-lg font-normal">2.200.000 ₫</span>
                      </div>
                      <div className="border-t border-gray-300 py-4 px-1 flex justify-between">
                        <span className="text-gray-600 text-lg font-normal">Voucher</span>
                        <span className="text-black text-lg font-normal">100.000 ₫</span>
                      </div>
                      <div className="border-t py-5 px-1 border-gray-300 mt-2 pt-2 flex justify-between">
                        <span className="font-medium text-xl">Tổng số tiền thanh toán</span>
                        <span className="text-primary font-bold text-xl">{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</span>
                      </div>
                    </div>
                  </span>
                  <IoMdArrowDropdown className="w-6 h-6 inline text-black" />

                </div>
                <Link href={config.routes.client.checkout}>
                  <button className="bg-primary text-white px-24 py-4 rounded-lg font-bold text-xl">
                    Mua Hàng
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {showVoucher && (
            <>
              <Voucher onClick={() => setVoucher(false)} />
              <div className="overlay"></div>
            </>
          )}
        </div>) : (
        <div className="translate-y-[150px]">
          <div className="flex items-center justify-between flex-col gap-5">
            <div><BsCartX className="w-[96px] h-[96px] text-primary" /></div>
            <div className="flex flex-col gap-2.5 items-center">
              <div className="text-2xl font-semibold">Giỏ hàng của bạn đang trống.</div>
              <div className="text-2xl font-normal">Hãy chọn thêm sản phẩm để mua sắm nhé</div>
            </div>
          </div>
        </div>
      )}
    </div>


  );
}

export default Cart;