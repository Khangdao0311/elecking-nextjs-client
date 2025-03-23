"use client";

import { Fragment, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaCircleUser, FaUser } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Grid } from "swiper/modules";

import config from "@/app/config";
import { useStore } from "@/app/store";
import SidebarAccount from "@/app/components/client/SidebarAccount";
import ProductLoad from "@/app/components/client/ProductLoad";
import Product from "@/app/components/client/Product";
import * as productServices from "@/app/services/productService";
import * as categoryServices from "@/app/services/categoryService";
import * as brandServices from "@/app/services/brandService";
import { TbMoodEmpty } from "react-icons/tb";
import { BsCardImage } from "react-icons/bs";

function AccountHome() {
  const [state, dispatch] = useStore();
  const [productsSale, setProductsSale] = useState<IProduct[]>([]);
  const [productsWish, setProductsWish] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

  useEffect(() => {
    const query = { orderby: "sale-desc", limit: 4 };
    productServices.getQuery(query).then((res) => setProductsSale(res.data));
  }, []);

  useEffect(() => {
    categoryServices
      .getQuery({ limit: 0, orderby: "id-asc" })
      .then((res) => setCategories(res.data));
    brandServices.getQuery({ limit: 0, orderby: "id-asc" }).then((res) => setBrands(res.data));
  }, []);

  useEffect(() => {
    async function _() {
      if (state.cart.length) {
        const _: IProduct[] = [];
        for (const id of state.wish) {
          await productServices.getProById(id).then((res: any) => {
            _.push(res.data);
          });
        }
        setProductsWish(_);
      }
    }
    _();
  }, [state.cart]);

  return (
    <>
      <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 bg">
        <div className="w-3/12 bg-slate-50 rounded-xl p-4">
          <SidebarAccount />
        </div>
        <div className="w-9/12 flex flex-col gap-6 rounded-xl min-h-[calc(100vh-190px)]">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
              {state?.user?.avatar ? (
                <img src={state?.user?.avatar} alt="Avatar" className="w-full h-full " />
              ) : (
                <FaCircleUser className=" text-gray-400 w-full h-full" />
              )}
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-3xl uppercase font-bold">{state?.user?.fullname || "Họ Và Tên"}</p>
              <p className="text-lgm font-semibold">0976232323</p>
            </div>
          </div>
          <section className="w-full bg-gradient-to-r from-primaryDark to-primary p-4 flex flex-col gap-4 rounded-lg">
            <div className="container-custom  md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
              <div className="flex gap-1.5 ">
                <ImFire className="w-8 h-8 text-white" />
                <p className="text-3xl font-bold text-white uppercase">HOT SALE</p>
              </div>
              <Link
                href={`${config.routes.client.products}?orderby=sale-decs`}
                className="flex gap-1 items-center cursor-pointer relative group "
              >
                <em className="text-white text-sm font-base px-1">Xem tất cả </em>
                <hr className="w-[0%] group-hover:w-[100%] transition-all duration-300 border-white absolute bottom-0" />
              </Link>
            </div>
            <div className="grid grid-cols-4 container-custom gap-2.5">
              {productsSale.length === 0 &&
                Array.from({ length: 4 }).map((_, i: number) => (
                  <Fragment key={i}>
                    <ProductLoad />
                  </Fragment>
                ))}
              {productsSale.map((product: IProduct) => (
                <Fragment key={product.id}>
                  <Product product={product} />
                </Fragment>
              ))}
            </div>
          </section>
          <section className="container-custom flex flex-col gap-4 ">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-thirdaryDark to-thirdary">
              Sản Phẩm Bạn Yêu Thích
            </p>
            <div className="grid grid-cols-4 container-custom gap-2.5">
              {state.load &&
                Array.from({ length: 4 }).map((_, i: number) => (
                  <Fragment key={i}>
                    <ProductLoad />
                  </Fragment>
                ))}
              {!state.load && productsWish.length === 0 && (
                <div className="w-full min-h-80 center-flex flex-col gap-2 col-span-5">
                  <TbMoodEmpty className="w-36 h-36 text-gray-300" />
                  <p className="text-3xl text-gray-400 font-medium">
                    Bạn chưa yêu thích sản phẩm nào hết
                  </p>
                </div>
              )}
              {productsWish.map((product: IProduct) => (
                <Fragment key={product.id}>
                  <Product product={product} />
                </Fragment>
              ))}
            </div>
          </section>
          <section className="container-custom flex flex-col gap-4 ">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-thirdaryDark to-thirdary">
              Danh Mục
            </p>
            <div className="flex flex-wrap container-custom gap-2">
              {categories.length === 0 &&
                Array.from({ length: 7 }).map((_, i: number) => (
                  <div
                    key={i}
                    className="relative bg-white border border-gray-200 rounded-lg w-32 h-32 shadow-lg p-2 flex flex-col gap-2"
                  >
                    <div className="relative bg-gray-200 rounded shadow !w-full !h-1/5 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                                w-full h-full animate-[shimmer_1.5s_infinite]"
                      ></div>
                    </div>
                    <div className="relative center-flex bg-gray-200 rounded-lg shadow !w-full h-4/5 aspect-square overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                                w-full h-full animate-[shimmer_1.5s_infinite]"
                      ></div>
                      <BsCardImage className="!w-16 !h-16 text-gray-300 " />
                    </div>
                  </div>
                ))}
              {categories.map((category: ICategory, iCategory: number) => (
                <Link
                  href={`${config.routes.client.products}?categoryid=${category.id}`}
                  key={iCategory}
                  className="relative bg-primary rounded-lg w-28 h-28 shadow-lg p-1 hover:scale-110 hover:shadow-2xl transition-all duration-200"
                >
                  <p className="p-1 w-full absolute text-white text-sm font-bold">
                    {category.name}
                  </p>
                  <img className="w-full h-full  pt-8 object-contain" src={category.image} alt="" />
                </Link>
              ))}
            </div>
          </section>
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
                spaceBetween={10}
                slidesPerView={3}
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
                modules={[Autoplay, Navigation]}
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
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default AccountHome;
