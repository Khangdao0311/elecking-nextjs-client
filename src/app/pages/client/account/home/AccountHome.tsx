"use client";

import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaUser } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import config from "@/app/config";
import { actions, useStore } from "@/app/store";
import ProductLoad from "@/app/components/client/ProductLoad";
import Product from "@/app/components/client/Product";
import * as productServices from "@/app/services/productService";
import * as categoryServices from "@/app/services/categoryService";
import * as brandServices from "@/app/services/brandService";
import { TbMoodEmpty } from "react-icons/tb";
import { BsCardImage } from "react-icons/bs";
import Shimmer from "@/app/components/client/Shimmer";

function AccountHome() {
  const [state, dispatch] = useStore();
  const [productsSale, setProductsSale] = useState<IProduct[]>([]);
  const [productsWish, setProductsWish] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

  useEffect(() => {
    const query = { orderby: "sale-desc", limit: 10 };
    productServices.getQuery(query).then((res) => {
      if (res.status === 200) setProductsSale(res.data);
    });
    categoryServices.getQuery({ limit: 0, orderby: "id-asc" }).then((res) => {
      if (res.status === 200) setCategories(res.data);
    });
    brandServices.getQuery({ limit: 0, orderby: "id-asc" }).then((res) => {
      if (res.status === 200) setBrands(res.data);
    });
  }, []);

  useEffect(() => {
    (async function () {
      const _: IProduct[] = [];
      if (state.wish.length || !productsWish.length) {
        for (const id of state.wish) {
          await productServices.getProById(id).then((res: any) => {
            if (res.status === 200) _.push(res.data);
          });
        }
      }
      setProductsWish(_);
    })();
  }, [state.wish]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-1/5 max-w-40 aspect-square border-2 border-primary rounded-full overflow-hidden shadow-xl center-flex">
            {state?.user?.avatar ? (
              <img src={state?.user?.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <FaUser className=" text-gray-400 w-1/2 h-1/2" />
            )}
          </div>
          <div className="flex items-start flex-col gap-2.5 w-fulls">
            <p className=" text-lg sm:text-2xl uppercase font-bold px-4 sm:px-10 py-1 sm:py-2 border-2 border-primary rounded-lg">
              {state?.user?.fullname || "Họ Và Tên"}
            </p>
            <p className="text-xs sm:text-base text-gray-700 font-medium px-2.5 sm:px-6 py-1 border border-primary rounded sm:rounded-lg">
              {state?.user?.email || "Email"}
            </p>
          </div>
        </div>
        {/* HOT SALE */}
        <section className="w-full bg-gradient-to-r from-primaryDark to-primary p-2 pt-4 md:p-4  flex flex-col gap-4 rounded-lg">
          <div className="container-custom  md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
            <div className="flex gap-1.5 ">
              <ImFire className="w-8 h-8 text-white" />
              <p className="text-3xl font-bold text-white uppercase">HOT SALE</p>
            </div>
            <Link
              onClick={() => dispatch(actions.set_routing(true))}
              href={`${config.routes.client.products}?orderby=sale-decs`}
              className="flex gap-1 items-center cursor-pointer relative group "
            >
              <em className="text-white text-sm font-base px-1">Xem tất cả </em>
              <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-white absolute bottom-0" />
            </Link>
          </div>
          {state.load && productsSale.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              <ProductLoad />
              <ProductLoad />
              <div className="hidden md:flex">
                <ProductLoad />
              </div>
            </div>
          ) : (
            <Swiper
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
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1280: {
                  slidesPerView: 3.5,
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
        {/* SẢN PHẨM YÊU THÍCH */}
        <section className="container-custom flex flex-col gap-4 ">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-thirdaryDark to-thirdary">
            Sản Phẩm Bạn Yêu Thích
          </p>
          {!state.load && productsWish.length === 0 && (
            <div className="w-full min-h-72 center-flex flex-col gap-2 col-span-5">
              <TbMoodEmpty className="w-36 h-36 text-gray-300" />
              <p className="text-3xl text-center text-gray-400 font-medium">
                Bạn chưa yêu thích sản phẩm nào hết
              </p>
            </div>
          )}
          {state.load && productsWish.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              <ProductLoad />
              <ProductLoad />
              <div className="hidden md:flex">
                <ProductLoad />
              </div>
            </div>
          ) : (
            <Swiper
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
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1280: {
                  slidesPerView: 3.5,
                  spaceBetween: 10,
                },
              }}
              className=" w-full relative group/container container-custom"
            >
              {productsWish.map((product: IProduct) => (
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
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primaryDark to-primary line-clamp-1">
                DANH MỤC
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 flex-wrap container-custom gap-3.5">
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
                  <p className="p-1 w-full absolute text-white text-sm font-bold">
                    {category.name}
                  </p>
                  <img className="w-full h-full  pt-8 object-contain" src={category.image} alt="" />
                </Link>
              ))
            )}
          </div>
        </section>
        {/* THƯƠNG HIỆU */}
        <section className="container-custom flex flex-col gap-4 ">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-thirdaryDark to-thirdary">
            Thương Hiệu
          </p>

          {categories.length === 0 && (
            <div className="grid grid-cols-3 container-custom gap-4 !h-36">
              {Array.from({ length: 3 }).map((_, i: number) => (
                <div
                  key={i}
                  className="relative center-flex bg-gray-200 rounded-lg shadow !w-full h-full aspect-square overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                        w-full h-full animate-[shimmer_1.5s_infinite]"
                  ></div>
                  <BsCardImage className="!w-16 !h-16 text-gray-300 " />
                </div>
              ))}
            </div>
          )}
          {categories.length !== 0 && (
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop
              breakpoints={{
                0: {
                  slidesPerView: 1,
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
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              navigation={{
                nextEl: ".custom-next-banner",
                prevEl: ".custom-prev-banner",
              }}
              modules={[Autoplay, Navigation]}
              className="!h-36 w-full relative group overflow-auto"
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
              <button className="custom-prev-banner absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10 group-hover:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
                <FaAngleLeft className="w-8 h-8 text-white" />
              </button>
              <button className="custom-next-banner absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10 group-hover:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
                <FaAngleRight className="w-8 h-8 text-white" />
              </button>
            </Swiper>
          )}
        </section>
      </div>
    </>
  );
}

export default AccountHome;
