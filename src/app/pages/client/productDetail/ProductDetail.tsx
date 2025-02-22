"use client";

import ProductVariant from "@/app/pages/client/productDetail/ProductVariant";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import SwiperCore from "swiper/core";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { Pagination } from "antd";
import Product from "@/app/components/client/Product";
import ModalAddProduct from "@/app/components/client/ModalAddProduct";
import ProductColor from "./ProductColor";
// import Swiper core and required modules

SwiperCore.use([Navigation, Thumbs]);

function ProductDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [showModal, setShowModal] = useState(false);

  const rams = [
    {
      name: "1TB",
      price: 44690000,
    },
    {
      name: "512GB",
      price: 39290000,
    },
    {
      name: "256GB",
      price: 32990000,
    },
  ];

  const [variant, setVariant] = useState(rams[0].name);

  const Color = [
    {
      name: "TiTan Sa Mạc",
      price: 32990000,
    },
    {
      name: "TiTan Đen",
      price: 32990000,
    },
    {
      name: "TiTan Trắng",
      price: 32990000,
    },
    {
      name: "TiTan Tự Nhiên",
      price: 32990000,
    },
  ];
  const [colorName, setColorName] = useState(Color[0].name);

  return (
    <>
      {/* Chi tiết sản phẩm, giá và type */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="text-lg font-extrabold">
          iPhone 15 Pro Max 256GB | Chính hãng VN/A
        </div>
        <hr className="my-4" />
        <div className="flex gap-4">
          {/* hình ảnh */}
          <div className="w-7/12 flex flex-wrap ">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img className="w-full h-full object-contain" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-contain" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4__1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-contain" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_5__1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-contain" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_6__1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-contain" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_7__1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-contain" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_8__1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-contain" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_9__1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-contain" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_1__1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="w-full h-full object-contain" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_10__1.jpg" />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={(e) => setThumbsSwiper(e)}
              spaceBetween={10}
              slidesPerView={8}
              freeMode={true}
              watchSlidesProgress={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <img
                  className="w-20 h-20"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_3.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-20 h-20"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_4__1.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-20 h-20"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_5__1.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-20 h-20"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_6__1.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-20 h-20"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_7__1.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-20 h-20"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_8__1.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-20 h-20"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_9__1.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-20 h-20"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_1__1.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="w-20 h-20"
                  src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_10__1.jpg"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Chọn type */}
          <div className="w-5/12">
            <div className="grid grid-cols-3 flex-wrap gap-2.5">
              {rams.map((ram, iram) => (
                <div key={iram}>
                  <ProductVariant
                    name={ram.name}
                    price={ram.price}
                    checked={variant}
                    onClick={() => setVariant(ram.name)}
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="py-4">Chọn màu để xem Giá</div>
              <div className="grid grid-cols-3 flex-wrap gap-2.5">
                {Color.map((color, i) => (
                  <div key={i}>
                    <ProductColor 
                    color={color.name}
                    price={color.price}
                    checked = {colorName}
                    onClick = {() => setColorName(color.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 items-center py-4">
              <p className="text-base font-medium w-[92px]">Giá</p>
              <p className="text-3xl font-bold text-red-500 w-[204px]">
                32.490.000 đ
              </p>
              <del className="text-lg font-normal text-gray-500">
                34.490.000
              </del>
              <div className="py-1.5 px-1 bg-primary rounded-md w-[42px] h-6 flex items-center ">
                <p className="w-full text-center text-xs font-bold text-white">
                  -6%
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center py-4">
              <p>Số Lượng</p>
              <div className="flex items-center">
                <div className="w-10 h-10 border rounded-l-lg flex items-center justify-center">
                  -
                </div>
                <div className="w-20 h-10 border flex items-center justify-center">
                  1
                </div>
                <div className="w-10 h-10 border rounded-r-lg flex items-center justify-center">
                  +
                </div>
              </div>
              <p>100 Sản phẩm có sẵn</p>
            </div>
            <div className="flex gap-4 py-2.5">
              <div
                onClick={() => {
                  setShowModal(true);
                  setTimeout(() => setShowModal(false), 1000);
                }}
                className="cursor-pointer flex gap-1.5 p-1 rounded-lg w-[200px] h-[60px] items-center justify-center border border-primary "
              >
                <AiOutlineShoppingCart className="w-[30px] h-[30px] text-primary " />
                <p className="text-primary text-sm font-normal ">
                  Thêm vào giỏ hàng
                </p>
              </div>
              <div className="flex w-[308px] h-[60px] items-center bg-primary rounded-lg">
                <p className="w-full text-center text-white text-lg font-bold">
                  MUA NGAY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mô Tả */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex gap-4">
        <div className="w-4/5 shadow-xl border border-gray-300 p-4 rounded-lg">
          <div className="p-4">
            <p className="text-xl font-bold">MÔ TẢ SẢN PHẨM</p>
            <div
              dangerouslySetInnerHTML={{
                __html: ` <p class="text-sm font-medium">Bộ sản phẩm bao gồm:</p>
            <li class="text-sm font-medium">iPhone sử dụng iOS 18</li>
            <li class="text-sm font-medium">Cáp Sạc USB‑C (1m)</li>
            <li class="text-sm font-medium">Tài liệu</li>
            <p class="text-sm font-medium">Thông tin bảo hành:</p>
            <p class="text-sm font-medium">
              Bảo hành: 12 tháng kể từ ngày kích hoạt sản phẩm.
            </p>
            <p class="text-sm font-medium">
              Kích hoạt bảo hành tại: https://checkcoverage.apple.com/vn/en/
            </p>
            <p class="text-sm font-medium">
              Hướng dẫn kiểm tra địa điểm bảo hành gần nhất:
            </p>
            <p class="text-sm font-medium">
              Bước 1: Truy cập vào đường link
              https://getsupport.apple.com/?caller=grl&locale=en_VN
            </p>
            <p class="text-sm font-medium">Bước 2: Chọn sản phẩm.</p>
            <p class="text-sm font-medium">
              Bước 3: Điền Apple ID, nhập mật khẩu.
            </p>
            <p class="text-sm font-medium">
              Sau khi hoàn tất, hệ thống sẽ gợi ý những trung tâm bảo hành gần
              nhất.
            </p>
            <p class="text-sm font-medium">
              Tại Việt Nam, về chính sách bảo hành và đổi trả của Apple, "sẽ
              được áp dụng chung" theo các điều khoản được liệt kê dưới đây:
            </p>
            <p class="text-sm font-medium">
              1/ Chính sách chung:
              https://www.apple.com/legal/warranty/products/warranty-rest-of-apac-vietnamese.html
            </p>
            <p class="text-sm font-medium">
              2/ Chính sách cho phụ kiện:
              https://www.apple.com/legal/warranty/products/accessory-warranty-vietnam.html
            </p>
            <p class="text-sm font-medium">
              3/ Các trung tâm bảo hành Apple ủy quyền tại Việt Nam:
              https://getsupport.apple.com/repair-locations?locale=vi_VN
            </p>
            <p class="text-sm font-medium">
              Qúy khách vui lòng đọc kỹ hướng dẫn và quy định trên các trang
              được Apple công bố công khai, Shop chỉ có thể hỗ trợ theo đúng
              chính sách được đăng công khai của thương hiệu Apple tại Việt Nam,
            </p>
            <p class="text-sm font-medium">
              Bài viết tham khảo chính sách hỗ trợ của nhà phân phối tiêu biểu:
            </p>
            <p class="text-sm font-medium">
              https://synnexfpt.com/bao-hanh/chinh-sach-bao-hanh/?agency-group=1&agency-slug=san-pham-apple
            </p>
            <p class="text-sm font-medium">
              Để thuận tiện hơn trong việc xử lý khiếu nại, đơn hàng của Brand
              Apple thường có giá trị cao, Qúy khách mua hàng vui lòng quay lại
              Clip khui mở kiện hàng (khách quan nhất có thể, đủ 6 mặt) giúp
              Shopee có thêm căn cứ để làm việc với các bên và đẩy nhanh tiến độ
              xử lý giúp Qúy khách mua hàng.
            </p>`,
              }}
            />
          </div>
        </div>
        <div className="w-1/5">
          <img
            className="w-full h-full"
            src="https://vnpik.com/wp-content/uploads/2024/12/Pikvip.com_20241204_20.jpg"
            alt=""
          />
        </div>
      </section>

      {/* Đánh Giá */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 shadow-xl border border-gray-300 p-4 rounded-lg">
        <div className="">
          <div className="px-4 py-2">
            <p className="text-lg font-bold">ĐÁNH GIÁ SẢN PHẨM</p>
          </div>
          <div>
            <div className="flex gap-4 px-4 py-2">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-2">
                  <span className="text-3xl font-bold text-primary">5</span>
                  <span className="text-primary text-lg font-normal">
                    {" "}
                    trên 5{" "}
                  </span>
                </div>
                <div className="flex gap-1">
                  <FaStar className="w-4.5 h-4.5 text-yellow-500" />
                  <FaStar className="w-4.5 h-4.5 text-yellow-500" />
                  <FaStar className="w-4.5 h-4.5 text-yellow-500" />
                  <FaStar className="w-4.5 h-4.5 text-yellow-500" />
                  <FaStar className="w-4.5 h-4.5 text-yellow-500" />
                </div>
              </div>
              <div className="flex gap-2.5 p-2.5">
                <div className="px-4 py-2 rounded bg-primary text-sm font-bold text-white">
                  Tất Cả
                </div>
                <div className="px-4 py-2 rounded border border-gray-400 text-sm font-bold">
                  5 Sao
                </div>
                <div className="px-4 py-2 rounded border border-gray-400 text-sm font-bold">
                  4 Sao
                </div>
                <div className="px-4 py-2 rounded border border-gray-400 text-sm font-bold">
                  3 Sao
                </div>
                <div className="px-4 py-2 rounded border border-gray-400 text-sm font-bold">
                  2 Sao
                </div>
                <div className="px-4 py-2 rounded border border-gray-400 text-sm font-bold">
                  1 Sao
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col">
            <div className="flex gap-4 px-5 py-4 border-y-2">
              <div className="w-[70px] h-[70px] ">
                <img
                  className="border rounded-full"
                  src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="">User 1</div>
                <div className="flex gap-1">
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                </div>
                <div className="flex gap-2">
                  <p className="text-base font-normal">2025-02-21</p>
                  <p className="text-base font-normal">11:52</p>
                </div>
                <div>
                  <p className="text-base font-normal">
                    Cái màu ở ngoài nó xinh. Lần đầu mua hàng giá trị cao trên
                    ElecKing. Máy dùng ngonnn không lỗi lầmm giao hàng nhanh.
                    Đóng gói cẩn thận yên tâm mua sắmmm
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-[72px] h-[72px]">
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex gap-1.5 items-center">
                  <FaRegHeart />
                  <p className="text-base font-normal">102</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 px-5 py-4 border-y-2">
              <div className="w-[70px] h-[70px] ">
                <img
                  className="border rounded-full"
                  src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="">User 1</div>
                <div className="flex gap-1">
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                  <FaStar className="w-4.5 h-4.5 text-secondary" />
                </div>
                <div className="flex gap-2">
                  <p className="text-base font-normal">2025-02-21</p>
                  <p className="text-base font-normal">11:52</p>
                </div>
                <div>
                  <p className="text-base font-normal">
                    Cái màu ở ngoài nó xinh. Lần đầu mua hàng giá trị cao trên
                    ElecKing. Máy dùng ngonnn không lỗi lầmm giao hàng nhanh.
                    Đóng gói cẩn thận yên tâm mua sắmmm
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-[72px] h-[72px]">
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex gap-1.5 items-center">
                  <FaRegHeart />
                  <p className="text-base font-normal">102</p>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center py-6">
              {" "}
              <Pagination
                defaultCurrent={1}
                align="end"
                total={100}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sản Phẩm Tương Tự */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 gap-2.5">
        <div className="flex gap-2.5 p-2.5">
          <p className="text-3xl font-medium">Sản Phẩm Tương Tự</p>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
          <Product type={5} />
        </div>
      </section>
      {showModal && (
        <div onClick={() => setShowModal(false)}>
          <ModalAddProduct />
          <div className="overlay"></div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
