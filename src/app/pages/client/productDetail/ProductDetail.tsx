"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useParams, useRouter } from "next/navigation";
import { Image, Modal, Pagination, Rate, Select } from "antd";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCircleCheck,
  FaCircleExclamation,
  FaCircleUser,
  FaHeart,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaRegStar,
} from "react-icons/fa6";
import { FaRegEdit, FaUserEdit } from "react-icons/fa";
import moment from "moment";
import { TbMoodEmpty } from "react-icons/tb";
import Cookies from "js-cookie";

import Product from "@/app/components/client/Product";
import * as productServices from "@/app/services/productService";
import * as authServices from "@/app/services/authService";
import * as reviewServices from "@/app/services/reviewService";
import ProductColor from "./components/ProductColor";
import ProductVariant from "./components/ProductVariant";
import config from "@/app/config";
import { useStore, actions } from "@/app/store";
import ProductLoad from "@/app/components/client/ProductLoad";
import Shimmer from "@/app/components/client/Shimmer";
import Loading from "@/app/components/client/Loading";

function ProductDetail() {
  const [state, dispatch] = useStore();
  const [mainSwiper, setMainSwiper] = useState<any>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const [indexSwiper, setIndexSwiper] = useState<any>(0);
  const [showModal, setShowModal] = useState(0);
  const [product, setProduct] = useState<IProduct>();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [totalsReviews, setTotalsReviews] = useState<any>();
  const [productsSame, setProductsSame] = useState<IProduct[]>([]);
  const [iVariant, setIVariant] = useState(-1);
  const [iColor, setIColor] = useState(-1);
  const [quantity, setQuantity] = useState(1);
  const [heightDescription, setHeightDescription] = useState("500px");
  const [rating, setRating] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { id }: any = useParams();

  const router = useRouter();

  useEffect(() => {
    productServices.viewUp(id);
    productServices.getProById(`${id}`).then((res) => {
      if (res.status === 200) {
        setProduct(res.data);
        outerLoop: for (let i = 0; i < res.data.variants.length; i++) {
          for (let j = 0; j < res.data.variants[i].colors.length; j++) {
            if (res.data.variants[i].colors[j].quantity > 0) {
              setIVariant(i);
              setIColor(j);
              break outerLoop; // Thoát hoàn toàn cả 2 vòng lặp
            }
          }
        }
      }
    });
    productServices.getSame({ id: id, limit: 5 }).then((res) => {
      if (res.status === 200) setProductsSame(res.data);
    });
  }, [id]);

  useEffect(() => {
    reviewServices
      .getQuery({ product_id: id, rating: rating, orderby: "id-desc", limit: 5, page: page })
      .then((res) => {
        if (res.status === 200) {
          setReviews(res.data);
          setTotalReviews(res.total);
          setTotalsReviews(res.totalReview);
        }
      });
  }, [id, rating, state.re_render, page]);

  function handleAddToCart() {
    setLoading(true);
    let isSame = false;

    const cartNew = state.cart.map((item: any) => {
      if (
        item.product.id === product?.id &&
        item.product.variant === iVariant &&
        item.product.color === iColor
      ) {
        isSame = true;
        return {
          ...item,
          quantity:
            item.quantity + +quantity > product!.variants[iVariant].colors[iColor].quantity
              ? product!.variants[iVariant].colors[iColor].quantity
              : item.quantity + +quantity,
        };
      }
      return item;
    });

    if (!isSame) {
      cartNew.push({
        product: {
          id: product?.id,
          variant: iVariant,
          color: iColor,
        },
        quantity:
          +quantity > product!.variants[iVariant].colors[iColor].quantity
            ? product!.variants[iVariant].colors[iColor].quantity
            : +quantity,
      });
    }

    (function callback() {
      authServices.cart(state.user.id, cartNew).then((res) => {
        setLoading(false);
        if (res.status === 200) {
          dispatch(actions.re_render());
          setShowModal(1);
          setTimeout(() => setShowModal(0), 1000);
        }
        if (res.status === 401) {
          const refreshToken = authServices.getRefreshToken();
          if (refreshToken) {
            authServices.getToken(refreshToken).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token", res.data);
                callback();
              } else {
                authServices.clearUser();
                router.push(config.routes.client.login);
                dispatch(actions.re_render());
              }
            });
          }
        }
      });
    })();
  }

  function handleAddToWish(id: string) {
    (function callback() {
      authServices.wish(state.user.id, id).then((res) => {
        if (res.status === 200) dispatch(actions.re_render());
        if (res.status === 401) {
          const refreshToken = authServices.getRefreshToken();
          if (refreshToken) {
            authServices.getToken(refreshToken).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token", res.data);
                callback();
              } else {
                authServices.clearUser();
                router.push(config.routes.client.login);
                dispatch(actions.re_render());
              }
            });
          }
        }
      });
    })();
  }

  function handleBuyNow() {
    const checkout = {
      order: [
        {
          product: {
            id: product?.id,
            variant: iVariant,
            color: iColor,
          },
          quantity: quantity,
        },
      ],
      voucher: null,
    };
    localStorage.setItem("checkout", JSON.stringify(checkout));
    setLoading(true);
    router.push(config.routes.client.checkout);
  }

  function handleRemoveFromWish(id: string) {
    (function callback() {
      authServices.wish(state.user.id, id).then((res) => {
        if (res.status === 200) dispatch(actions.re_render());
        if (res.status === 401) {
          const refreshToken = authServices.getRefreshToken();
          if (refreshToken) {
            authServices.getToken(refreshToken).then((res) => {
              if (res.status === 200) {
                Cookies.set("access_token", res.data);
                callback();
              } else {
                authServices.clearUser();
                router.push(config.routes.client.login);
                dispatch(actions.re_render());
              }
            });
          }
        }
      });
    })();
  }

  function handleAddToWishReview(id: string) {
    reviewServices.wish(id, state.user.id).then((res) => {
      if (res.status === 200) dispatch(actions.re_render());
    });
  }

  function handleRemoveFromWishReview(id: string) {
    reviewServices.wish(id, state.user.id).then((res) => {
      if (res.status === 200) dispatch(actions.re_render());
    });
  }

  return (
    <>
      {loading && <Loading />}
      <Modal
        open={!!showModal}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        closable={false}
        width="auto"
      >
        {showModal === 1 && (
          <div className="center-flex flex-col gap-4">
            <div>
              <FaCircleCheck className="w-20 h-20 text-green-500 " />
            </div>
            <div className="text-lg font-medium text-green-700">Thêm giỏ hàng thành công !</div>
          </div>
        )}
        {showModal === 2 && (
          <div className="center-flex flex-col gap-4">
            <div>
              <FaCircleExclamation className="w-20 h-20 text-red-500 " />
            </div>
            <div className="text-lg font-medium text-red-700">Thêm giỏ hàng thất bại !</div>
          </div>
        )}
      </Modal>
      {!state.load && product ? (
        <>
          {/* Chi tiết sản phẩm, giá và type */}
          <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 ">
            <div className="flex flex-wrap items-start gap-4">
              <p className="text-lg font-bold">{product?.name}</p>
              {product?.rating !== null && (
                <div className="center-flex gap-1">
                  <Rate
                    className="text-secondaryDark text-xl"
                    defaultValue={Math.ceil(product!.rating * 2) / 2}
                    allowHalf
                    disabled
                    characterRender={(char) => (
                      <span style={{ marginInlineEnd: "6px" }}>{char}</span>
                    )}
                  />
                  <span className="text-base  select-none">( {product?.rating} )</span>
                </div>
              )}
            </div>
            <hr className="my-4" />
            <div className="flex flex-col lg:flex-row gap-4">
              {/* hình ảnh */}
              <div className="w-full lg:w-6/12 xl:w-7/12 flex flex-col gap-4">
                <div className="w-full h-[365px] border border-gray-200 rounded-2xl relative overflow-hidden select-none shadow-lg">
                  <Image.PreviewGroup>
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
                      modules={[Autoplay, Navigation, Thumbs]}
                      thumbs={{ swiper: thumbsSwiper }}
                      className="!w-full !h-full group"
                      onSlideChangeTransitionEnd={(swiper) => setIndexSwiper(swiper.realIndex)} // Sử dụng `realIndex`
                      onSwiper={setMainSwiper}
                    >
                      <SwiperSlide className="center-flex">
                        <Image
                          className="w-full h-full object-contain"
                          src={
                            product.variants[iVariant === -1 ? 0 : iVariant].colors[
                              iColor === -1 ? 0 : iColor
                            ].image
                          }
                        />
                      </SwiperSlide>
                      {product?.images.map((img, index) => (
                        <SwiperSlide className="center-flex" key={index}>
                          <Image className="w-full h-full object-contain" src={img} />
                        </SwiperSlide>
                      ))}

                      <button
                        className={`custom-prev ${
                          !mainSwiper?.isBeginning ? "group-hover:left-0" : ""
                        }  absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -left-10  -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center `}
                      >
                        <FaAngleLeft className="w-8 h-8 text-white" />
                      </button>
                      <button
                        className={`custom-next ${
                          !mainSwiper?.isEnd ? "group-hover:right-0" : ""
                        }  absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 -right-10  -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center`}
                      >
                        <FaAngleRight className="w-8 h-8 text-white" />
                      </button>
                    </Swiper>
                  </Image.PreviewGroup>
                  <div className="absolute top-4 left-4 w-6 h6 z-20 cursor-pointer group">
                    {state.wish.includes(product.id) ? (
                      <div
                        className="relative "
                        onClick={() => {
                          if (state.user) {
                            handleRemoveFromWish(product.id);
                          } else {
                            dispatch(actions.set({ show: { ...state.show, login: true } }));
                          }
                        }}
                      >
                        <FaHeart className="w-full h-full text-primary group-hover:scale-125 transition-all duration-300" />
                        <FaHeart className="w-full h-full hidden absolute inset-0 animate-ping group-hover:block text-primary" />
                      </div>
                    ) : (
                      <div
                        className="relative"
                        onClick={() => {
                          if (state.user) {
                            handleAddToWish(product.id);
                          } else {
                            dispatch(actions.set({ show: { ...state.show, login: true } }));
                          }
                        }}
                      >
                        <FaRegHeart className="w-full h-full text-primary group-hover:scale-125 transition-all duration-300" />
                        <FaHeart className="w-full h-full hidden absolute inset-0 animate-ping group-hover:block text-primary" />
                      </div>
                    )}
                  </div>
                </div>
                {/* list image */}
                <Swiper
                  onSwiper={setThumbsSwiper}
                  watchSlidesProgress={true}
                  className="w-full !pb-4"
                  breakpoints={{
                    0: {
                      slidesPerView: 5.2,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 5.2,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 8.2,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 7.2,
                      spaceBetween: 10,
                    },
                    1280: {
                      slidesPerView: 8.2,
                      spaceBetween: 10,
                    },
                  }}
                >
                  <SwiperSlide
                    className={` ${
                      indexSwiper === 0 ? " border-2 border-primary" : "border border-gray-200 "
                    } !h-full !aspect-square rounded-lg overflow-hidden center-flex cursor-pointer shadow-lg`}
                  >
                    <FaRegStar className=" w-1/2 h-1/2 text-primary" />
                  </SwiperSlide>
                  {product?.images.map((img, index) => (
                    <SwiperSlide
                      key={index}
                      className={`border-2 ${
                        indexSwiper === index + 1
                          ? " border-2 border-primary"
                          : "border border-gray-200 "
                      } !h-full !aspect-square rounded-lg overflow-hidden cursor-pointer shadow-lg p-1 select-none`}
                    >
                      <img className=" w-full aspect-square object-cover rounded" src={img} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              {/* Chọn type */}
              <div className="w-full lg:w-6/12 xl:w-5/12">
                {/* variants */}
                <div className="grid grid-cols-2 sm:grid-cols-3 flex-wrap gap-2.5">
                  {product!.variants!.length > 1 &&
                    product?.variants?.map((variant, index) => (
                      <div key={index}>
                        <ProductVariant
                          disabled={!variant.colors.some((e) => e.quantity > 0)}
                          name={variant.properties.map((e) => e.name).join(" - ")}
                          price={variant.price - variant.price_sale}
                          checked={index == iVariant}
                          onClick={() => {
                            setIVariant(index);
                            setIColor(
                              variant.colors.findIndex((e: IProductColor) => e.quantity > 0)
                            );
                            mainSwiper?.slideTo(0);
                            setQuantity(
                              quantity >
                                product.variants[index].colors[
                                  variant.colors.findIndex((e: IProductColor) => e.quantity > 0)
                                ].quantity
                                ? product.variants[index].colors[
                                    variant.colors.findIndex((e: IProductColor) => e.quantity > 0)
                                  ].quantity
                                : quantity
                            );
                          }}
                        />
                      </div>
                    ))}
                </div>
                {/* colors */}
                <div className="flex flex-col">
                  <div className="py-4">Chọn màu để xem giá</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3  flex-wrap gap-2.5">
                    {product?.variants[iVariant === -1 ? 0 : iVariant]?.colors.map(
                      (color, index) => (
                        <div key={index}>
                          <ProductColor
                            disabled={color.quantity === 0}
                            image={color.image}
                            color={color.name}
                            price={
                              product.variants[iVariant === -1 ? 0 : iVariant].price -
                              product.variants[iVariant === -1 ? 0 : iVariant].price_sale +
                              color.price_extra
                            }
                            checked={index == iColor}
                            onClick={() => {
                              setIColor(index);
                              mainSwiper?.slideTo(0);
                              setQuantity(
                                quantity >
                                  product.variants[iVariant === -1 ? 0 : iVariant].colors[index]
                                    .quantity
                                  ? product.variants[iVariant === -1 ? 0 : iVariant].colors[index]
                                      .quantity
                                  : quantity
                              );
                            }}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
                {/* price */}
                <div className="flex gap-4 items-center py-4">
                  <p className="text-base font-medium">Giá</p>
                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <p className="text-3xl font-bold text-red-500 ">
                      {(
                        product!.variants[iVariant === -1 ? 0 : iVariant].price -
                        product!.variants[iVariant === -1 ? 0 : iVariant].price_sale +
                        product!.variants[iVariant === -1 ? 0 : iVariant].colors[
                          iColor === -1 ? 0 : iColor
                        ].price_extra
                      ).toLocaleString("vi-VN")}{" "}
                      đ
                    </p>
                    <div className="flex items-center gap-2">
                      {product!.variants[iVariant === -1 ? 0 : iVariant].price_sale > 0 && (
                        <del className="text-lg font-normal text-gray-500">
                          {(
                            product!.variants[iVariant === -1 ? 0 : iVariant].price +
                            product!.variants[iVariant === -1 ? 0 : iVariant].colors[
                              iColor === -1 ? 0 : iColor
                            ].price_extra
                          ).toLocaleString("vi-VN")}{" "}
                          đ
                        </del>
                      )}
                      {product!.variants[iVariant === -1 ? 0 : iVariant].price_sale > 0 && (
                        <div className="py-1.5 px-1 bg-primary rounded-md w-[42px] h-6 flex items-center ">
                          {Math.ceil(
                            100 -
                              ((product.variants[iVariant].price -
                                product.variants[iVariant].price_sale) /
                                product.variants[iVariant].price) *
                                100
                          ) > 0 && (
                            <div className="w-full text-center text-xs font-bold text-white">
                              {Math.ceil(
                                100 -
                                  ((product.variants[iVariant].price -
                                    product.variants[iVariant].price_sale) /
                                    product.variants[iVariant].price) *
                                    100
                              )}{" "}
                              %
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* quantity */}
                <div className="flex gap-4 items-center py-4">
                  <p className="shrink-0">Số Lượng</p>
                  <div className="flex items-center">
                    <div
                      onClick={() => setQuantity(quantity - 1 === 0 ? 1 : quantity - 1)}
                      className="w-10 h-10 border rounded-l-lg flex items-center justify-center cursor-pointer select-none"
                    >
                      <FaMinus />
                    </div>
                    <div className="w-20 h-10 border flex font-bold text-lg items-center justify-center select-none">
                      {quantity}
                    </div>
                    <div
                      onClick={() => {
                        if (
                          quantity <
                          product?.variants[iVariant === -1 ? 0 : iVariant].colors[
                            iColor === -1 ? 0 : iColor
                          ].quantity
                        )
                          setQuantity(quantity + 1);
                      }}
                      className="w-10 h-10 border rounded-r-lg flex items-center justify-center cursor-pointer"
                    >
                      <FaPlus />
                    </div>
                  </div>
                  <p className="select-none text-gray-700 line-clamp-1">
                    {
                      product.variants[iVariant === -1 ? 0 : iVariant].colors[
                        iColor === -1 ? 0 : iColor
                      ].quantity
                    }{" "}
                    Sản phẩm có sẵn
                  </p>
                </div>
                {/* button */}
                <div className="flex gap-4 py-2.5">
                  <div
                    onClick={() => {
                      if (iVariant !== -1 && iColor !== -1) {
                        if (!state.user) {
                          dispatch(actions.set({ show: { ...state.show, login: true } }));
                        } else {
                          handleAddToCart();
                        }
                      }
                    }}
                    className={` flex gap-1.5 p-1 rounded-lg w-2/5 h-16  items-center justify-center border border-primary select-none ${
                      iVariant !== -1 && iColor !== -1 ? "cursor-pointer" : "opacity-50"
                    }`}
                  >
                    <AiOutlineShoppingCart className="w-7 h-7 shrink-0 text-primary font-bold" />
                    <p className="text-primary text-md font-medium line-clamp-1">
                      Thêm vào giỏ hàng
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      if (iVariant !== -1 && iColor !== -1) {
                        if (!state.user) {
                          dispatch(actions.set({ show: { ...state.show, login: true } }));
                        } else {
                          handleBuyNow();
                        }
                      }
                    }}
                    className={` flex w-3/5 h-16 items-center bg-primary rounded-lg shadow-lg select-none  ${
                      iVariant !== -1 && iColor !== -1 ? "cursor-pointer" : "opacity-50"
                    }`}
                  >
                    <p className="w-full text-center text-white text-lg font-bold">MUA NGAY</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mô Tả */}
          <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex gap-4 items-start">
            <div
              className={`relative w-full lg:w-4/5 h-[${heightDescription}] overflow-hidden  shadow-xl border border-gray-300 rounded-lg p-4 flex flex-col gap-2`}
            >
              <p className="flex gap-2">
                <FaRegEdit className="w-6 h-6" />
                <span className="text-xl font-medium">MÔ TẢ SẢN PHẨM</span>
              </p>
              <hr />
              <div
                dangerouslySetInnerHTML={{
                  __html: ` ${product?.description}`,
                }}
              />
              <div
                className={`p-4 center-flex bg-white ${
                  heightDescription !== "auto"
                    ? "absolute bottom-0 right-0 left-0  shadow-[0_-50px_50px_#fff]"
                    : ""
                }`}
              >
                <button
                  onClick={() =>
                    setHeightDescription(heightDescription === "auto" ? "500px" : "auto")
                  }
                  className=" border border-gray-300 font-bold w-full sm:w-1/2 lg:w-1/3 bg-white rounded-md py-2.5"
                >
                  {heightDescription !== "auto" ? "Xem thêm" : "Thu gọn"}
                </button>
              </div>
            </div>
            <div className="hidden lg:flex w-1/5 h-auto rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-full h-auto  object-contain"
                src="https://vnpik.com/wp-content/uploads/2024/12/Pikvip.com_20241204_20.jpg"
                alt=""
              />
            </div>
          </section>

          {/* Đánh Giá */}
          <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 p-4 ">
            <div className="shadow-xl border border-gray-300  rounded-lg p-4">
              <div className="px-4 py-2">
                <div className="flex gap-2">
                  <FaUserEdit className="w-6 h-6" />
                  <span className="text-xl font-medium">ĐÁNH GIÁ SẢN PHẨM</span>
                </div>
              </div>
              {product.rating !== null && (
                <div className="w-full flex items-center justify-between sm:justify-start gap-4 p-4">
                  <div className=" flex flex-col items-center justify-center shrink-0">
                    <div className="flex gap-2.5 items-end">
                      <span className="text-4xl font-bold text-primary">{product?.rating}</span>
                      <span className="text-primary text-lg font-normal"> trên 5</span>
                    </div>
                    <div className="flex gap-1">
                      <Rate
                        className="text-secondaryDark text-xl"
                        defaultValue={Math.ceil(product.rating * 2) / 2}
                        allowHalf
                        disabled
                        characterRender={(char) => (
                          <span style={{ marginInlineEnd: "6px" }}>{char}</span>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex sm:hidden w-1/2 h-16">
                    <Select
                      className="w-full h-full text-base font-medium"
                      value={rating}
                      options={[
                        { value: "", label: `Tất cả (${totalsReviews?.["all"]})` },
                        { value: "5", label: `5 Sao (${totalsReviews?.["5"]})` },
                        { value: "4", label: `4 Sao (${totalsReviews?.["4"]})` },
                        { value: "3", label: `3 Sao (${totalsReviews?.["3"]})` },
                        { value: "2", label: `2 Sao (${totalsReviews?.["2"]})` },
                        { value: "1", label: `1 Sao (${totalsReviews?.["1"]})` },
                      ]}
                      onChange={(value, option) => {
                        setRating(value);
                      }}
                    />
                  </div>

                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    navigation={{
                      nextEl: "#next",
                      prevEl: "#prev",
                    }}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="w-full !hidden sm:!flex"
                  >
                    {[
                      { key: "", value: `Tất cả (${totalsReviews?.["all"]})` },
                      { key: "5", value: `5 Sao (${totalsReviews?.["5"]})` },
                      { key: "4", value: `4 Sao (${totalsReviews?.["4"]})` },
                      { key: "3", value: `3 Sao (${totalsReviews?.["3"]})` },
                      { key: "2", value: `2 Sao (${totalsReviews?.["2"]})` },
                      { key: "1", value: `1 Sao (${totalsReviews?.["1"]})` },
                    ].map((e) => (
                      <SwiperSlide
                        key={e.key}
                        className={`!w-auto h-auto px-8 py-2.5 center-flex rounded-lg shadow-lg ${
                          e.key === rating ? "bg-primary text-white" : "text-gray-700"
                        } text-base font-bold select-none cursor-pointer transition-all duration-300 border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-105 `}
                        onClick={() => setRating(e.key)}
                      >
                        {e.value}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
              <hr />
              <div className=" flex flex-col px-4 divide-y-[1px] min-h-96 divide-gray-200">
                {reviews.length === 0 && (
                  <div className="w-full min-h-96 center-flex flex-col gap-2">
                    <TbMoodEmpty className="w-36 h-36 text-gray-300" />
                    <p className="text-3xl text-gray-400 font-medium">
                      Chưa có đánh giá {rating !== "" ? `${rating} sao` : "sản phẩm"}
                    </p>
                  </div>
                )}
                {reviews.map((review: IReview, index: number) => (
                  <div key={index} className="flex items-start gap-4 py-2 sm:py-4 ">
                    <div className="shrink-0 w-8 sm:w-12 lg:16 aspect-square center-flex rounded-full overflow-hidden  shadow-lg">
                      {review.user.avatar ? (
                        <img
                          className="w-full h-full object-cover"
                          src={review.user.avatar}
                          alt=""
                        />
                      ) : (
                        <FaCircleUser className="w-full h-full text-gray-300" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-lg font-medium">{review.user.fullname}</p>
                      <div className="flex gap-1">
                        <Rate
                          className="text-secondaryDark text-base"
                          value={review.rating}
                          disabled
                          characterRender={(char) => (
                            <span style={{ marginInlineEnd: "2px" }}>{char}</span>
                          )}
                        />
                      </div>
                      <div className="flex gap-2">
                        <p className="text-base font-normal">
                          {moment(review.updated_at, "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm")}
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-normal">{review.content}</p>
                      </div>
                      <div className="flex gap-4">
                        {review.images.length > 0 && (
                          <Image.PreviewGroup
                            preview={{
                              onChange: (current, prev) =>
                                console.log(`current index: ${current}, prev index: ${prev}`),
                            }}
                          >
                            {review.images.map((image: string, index: number) => (
                              <Image
                                className="object-contain rounded border border-gray-300 shadow-lg"
                                width={80}
                                height={80}
                                key={index}
                                src={image}
                                alt="hình ảnh đánh giá"
                              />
                            ))}
                          </Image.PreviewGroup>
                        )}
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="w-5 h-5 cursor-pointer">
                          {review.like.includes(state.user?.id) ? (
                            <div
                              className="group relative"
                              onClick={() => {
                                if (state.user) {
                                  handleRemoveFromWishReview(review.id);
                                } else {
                                  dispatch(actions.set({ show: { ...state.show, login: true } }));
                                }
                              }}
                            >
                              <FaHeart className="w-full h-full text-primary group-hover:scale-125 transition-all duration-300" />
                              <FaHeart className="w-full h-full hidden absolute inset-0 animate-ping group-hover:block text-primary" />
                            </div>
                          ) : (
                            <div
                              className="group relative"
                              onClick={() => {
                                if (state.user) {
                                  handleAddToWishReview(review.id);
                                } else {
                                  dispatch(actions.set({ show: { ...state.show, login: true } }));
                                }
                              }}
                            >
                              <FaRegHeart className="w-full h-full text-primary group-hover:scale-125 transition-all duration-300" />
                              <FaHeart className="w-full h-full hidden absolute inset-0 animate-ping group-hover:block text-primary" />
                            </div>
                          )}
                        </div>
                        <p className="text-lg font-normal">{review.like.length}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalReviews > 5 && (
                <div className="flex w-full justify-center py-6">
                  <Pagination
                    defaultCurrent={1}
                    total={totalReviews}
                    pageSize={5}
                    showSizeChanger={false}
                    onChange={setPage}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Sản Phẩm Tương Tự */}
          <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 gap-2.5">
            <div className="flex gap-2.5 p-2.5">
              <p className="text-3xl font-medium">Sản Phẩm Tương Tự</p>
            </div>

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
              loop={true}
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
              {productsSame.map((product: IProduct) => (
                <SwiperSlide key={product.id}>
                  <Product product={product} />
                </SwiperSlide>
              ))}
              <button className="custom-prev absolute w-10 h-20 py-5 pr-2.5 pl-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 left:0 lg:-left-10 md:group-hover/container:left-0 -translate-y-1/2 transition-all duration-300 rounded-r-full flex items-center justify-center ">
                <FaAngleLeft className="w-8 h-8 text-white" />
              </button>
              <button className="custom-next absolute w-10 h-20 py-5 pl-2.5 pr-1 bg-black/30 hover:bg-black/50 z-10 hover:scale-110 top-1/2 right-0 lg:-right-10 md:group-hover/container:right-0 -translate-y-1/2 transition-all duration-300 rounded-l-full flex items-center justify-center ">
                <FaAngleRight className="w-8 h-8 text-white" />
              </button>
            </Swiper>
          </section>
        </>
      ) : (
        <>
          <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 ">
            <div className="flex gap-4">
              <Shimmer className="w-1/2 h-7" />
            </div>
            <hr className="my-4" />
            <div className="flex flex-col lg:flex-row gap-4">
              {/* hình ảnh */}
              <div className="w-full xl:w-7/12 flex flex-col gap-4">
                <Shimmer image={true} className="w-full  h-[365px]" />

                <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-7 xl:grid-cols-8 gap-2.5">
                  <Shimmer image={true} className="aspect-square" />
                  <Shimmer image={true} className="aspect-square" />
                  <Shimmer image={true} className="aspect-square" />
                  <Shimmer image={true} className="aspect-square" />
                  <Shimmer image={true} className="aspect-square" />
                  <Shimmer image={true} className="aspect-square !hidden sm:!flex" />
                  <Shimmer image={true} className="aspect-square !hidden sm:!flex" />
                  <Shimmer
                    image={true}
                    className="aspect-square !hidden sm:flex lg:!hidden xl:!flex"
                  />
                </div>
              </div>
              <div className="w-full xl:w-5/12 flex flex-col gap-4 ">
                <div className="grid grid-cols-2 sm:grid-cols-3 flex-wrap gap-2.5">
                  <Shimmer className="h-20 md:h-16" />
                  <Shimmer className="h-20 md:h-16" />
                  <Shimmer className="h-20 md:h-16 !hidden sm:flex" />
                </div>
                <Shimmer className="w-1/2 h-6" />

                <div className="grid grid-cols-2 sm:grid-cols-3 flex-wrap gap-2.5">
                  <Shimmer className="h-20 md:h-16" />
                  <Shimmer className="h-20 md:h-16" />
                  <Shimmer className="h-20 md:h-16" />
                  <Shimmer className="h-20 md:h-16" />
                  <Shimmer className="h-20 md:h-16 !hidden sm:flex" />
                  <Shimmer className="h-20 md:h-16 !hidden sm:flex" />
                </div>
                <Shimmer className="w-full h-9" />
                <Shimmer className="w-full h-10" />

                <div className="flex gap-4 py-2.5">
                  <Shimmer className="w-2/5 h-16" />
                  <Shimmer className="w-3/5 h-16" />
                </div>
              </div>
            </div>
          </section>

          <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex ">
            <div className="flex gap-4 w-full">
              <div className="w-full lg:w-4/5  shadow-xl border border-gray-300 rounded-lg p-4 flex flex-col gap-2">
                <Shimmer className="w-2/5 h-7" />
                <hr />
                <Shimmer className="w-1/2 h-6" />
                <Shimmer className="w-9/12 h-6" />
                <Shimmer className="w-2/5 h-6" />
                <Shimmer className="w-4/5 h-6" />
                <Shimmer className="w-2/3 h-6" />
                <Shimmer className="w-4/5 h-6" />
                <Shimmer className="w-3/5 h-6" />
                <Shimmer className="w-3/4 h-6" />
                <Shimmer className="w-5/5 h-6" />
                <Shimmer className="w-4/5 h-6" />
                <Shimmer className="w-2/5 h-6" />
                <Shimmer className="w-3/5 h-6" />
                <Shimmer className="w-8/12 h-6" />
                <Shimmer className="w-4/5 h-6" />
                <Shimmer className="w-3/5 h-6" />
                <Shimmer className="w-5/5 h-6" />
              </div>
              <Shimmer image={true} className="w-1/5  !hidden lg:flex" />
            </div>
          </section>

          <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 p-4 ">
            <div className="shadow-xl border border-gray-300  rounded-lg p-4">
              <Shimmer className="w-1/3 h-10" />
              <div className="flex gap-4 p-4">
                <div className="w-32 flex flex-col items-center justify-center gap-1 shrink-0">
                  <Shimmer className="w-full h-10" />
                  <Shimmer className="w-full h-5" />
                </div>
                <div className="flex gap-2.5 p-2.5 overflow-hidden">
                  <Shimmer className="w-36 shrink-0 h-11" />
                  <Shimmer className="w-36 shrink-0 h-11" />
                  <Shimmer className="w-36 shrink-0 h-11" />
                  <Shimmer className="w-36 shrink-0 h-11" />
                  <Shimmer className="w-36 shrink-0 h-11" />
                  <Shimmer className="w-36 shrink-0 h-11" />
                </div>
              </div>
              <hr />
              <div className=" flex flex-col px-4">
                <div className="flex items-start gap-4 py-4 ">
                  <Shimmer
                    image
                    className="shrink-0 w-8 sm:w-12 lg:16 aspect-square !rounded-full"
                  />
                  <div className="flex flex-col gap-3 w-full overflow-hidden">
                    <Shimmer className="w-1/5 h-7" />
                    <Shimmer className="w-1/12 h-7" />
                    <Shimmer className="w-2/12 h-7" />
                    <Shimmer className="w-9/12 h-7" />
                    <Shimmer className="w-full h-7" />

                    <div className="flex gap-4 ">
                      <Shimmer className="w-20 aspect-square shrink-0" image />
                      <Shimmer className="w-20 aspect-square shrink-0" image />
                      <Shimmer className="w-20 aspect-square shrink-0" image />
                      <Shimmer className="w-20 aspect-square shrink-0" image />
                      <Shimmer className="w-20 aspect-square shrink-0" image />
                      <Shimmer className="w-20 aspect-square shrink-0" image />
                    </div>
                    <Shimmer className="w-14 h-7" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 gap-2.5">
            <div className="flex gap-2.5 py-2.5">
              <Shimmer className="w-2/5 h-9" />
            </div>
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
          </section>
        </>
      )}
    </>
  );
}

export default ProductDetail;
