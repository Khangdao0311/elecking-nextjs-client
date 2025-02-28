"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ImFire } from "react-icons/im";
import { MdArrowForwardIos } from "react-icons/md";
import Product from "@/app/components/client/Product";
import * as productServices from "@/app/services/product.service";
import config from "@/app/config";
import { Fragment, useEffect, useState } from "react";
const imageSlide = [
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/16-pro-max-AfterValentine.jpg",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/samsung-s25-gia-chuan-19-2.jpg",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/tecno-camon-30-pro-tai-nghe-home.jpg",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/BUds-6-Pro-sliding-home.jpg",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/vivo-nghim-thu-t2-25.jpg",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/dong-ho-thong-minh-huawei-watch-gt-5-milanese-13-02-home.jpg",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/mlkk-lg.jpg",
];

function Home() {
  // Lấy Sản Phẩm Sale
  const [productSale, setProductSale] = useState([]);
  useEffect(() => {
    const query = { orderby: "sale" };
    productServices.getQuery(query).then((res) => setProductSale(res));
  }, []);

  // Lấy Sản Phẩm Hot
  const [productHot, setProductHot] = useState([]);
  useEffect(() => {
    const query = { orderby: "view-desc" };
    productServices.getQuery(query).then((res) => setProductHot(res));
  }, []);

  // Lấy Sản Phẩm theo danh mục laptop
  const [productLaptop, setProductLaptop] = useState([]);
  useEffect(() => {
    const query = {
      categoryid:
        "67b6cf1a3a893726b5398576-67b6cf1a3a893726b5398577-67b6cf1a3a893726b5398578",
    };
    productServices.getQuery(query).then((res) => setProductLaptop(res));
  }, []);

  // Lấy Sản Phẩm theo danh mục máy tính bảng
  const [productTablet, setProductTablet] = useState([]);
  useEffect(() => {
    const query = {
      categoryid: "67b6cf1a3a893726b5398575-67b6cf1a3a893726b5398574",
    };
    productServices.getQuery(query).then((res) => setProductTablet(res));
  }, []);

  // Lấy Sản Phẩm theo danh mục tai nghe
  const [headPhone, setHeadPhone] = useState([]);
  useEffect(() => {
    const query = {
      categoryid: "67b6cf1a3a893726b5398579-67b6cf1a3a893726b539857a",
    };
    productServices.getQuery(query).then((res) => setHeadPhone(res));
  }, []);

  return (
    <>
      {/* Slide */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          // navigation={{
          //   nextEl: ".custom-next",
          //   prevEl: ".custom-prev",
          // }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-96 w-full"
        >
          {imageSlide.map((e, index) => (
            <SwiperSlide key={index + 1}>
              <img className="w-full h-full object-cover" src={e} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <img
            className="rounded-lg h-36 w-full"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/m55-14-02.png"
            alt=""
          />
          <img
            className="rounded-lg h-36 w-full"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-imac-m4-30-12.jpg"
            alt=""
          />
          <img
            className="rounded-lg h-36 w-full"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/s-edu-2-0-right-laptop.jpg"
            alt=""
          />
        </div>
      </section>

      {/* Product Sale */}
      <section className="w-full bg-primary h-[500] py-5">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <ImFire className="w-12 h-12 text-white" />
            <p className="text-4xl font-bold text-white">HOT SALE</p>
          </div>
          <div className="flex gap-1 items-center">
            <em className="underline text-white text-base font-medium">
              Xem tất cả{" "}
            </em>
            <MdArrowForwardIos className="text-white w-5 h-5" />
          </div>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
          {productSale.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product product={product} />
            </Fragment>
          ))}
        </div>
      </section>

      {/* Promot*/}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <img
          className="w-full rounded-lg"
          src="https://cdn2.cellphones.com.vn/insecure/rs:fill:1200:75/q:90/plain/https://dashboard.cellphones.com.vn/storage/s-edu-2-0-special-desk.gif"
          alt=""
        />
      </section>

      {/* Sản Phẩm Nổi Bật */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-4xl font-bold text-black">
              SẢN PHẨM NỔI BẬT NHẤT
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <em className="underline text-gray-500 drop-shadow-md text-base font-medium">
              Xem tất cả{" "}
            </em>
            <MdArrowForwardIos className="text-gray-500 drop-shadow-md w-5 h-5" />
          </div>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
          {productHot.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product product={product} />
            </Fragment>
          ))}
        </div>
      </section>

      {/* Điện Thoại, Máy Tính Bảng */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-4xl font-bold text-black">
              ĐiỆN THOẠI, MÁY TÍNH BẢNG
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <em className="underline text-gray-500 drop-shadow-md text-base font-medium">
              Xem tất cả{" "}
            </em>
            <MdArrowForwardIos className="text-gray-500 drop-shadow-md w-5 h-5" />
          </div>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
          {productTablet.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product product={product} />
            </Fragment>
          ))}
        </div>
      </section>

      {/* LAPTOP, MÀN HÌNH, TIVI */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-4xl font-bold text-black">
              LAPTOP, MÀN HÌNH, TIVI
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <em className="underline text-gray-500 drop-shadow-md text-base font-medium">
              Xem tất cả{" "}
            </em>
            <MdArrowForwardIos className="text-gray-500 drop-shadow-md w-5 h-5" />
          </div>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
          {productLaptop.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product product={product} />
            </Fragment>
          ))}
        </div>
      </section>

      {/* /*TAI NGHE, LOA */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-4xl font-bold text-black">TAI NGHE, LOA</p>
          </div>
          <div className="flex gap-1 items-center">
            <em className="underline text-gray-500 drop-shadow-md text-base font-medium">
              Xem tất cả{" "}
            </em>
            <MdArrowForwardIos className="text-gray-500 drop-shadow-md w-5 h-5" />
          </div>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
        {headPhone.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product product={product} />
            </Fragment>
          ))}
        </div>
      </section>

      {/* DANH MỤC */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-3xl font-medium text-black">DANH MỤC</p>
          </div>
        </div>
        <div className="grid grid-cols-9 container-custom gap-3.5">
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Điện thoại
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/p/ip-14-hp-cu.png"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Máy tính bảng
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-cate-cu.png"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Laptop
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/icons/category/cate-392.svg"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Tai nghe
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-tai-nghe_1.png"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Màn hình
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-man-hinh.png"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              TiVi
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-man-hinh.png"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Đồng hồ thông minh
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/icons/category/cate-451.svg"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Loa
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/c/a/cate-loa_1.png"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Đồ gia dụng
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/icons/category/cate-846.svg"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Cáp sạc
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/icons/category/cate-114.svg"
              alt=""
            />
          </div>
          <div className="bg-primary rounded-lg w-32 h-32 shadow-lg p-1">
            <p className="absolute p-1 w-32 text-white text-sm font-bold">
              Sạc dự phòng
            </p>
            <img
              className="w-full  h-full object-contain"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/icons/category/cate-122.svg"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* THƯƠNG HIỆU */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-3xl font-medium text-black">THƯƠNG HIỆU</p>
          </div>
        </div>
        <div className="grid grid-cols-4 container-custom gap-4">
          <img
            className="rounded-lg shadow-xl"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/apple-chinh-hang-home.jpg"
            alt=""
          />
          <img
            className="rounded-lg shadow-xl"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/SIS%20asus.png"
            alt=""
          />
          <img
            className="rounded-lg shadow-xl"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/gian-hang-samsung-home.png"
            alt=""
          />
          <img
            className="rounded-lg shadow-xl"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/xiaomi.png"
            alt=""
          />
        </div>
      </section>
    </>
  );
}

export default Home;
