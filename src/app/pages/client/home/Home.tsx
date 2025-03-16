"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Grid } from "swiper/modules";
import { ImFire } from "react-icons/im";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Product from "@/app/components/client/Product";

import config from "@/app/config";
import * as productServices from "@/app/services/productService";
import * as categoryServices from "@/app/services/categoryService";
import * as brandServices from "@/app/services/brandService";
import * as userServices from "@/app/services/userService";

const imageSlide = [
  "https://mainguyen.sgp1.digitaloceanspaces.com/231474/banner-samsung.jpg",
  "https://www.homecredit.vn/static/cdf3446968e365f4f8fbc9266010e77a/ab7c8/mua_tra_gop_iphone_16_banner_74273b74f0.webp",
  "https://mainguyen.sgp1.digitaloceanspaces.com/231652/MASS-Pre-Order---Galaxy-Watch6-Combo-KV--.jpg",
  "https://cuonganhpc.vn/hinhanh/quangcao/man-hinh-1.jpg",
  "https://phonghoa.vn/wp-content/uploads/2023/09/Banner-CTKM-TV.png",
  "https://www.homepaylater.vn/static/b551d25f15763d30e744f2e3cf7eb8e4/dong_ho_thong_minh_banner_518c452056.jpg",
];
import "bootstrap-icons/font/bootstrap-icons.css";

function Home() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [load, setLoad] = useState<Boolean>(false);

  useEffect(() => {
    categoryServices
      .getQuery({ limit: 0, orderby: "id-asc" })
      .then((res) => setCategories(res.data));
    brandServices.getQuery({ limit: 0, orderby: "id-asc" }).then((res) => setBrands(res.data));
  }, []);

  // Lấy Sản Phẩm Sale
  const [productSale, setProductSale] = useState([]);
  useEffect(() => {
    const query = { orderby: "sale-desc" };
    productServices.getQuery(query).then((res) => setProductSale(res.data));
  }, []);

  // Lấy Sản Phẩm Hot
  const [productHot, setProductHot] = useState([]);
  useEffect(() => {
    const query = { orderby: "view-desc" };
    productServices.getQuery(query).then((res) => setProductHot(res.data));
  }, []);

  // Lấy Sản Phẩm theo danh mục laptop
  const [productLaptop, setProductLaptop] = useState([]);
  useEffect(() => {
    const query = {
      categoryid: "67b6cf1a3a893726b5398576-67b6cf1a3a893726b5398577-67b6cf1a3a893726b5398578",
      limit: 10,
    };
    productServices.getQuery(query).then((res) => setProductLaptop(res.data));
  }, []);

  // Lấy Sản Phẩm theo danh mục máy tính bảng
  const [productTablet, setProductTablet] = useState([]);
  useEffect(() => {
    const query = {
      categoryid: "67b6cf1a3a893726b5398575-67b6cf1a3a893726b5398574",
      limit: 10,
    };
    productServices.getQuery(query).then((res) => setProductTablet(res.data));
  }, []);

  // Lấy Sản Phẩm theo danh mục tai nghe
  const [headPhone, setHeadPhone] = useState([]);
  useEffect(() => {
    const query = {
      categoryid: "67b6cf1a3a893726b5398579-67b6cf1a3a893726b539857a",
      limit: 10,
    };
    productServices.getQuery(query).then((res) => setHeadPhone(res.data));
  }, []);

  const [userId, setUserId] = useState<string>("");
  const [wish, setwish] = useState<string[]>([]);

  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON!);

    if (user) {
      userServices.getById(user.id).then((res) => {
        setUserId(res.data.id);
        setwish(res.data.wish);
      });
    }
  }, [load]);

  return (
    <>
      {/* Slide */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 ">
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="!h-96 w-full relative group rounded-lg shadow-xl border border-gray-300"
        >
          {imageSlide.map((e, index) => (
            <SwiperSlide className="h-full" key={index + 1}>
              <img className="w-full h-full object-cover" src={e} alt="" />
            </SwiperSlide>
          ))}
          <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
            <FaAngleLeft className="w-8 h-8 text-white" />
          </button>
          <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
            <FaAngleRight className="w-8 h-8 text-white" />
          </button>
        </Swiper>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="h-36 rounded-lg shadow-lg overflow-hidden border border-gray-300">
            <img
              className="w-full h-full"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/m55-9190-9-3-25-right-banner.png"
              alt="Banner"
            />
          </div>
          <div className="h-36 rounded-lg shadow-lg overflow-hidden border border-gray-300">
            <img
              className="w-full h-full"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-imac-m4-30-12.jpg"
              alt="Banner"
            />
          </div>
          <div className="h-36 rounded-lg shadow-lg overflow-hidden border border-gray-300">
            <img
              className="w-full h-full"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/s-edu-2-0-right-laptop.jpg"
              alt="Banner"
            />
          </div>
        </div>
      </section>

      {/* Product Sale */}
      <section className="w-full bg-gradient-to-r from-primaryDark to-primary py-5">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <ImFire className="w-12 h-12 text-white" />
            <p className="text-4xl font-bold text-white">HOT SALE</p>
          </div>
          <Link
            href={`${config.routes.client.products}?orderby=sale-decs`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-white text-sm font-base px-1">Xem tất cả </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-white absolute bottom-0" />
          </Link>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
          {productSale.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product
                product={product}
                onLoad={() => setLoad((prev) => !prev)}
                userId={userId}
                wish={wish}
              />
            </Fragment>
          ))}
        </div>
      </section>

      {/* Promot*/}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <img
          className="w-full rounded-lg borer border-gray-200 shadow-lg"
          src="https://cdn2.cellphones.com.vn/insecure/rs:fill:1200:75/q:90/plain/https://dashboard.cellphones.com.vn/storage/s-edu-2-0-special-desk.gif"
          alt=""
        />
      </section>

      {/* Sản Phẩm Nổi Bật */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary">
              SẢN PHẨM NỔI BẬT NHẤT
            </p>
          </div>
          <Link
            href={`${config.routes.client.products}?orderby=view-desc`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-gray-700 text-sm font-base px-1">Xem tất cả </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-gray-700 absolute bottom-0" />
          </Link>
        </div>
        <div className="grid grid-cols-5 container-custom gap-4">
          {productHot.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product
                product={product}
                onLoad={() => setLoad((prev) => !prev)}
                userId={userId}
                wish={wish}
              />
            </Fragment>
          ))}
        </div>
      </section>

      {/* Điện Thoại, Máy Tính Bảng */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary">
              ĐiỆN THOẠI, MÁY TÍNH BẢNG
            </p>
          </div>
          <Link
            href={`${config.routes.client.products}?categoryid=67b6cf1a3a893726b5398576-67b6cf1a3a893726b5398577-67b6cf1a3a893726b5398578`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-gray-700 text-sm font-base px-1">Xem tất cả </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-gray-700 absolute bottom-0" />
          </Link>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
          {productTablet.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product
                product={product}
                onLoad={() => setLoad((prev) => !prev)}
                userId={userId}
                wish={wish}
              />
            </Fragment>
          ))}
        </div>
      </section>

      {/* LAPTOP, MÀN HÌNH, TIVI */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary">
              LAPTOP, MÀN HÌNH, TIVI
            </p>
          </div>
          <Link
            href={`${config.routes.client.products}?categoryid=67b6cf1a3a893726b5398575-67b6cf1a3a893726b5398574`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-gray-700 text-sm font-base px-1">Xem tất cả </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-gray-700 absolute bottom-0" />
          </Link>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
          {productLaptop.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product
                product={product}
                onLoad={() => setLoad((prev) => !prev)}
                userId={userId}
                wish={wish}
              />
            </Fragment>
          ))}
        </div>
      </section>

      {/* /*TAI NGHE, LOA */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary">
              TAI NGHE, LOA
            </p>
          </div>
          <Link
            href={`${config.routes.client.products}?categoryid=67b6cf1a3a893726b5398579-67b6cf1a3a893726b539857a`}
            className="flex gap-1 items-center cursor-pointer relative group "
          >
            <em className="text-gray-700 text-sm font-base px-1">Xem tất cả </em>
            <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-gray-700 absolute bottom-0" />
          </Link>
        </div>
        <div className="grid grid-cols-5 container-custom gap-2.5">
          {headPhone.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product
                product={product}
                onLoad={() => setLoad((prev) => !prev)}
                userId={userId}
                wish={wish}
              />
            </Fragment>
          ))}
        </div>
      </section>

      {/* DANH MỤC */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary">
              DANH MỤC
            </p>
          </div>
        </div>
        <div className="grid grid-cols-9 container-custom gap-3.5">
          {categories.map((category: ICategory, iCategory: number) => (
            <Link
              href={`${config.routes.client.products}?categoryid=${category.id}`}
              key={iCategory}
              className="relative bg-primary rounded-lg w-32 h-32 shadow-lg p-1 hover:scale-110 hover:shadow-2xl transition-all duration-200"
            >
              <p className="p-1 w-full absolute text-white text-sm font-bold">{category.name}</p>
              <img className="w-full h-full  pt-8 object-contain" src={category.image} alt="" />
            </Link>
          ))}
        </div>
      </section>

      {/* THƯƠNG HIỆU */}
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary">
              THƯƠNG HIỆU
            </p>
          </div>
        </div>
        <Swiper
          spaceBetween={16}
          slidesPerView={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-next-banner",
            prevEl: ".custom-prev-banner",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="!h-36 w-full relative group overflow-auto"
        >
          {brands.map((brand: IBrand, iBrand: number) => (
            <SwiperSlide key={iBrand} className="overflow-hidden rounded-lg shadow-xl">
              <Link
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
          <button className="custom-prev-banner absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
            <FaAngleLeft className="w-8 h-8 text-white" />
          </button>
          <button className="custom-next-banner absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
            <FaAngleRight className="w-8 h-8 text-white" />
          </button>
        </Swiper>
      </section>
    </>
  );
}

export default Home;
