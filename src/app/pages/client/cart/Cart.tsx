"use client";

import Voucher from "@/app/components/client/Voucher";
import Item from "antd/es/list/Item";
import Link from "next/link";
import { useState } from "react";
import { FaCaretDown, FaMinus, FaPlus, FaSortDown } from "react-icons/fa6";
import { HiOutlineTicket } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdCheckmark } from "react-icons/io";
import config from "@/app/config";

function Cart() {
  const [showVoucher, setVoucher] = useState(false);
  const [isCheckedRams, setCheckedRams] = useState<string | null>(null)
  const [isCheckedColor, setCheckedColor] = useState<string | null>(null)
  const [showRams, setRams] = useState(false)
  const [showColor, setColor] = useState(false)
  const color = ['Titan Sa Mạc', 'Titan Tự Nhiên', 'Titan đen', 'Titan Trắng']
  const rams = ['64GB', '128GB', '258GB', '512GB', '1T']
  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">

      <section>
        <div className="flex flex-col items-center min-h-[678px] gap-5">
          <div className="flex items-center border rounded-xl shadow-[0_4px_6px_rgba(209,213,219,0.5)] p-4 gap-2.5 ">
            <div className="w-16 flex justify-center">
              <input type="checkbox" className="w-6 h-6" />
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








          <div className="flex items-center border rounded-xl shadow-[0_4px_6px_rgba(209,213,219,0.5)] p-4 gap-2.5 cursor-pointer w-full">
            <div className="w-16 flex justify-center">
              <input type="checkbox" className="w-5 h-5 text-red-600 focus:ring-0" />
            </div>
            <div className="w-[660px] flex gap-2.5">
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                alt="Sản Phẩm"
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex w-64 flex-col gap-3">
                <div className="font-bold text-base">
                  iPhone 16 Pro Max | Chính hãng VN/A
                </div>
                <div className="text-primary text-base font-bold">
                  32.790.000 đ <del className="text-black text-xs font-normal ">34.990.000 đ</del>
                </div>
              </div>
              <div className="w-72 flex gap-2 items-center">
                <div
                  onClick={() => {
                    setRams(prev => !prev);
                    setColor(false);
                  }}
                  
                  className="border rounded-md px-1.5 py-1.5 text-base font-normal h-10 flex items-center gap-1.5 relative"
                >
                  <div>{isCheckedRams || "256GB"}</div>
                  <FaCaretDown />

                  {showRams && (
                    <div
                      className="w-[404px] flex flex-wrap gap-2 p-4 border border-gray-300 bg-white rounded-2xl absolute top-12 left-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {rams.map((item) => (
                        <div
                          key={item}
                          onClick={() => {
                            setCheckedRams(item);
                            setRams(false);
                          }}
                          className={`relative px-4 py-2 border rounded-lg cursor-pointer ${isCheckedRams === item ? "border-primary" : "border-gray-300"}`}
                        >
                          {item}
                          {isCheckedRams === item && (
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
                  setColor(prev => !prev);
                  setRams(false);
                }}
                
                className="border rounded-md px-1.5 py-1.5 text-base font-normal h-10 flex items-center gap-1.5 relative">
                  <div>{isCheckedColor || "Titan Sa Mạc"}</div>
                  <FaCaretDown />
                  {showColor && (
                    <div
                      className="w-[404px] flex flex-wrap gap-2 p-4 border border-gray-300 bg-white rounded-2xl absolute top-12 left-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {color.map((item) => (
                        <div
                          key={item}
                          onClick={() => {
                            setCheckedColor(item);
                            setColor(false);
                          }}
                          className={`relative px-4 py-2 border rounded-lg cursor-pointer ${isCheckedColor === item ? "border-primary" : "border-gray-300"}`}
                        >
                          {item}
                          {isCheckedColor === item && (
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

            <div className="w-40 flex justify-center items-center">
              <div className="w-[136px] flex justify-center items-center border rounded-lg">
                <button className="w-9 h-9 text-lg flex justify-center items-center">
                  <FaMinus className="w-4 h-4" />
                </button>
                <input type="text" value="1" readOnly className="w-16 h-9 text-center font-base font-bold border-l border-r"
                />
                <button className="w-9 h-9 text-lg flex justify-center items-center " >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-40 text-center text-primary text-base font-bold">
              32.790.000 đ
            </div>

            <button className="w-40 text-center text-black text-base font-bold hover:text-red-600">
              Xóa
            </button>
          </div>















          <div className="flex items-center border rounded-xl shadow-[0_4px_6px_rgba(209,213,219,0.5)] p-4 gap-2.5 cursor-pointer">
            <div className="w-16 flex justify-center">
              <input type="checkbox" className="w-5 h-5 text-red-600 focus:ring-0" />
            </div>
            <div className="w-[660px] flex gap-2.5">
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                alt="Sản Phẩm"
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex w-64 flex-col gap-3">
                <div className="font-bold text-base">
                  iPhone 16 Pro Max | Chính hãng VN/A
                </div>
                <div className="text-primary text-base font-bold">
                  32.790.000 đ <del className="text-black text-xs font-normal ">34.990.000 đ</del>
                </div>
              </div>
              <div className="w-72 flex gap-2 items-center">
                <div className="border rounded-md px-1.5 py-1.5 text-base font-normal h-10 flex items-center gap-1.5">
                  <div>256GB</div>
                  <FaCaretDown />
                </div>
                <div className="border rounded-md px-1.5 py-1.5 text-base font-normal h-10 flex items-center gap-1.5">
                  <div>Titan Sa Mạc</div>
                  <FaCaretDown />
                </div>
              </div>

            </div>

            <div className="w-40 flex justify-center items-center">
              <div className="w-[136px] flex justify-center items-center border rounded-lg">
                <button className="w-9 h-9 text-lg flex justify-center items-center">
                  <FaMinus className="w-4 h-4" />
                </button>
                <input type="text" value="1" readOnly className="w-16 h-9 text-center font-base font-bold border-l border-r"
                />
                <button className="w-9 h-9 text-lg flex justify-center items-center " >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-40 text-center text-primary text-base font-bold">
              32.790.000 đ
            </div>

            <button className="w-40 text-center text-black text-base font-bold hover:text-red-600">
              Xóa
            </button>
          </div>


        </div>
      </section>

      <section>
        <div className="w-full p-4 bg-white border border-gray-300 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center  border-t border-b p-2 border-dotted mb-2 ">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="mr-2 w-6 h-6" />
                <span className="text-base font-medium">Chọn tất cả <span>( 2 )</span></span>
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
                32.790.000 ₫
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
                    <span className="text-primary font-bold text-xl">32.790.000 ₫</span>
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

    </div>

  );
}

export default Cart;
