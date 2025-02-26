"use client";

import ProductVariant from "@/app/pages/client/productDetail/ProductVariant";
import React, { useEffect, useRef, useState } from "react";
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
import { useParams, useSearchParams } from "next/navigation";
import * as productServices from "@/app/services/product.service";

// import Swiper core and required modules

SwiperCore.use([Navigation, Thumbs]);

function ProductDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const [productDetail, setProductDetail] = useState<IProduct[]>([]);
  const [productSame, setProductSame] = useState<IProduct[]>([]);
  const id = params.id;
  useEffect(() => {
    if (id) {
      productServices.getQuery(`id=${id}`).then((res) => setProductDetail(res));
    }
  }, [id]);

  const colors = productDetail[0]?.variants[0]?.colors as IProductColor[];

  console.log(colors);
  
  
  const categoryid = productDetail[0]?.category?.id as IProductCat | string;

  useEffect(() => {
    if (categoryid) {
      productServices
        .getQuery(`categoryid=${categoryid}&limit=6`)
        .then((res) => {
          const filter = res.filter((pro: any) => pro.id !== id);
          setProductSame(filter);
        });
    }
  }, [categoryid]);

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
        <div className="text-lg font-extrabold">{productDetail[0]?.name}</div>
        <hr className="my-4" />
        <div className="flex gap-4">
          {/* hình ảnh */}
          <div className="w-7/12 flex flex-wrap gap-2.5">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              className="w-full h-[340px] border border-gray-200 rounded-2xl"
            >
              {productDetail[0]?.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img className="w-full h-full object-contain" src={img} />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={(e) => setThumbsSwiper(e)}
              spaceBetween={10}
              slidesPerView={8}
              freeMode={true}
              watchSlidesProgress={true}
              className="w-full"
            >
              {productDetail[0]?.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="border border-gray-300 w-20 h-20 rounded-lg"
                    src={img}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Chọn type */}
          <div className="w-5/12">
            <div className="grid grid-cols-3 flex-wrap gap-2.5">
              {rams.map((ram, index) => (
                <div key={index}>
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
                {colors?.map((color, i) => (
                  <div key={i}>
                    <ProductColor
                      image={color.image}
                      color={color.name}
                      price={productDetail[0]?.price + color.price_extra}
                      checked={colorName}
                      onClick={() => setColorName(color.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 items-center py-4">
              <p className="text-base font-medium w-[92px]">Giá</p>
              <p className="text-3xl font-bold text-red-500 w-[204px]">
                {(
                  productDetail[0]?.price -
                  productDetail[0]?.variants[0].price_extra -
                  productDetail[0]?.variants[0].price_sale
                ).toLocaleString("vi-VN")}
              </p>
              <del className="text-lg font-normal text-gray-500">
                {(productDetail[0]?.variants[0].price_extra -
                  productDetail[0]?.variants[0].price_sale).toLocaleString('vi-VN')}
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
                __html: ` ${productDetail[0]?.description}`,
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
          <Product product={productSame} />
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
