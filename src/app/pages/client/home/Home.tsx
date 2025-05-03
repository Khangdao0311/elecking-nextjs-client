"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import { ImFire } from "react-icons/im";
import { Fragment, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import config from "@/app/config";
import { useStore, actions } from "@/app/store";
import * as categoryServices from "@/app/services/categoryService";
import * as brandServices from "@/app/services/brandService";
import * as productServices from "@/app/services/productService";
import ProductLoad from "@/app/components/client/ProductLoad";
import Product from "@/app/components/client/Product";
import Shimmer from "@/app/components/client/Shimmer";
import images from "@/app/assets";

const imageSlide = [
  images.slide1,
  images.slide2,
  images.slide3,
  images.slide4,
  images.slide5,
  images.slide6,
];

const imageBanner = [images.banner1, images.banner2, images.banner3];

function Home() {
  const [state, dispatch] = useStore();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [productsSale, setProductsSale] = useState([]);
  const [productsHot, setProductsHot] = useState([]);
  const [productsLaptop, setProductsLaptop] = useState([]);
  const [productsTablet, setProductsTablet] = useState([]);
  const [productsheadPhone, setProductsHeadPhone] = useState([]);
  const [productsWatch, setProductsWatch] = useState([]);

  useEffect(() => {
    categoryServices.getQuery({ limit: 0, orderby: "id-asc", status: 1 }).then((res) => {
      if (res.status === 200) setCategories(res.data);
    });

    brandServices.getQuery({ limit: 0, orderby: "id-asc", status: 1 }).then((res) => {
      if (res.status === 200) setBrands(res.data);
    });

    productServices.getQuery({ orderby: "sale-desc", limit: 16 }).then((res) => {
      if (res.status === 200) setProductsSale(res.data);
    });

    productServices.getQuery({ orderby: "view-desc", limit: 16 }).then((res) => {
      if (res.status === 200) setProductsHot(res.data);
    });

    productServices
      .getQuery({
        categoryid: "67b6cf1a3a893726b5398576-67b6cf1a3a893726b5398577-67b6cf1a3a893726b5398578",
        limit: 16,
      })
      .then((res) => {
        if (res.status === 200) setProductsLaptop(res.data);
      });

    productServices
      .getQuery({
        categoryid: "67b6cf1a3a893726b5398575-67b6cf1a3a893726b5398574",
        limit: 16,
      })
      .then((res) => {
        if (res.status === 200) setProductsTablet(res.data);
      });

    productServices
      .getQuery({
        categoryid: "67b6cf1a3a893726b5398579-67b6cf1a3a893726b539857a",
        limit: 16,
      })
      .then((res) => {
        if (res.status === 200) setProductsHeadPhone(res.data);
      });
    productServices
      .getQuery({
        categoryid: "67b6cf1a3a893726b539857b",
        limit: 16,
      })
      .then((res) => {
        if (res.status === 200) setProductsWatch(res.data);
      });
  }, []);

  return (
    <>
      {/* Slide */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0  flex flex-col gap-4">
        {state.load ? (
          <Fragment>
            <Shimmer image className={`w-full  aspect-[3/1]`} />
            <div className="hidden md:grid grid-cols-3 gap-4">
              <Shimmer image className={`w-full h-36`} />
              <Shimmer image className={`w-full h-36`} />
              <Shimmer image className={`w-full h-36`} />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Swiper
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              loop={true}
              modules={[Autoplay, Navigation]}
              className="!aspect-[3/1] w-full relative group/container rounded-lg shadow-xl border border-gray-300"
            >
              {imageSlide.map((e, index) => (
                <SwiperSlide className="h-full" key={index + 1}>
                  <img className="w-full h-full object-cover" src={e} alt="" />
                </SwiperSlide>
              ))}
              <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover/container:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
                <FaAngleLeft className="w-8 h-8 text-white" />
              </button>
              <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover/container:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
                <FaAngleRight className="w-8 h-8 text-white" />
              </button>
            </Swiper>
            <div className="hidden md:grid grid-cols-3 gap-4">
              {imageBanner.map((image, index) => (
                <div
                  key={index}
                  className="!aspect-[3/1] rounded-lg shadow-lg overflow-hidden border border-gray-300"
                >
                  <img className="w-full h-full" src={image} alt="Banner" />
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </section>

      {/* Product Sale */}
      <section className="w-full bg-gradient-to-r from-primaryDark to-primary py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <ImFire className="w-12 h-12 text-white" />
            <p className="text-4xl font-bold text-white">HOT SALE</p>
          </div>
          <Link
            onClick={() => dispatch(actions.set_routing(true))}
            href={`${config.routes.client.products}?orderby=sale-desc`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-white text-sm font-base px-1">Xem tất cả </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-white absolute bottom-0" />
          </Link>
        </div>

        {state.load || productsSale.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container-custom gap-2.5">
            <ProductLoad />
            <ProductLoad />
            <div className="hidden md:flex">
              <ProductLoad />
            </div>
            <div className="hidden lg:flex">
              <ProductLoad />
            </div>
            <div className="hidden xl:flex">
              <ProductLoad />
            </div>
          </div>
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            // loop={true}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            className=" w-full relative group/container container-custom"
          >
            {productsSale.map((product: IProduct) => (
              <SwiperSlide key={product.id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
            <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover/container:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
              <FaAngleLeft className="w-8 h-8 text-white" />
            </button>
            <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover/container:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
              <FaAngleRight className="w-8 h-8 text-white" />
            </button>
          </Swiper>
        )}
      </section>

      {/* Promot*/}
      {/* <section className="hidden md:flex container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        {state.load ? (
          <Shimmer image className={`w-full h-20`} />
        ) : (
          <img
            className="w-full rounded-lg borer border-gray-200 shadow-lg"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:1200:75/q:90/plain/https://dashboard.cellphones.com.vn/storage/s-edu-2-0-special-desk.gif"
            alt=""
          />
        )}
      </section> */}

      {/* Sản Phẩm Nổi Bật */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary line-clamp-1">
              SẢN PHẨM NỔI BẬT NHẤT
            </p>
          </div>
          <Link
            onClick={() => dispatch(actions.set_routing(true))}
            href={`${config.routes.client.products}?orderby=view-desc`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-gray-700 text-sm font-base px-1 text-nowrap shrink-0">
              Xem tất cả{" "}
            </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-gray-700 absolute bottom-0" />
          </Link>
        </div>
        {state.load || productsHot.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container-custom gap-2.5">
            <ProductLoad />
            <ProductLoad />
            <div className="hidden md:flex">
              <ProductLoad />
            </div>
            <div className="hidden lg:flex">
              <ProductLoad />
            </div>
            <div className="hidden xl:flex">
              <ProductLoad />
            </div>
          </div>
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            // loop={true}
            modules={[Autoplay, Navigation, Grid]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              640: {
                slidesPerView: 2,

                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
            }}
            className=" w-full relative group/container container-custom"
          >
            {productsSale.map((product: IProduct) => (
              <SwiperSlide key={product.id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
            <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover/container:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
              <FaAngleLeft className="w-8 h-8 text-white" />
            </button>
            <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover/container:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
              <FaAngleRight className="w-8 h-8 text-white" />
            </button>
          </Swiper>
        )}
      </section>

      {/* Điện Thoại, Máy Tính Bảng */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary line-clamp-1">
              ĐIỆN THOẠI, MÁY TÍNH BẢNG
            </p>
          </div>
          <Link
            onClick={() => dispatch(actions.set_routing(true))}
            href={`${config.routes.client.products}?categoryid=67b6cf1a3a893726b5398575-67b6cf1a3a893726b5398574`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-gray-700 text-sm font-base px-1 text-nowrap shrink-0">
              Xem tất cả{" "}
            </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-gray-700 absolute bottom-0" />
          </Link>
        </div>
        {state.load || productsTablet.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container-custom gap-2.5">
            <ProductLoad />
            <ProductLoad />
            <div className="hidden md:flex">
              <ProductLoad />
            </div>
            <div className="hidden lg:flex">
              <ProductLoad />
            </div>
            <div className="hidden xl:flex">
              <ProductLoad />
            </div>
          </div>
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            // loop={true}
            modules={[Autoplay, Navigation, Grid]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              640: {
                slidesPerView: 2,

                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
            }}
            className=" w-full relative group/container container-custom"
          >
            {productsTablet.map((product: IProduct) => (
              <SwiperSlide key={product.id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
            <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover/container:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
              <FaAngleLeft className="w-8 h-8 text-white" />
            </button>
            <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover/container:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
              <FaAngleRight className="w-8 h-8 text-white" />
            </button>
          </Swiper>
        )}
      </section>

      {/* LAPTOP, MÀN HÌNH, TIVI */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary line-clamp-1">
              LAPTOP, MÀN HÌNH, TIVI
            </p>
          </div>
          <Link
            onClick={() => dispatch(actions.set_routing(true))}
            href={`${config.routes.client.products}?categoryid=67b6cf1a3a893726b5398576-67b6cf1a3a893726b5398577-67b6cf1a3a893726b5398578`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-gray-700 text-sm font-base px-1 text-nowrap shrink-0">
              Xem tất cả{" "}
            </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-gray-700 absolute bottom-0" />
          </Link>
        </div>
        {state.load || productsLaptop.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container-custom gap-2.5">
            <ProductLoad />
            <ProductLoad />
            <div className="hidden md:flex">
              <ProductLoad />
            </div>
            <div className="hidden lg:flex">
              <ProductLoad />
            </div>
            <div className="hidden xl:flex">
              <ProductLoad />
            </div>
          </div>
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            // loop={true}
            modules={[Autoplay, Navigation, Grid]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              640: {
                slidesPerView: 2,

                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
            }}
            className=" w-full relative group/container container-custom"
          >
            {productsLaptop.map((product: IProduct) => (
              <SwiperSlide key={product.id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
            <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover/container:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
              <FaAngleLeft className="w-8 h-8 text-white" />
            </button>
            <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover/container:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
              <FaAngleRight className="w-8 h-8 text-white" />
            </button>
          </Swiper>
        )}
      </section>

      {/* TAI NGHE, LOA */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary line-clamp-1">
              TAI NGHE, LOA
            </p>
          </div>
          <Link
            onClick={() => dispatch(actions.set_routing(true))}
            href={`${config.routes.client.products}?categoryid=67b6cf1a3a893726b5398579-67b6cf1a3a893726b539857a`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-gray-700 text-sm font-base px-1 text-nowrap shrink-0">
              Xem tất cả{" "}
            </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-gray-700 absolute bottom-0" />
          </Link>
        </div>
        {state.load || productsheadPhone.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container-custom gap-2.5">
            <ProductLoad />
            <ProductLoad />
            <div className="hidden md:flex">
              <ProductLoad />
            </div>
            <div className="hidden lg:flex">
              <ProductLoad />
            </div>
            <div className="hidden xl:flex">
              <ProductLoad />
            </div>
          </div>
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            // loop={true}
            modules={[Autoplay, Navigation, Grid]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              640: {
                slidesPerView: 2,

                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
            }}
            className=" w-full relative group/container container-custom"
          >
            {productsheadPhone.map((product: IProduct) => (
              <SwiperSlide key={product.id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
            <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover/container:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
              <FaAngleLeft className="w-8 h-8 text-white" />
            </button>
            <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover/container:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
              <FaAngleRight className="w-8 h-8 text-white" />
            </button>
          </Swiper>
        )}
      </section>

      {/* ĐỒNG HỒ THÔNG MINH */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary line-clamp-1">
              ĐỒNG HỒ THÔNG MINH
            </p>
          </div>
          <Link
            onClick={() => dispatch(actions.set_routing(true))}
            href={`${config.routes.client.products}?categoryid=67b6cf1a3a893726b5398579-67b6cf1a3a893726b539857a`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-gray-700 text-sm font-base px-1 text-nowrap shrink-0">
              Xem tất cả{" "}
            </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-gray-700 absolute bottom-0" />
          </Link>
        </div>
        {state.load || productsWatch.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container-custom gap-2.5">
            <ProductLoad />
            <ProductLoad />
            <div className="hidden md:flex">
              <ProductLoad />
            </div>
            <div className="hidden lg:flex">
              <ProductLoad />
            </div>
            <div className="hidden xl:flex">
              <ProductLoad />
            </div>
          </div>
        ) : (
          <Swiper
            slidesPerView={5}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            // loop={true}
            modules={[Autoplay, Navigation, Grid]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              640: {
                slidesPerView: 2,

                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
                grid: { rows: 2, fill: "row" },
              },
            }}
            className=" w-full relative group/container container-custom"
          >
            {productsWatch.map((product: IProduct) => (
              <SwiperSlide key={product.id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
            <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover/container:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
              <FaAngleLeft className="w-8 h-8 text-white" />
            </button>
            <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover/container:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
              <FaAngleRight className="w-8 h-8 text-white" />
            </button>
          </Swiper>
        )}
      </section>

      {/* DANH MỤC */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary line-clamp-1">
              DANH MỤC
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 flex-wrap container-custom gap-3.5">
          {state.load || categories.length === 0 ? (
            <>
              <div className="relative bg-white border border-gray-200 rounded-lg aspect-square shadow-lg p-2 flex flex-col gap-2">
                <Shimmer className={`!w-full !h-1/5`} />
                <Shimmer image className={`!w-full h-4/5`} />
              </div>
              <div className="relative bg-white border border-gray-200 rounded-lg aspect-square shadow-lg p-2 flex flex-col gap-2">
                <Shimmer className={`!w-full !h-1/5`} />
                <Shimmer image className={`!w-full h-4/5`} />
              </div>
              <div className="relative bg-white border border-gray-200 rounded-lg aspect-square shadow-lg p-2 flex flex-col gap-2">
                <Shimmer className={`!w-full !h-1/5`} />
                <Shimmer image className={`!w-full h-4/5`} />
              </div>
              <div className="hidden sm:flex relative bg-white border border-gray-200 rounded-lg aspect-square shadow-lg p-2 flex-col gap-2">
                <Shimmer className={`!w-full !h-1/5`} />
                <Shimmer image className={`!w-full h-4/5`} />
              </div>
              <div className="hidden md:flex relative bg-white border border-gray-200 rounded-lg aspect-square shadow-lg p-2 flex-col gap-2">
                <Shimmer className={`!w-full !h-1/5`} />
                <Shimmer image className={`!w-full h-4/5`} />
              </div>
              <div className="hidden md:flex relative bg-white border border-gray-200 rounded-lg aspect-square shadow-lg p-2 flex-col gap-2">
                <Shimmer className={`!w-full !h-1/5`} />
                <Shimmer image className={`!w-full h-4/5`} />
              </div>
              <div className="hidden lg:flex relative bg-white border border-gray-200 rounded-lg aspect-square shadow-lg p-2 flex-col gap-2">
                <Shimmer className={`!w-full !h-1/5`} />
                <Shimmer image className={`!w-full h-4/5`} />
              </div>
              <div className="hidden xl:flex relative bg-white border border-gray-200 rounded-lg aspect-square shadow-lg p-2 flex-col gap-2">
                <Shimmer className={`!w-full !h-1/5`} />
                <Shimmer image className={`!w-full h-4/5`} />
              </div>
            </>
          ) : (
            categories.map((category: ICategory, iCategory: number) => (
              <Link
                onClick={() => dispatch(actions.set_routing(true))}
                href={`${config.routes.client.products}?categoryid=${category.id}`}
                key={iCategory}
                className="relative bg-primary rounded-lg aspect-square shadow-lg p-1 hover:scale-110 hover:shadow-2xl transition-all duration-200"
              >
                <p className="p-1 w-full absolute text-white text-sm font-bold">{category.name}</p>
                <img className="w-full h-full  pt-8 object-contain" src={category.image} alt="" />
              </Link>
            ))
          )}
        </div>
      </section>

      {/* THƯƠNG HIỆU */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary line-clamp-1">
              THƯƠNG HIỆU
            </p>
          </div>
        </div>

        {state.load || brands.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container-custom gap-4 !h-36">
            <Shimmer image className={`!w-full h-full`} />
            <div className="hidden sm:flex">
              <Shimmer image className={`!w-full h-full`} />
            </div>
            <div className="hidden md:flex">
              <Shimmer image className={`!w-full h-full`} />
            </div>
            <div className="hidden lg:flex">
              <Shimmer image className={`!w-full h-full`} />
            </div>
          </div>
        ) : (
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop
            navigation={{
              nextEl: ".custom-next-banner",
              prevEl: ".custom-prev-banner",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
            modules={[Autoplay, Navigation]}
            className="!h-36 w-full relative group/container overflow-auto"
          >
            {brands.map((brand: IBrand, iBrand: number) => (
              <SwiperSlide key={iBrand} className="overflow-hidden rounded-lg shadow-xl">
                <Link
                  onClick={() => dispatch(actions.set_routing(true))}
                  href={`${config.routes.client.products}?brandid=${brand.id}`}
                  className="h-36 select-none "
                >
                  <img
                    className="w-full h-full object-cover"
                    src={brand.banner}
                    alt={`Banner ${brand.name}`}
                  />
                </Link>
              </SwiperSlide>
            ))}
            <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover/container:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
              <FaAngleLeft className="w-8 h-8 text-white" />
            </button>
            <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover/container:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
              <FaAngleRight className="w-8 h-8 text-white" />
            </button>
          </Swiper>
        )}
      </section>
    </>
  );
}

export default Home;
