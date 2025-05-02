"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BiCategory } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaAnglesUp, FaCircleUser } from "react-icons/fa6";
import { Fragment, useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { FloatButton, Modal, Popover } from "antd";
import { useWindowScroll } from "@uidotdev/usehooks";
import { useLifecycles, useWindowSize } from "react-use";
import Cookies from "js-cookie";

import { useStore, actions, initState } from "@/app/store";
import config from "@/app/config";
import Logo from "@/app/assets/Logo";
import LogoMobile from "@/app/assets/LogoMobile";
import MenuCategory from "../MenuCategory";
import ModalLogin from "./components/ModalLogin";
import ResultSearch from "./components/ResultSearch";
import * as authServices from "@/app/services/authService";
import * as productServices from "@/app/services/productService";
import Loading from "@/app/components/client/Loading";
import Shimmer from "../Shimmer";

function Header() {
  const [state, dispatch] = useStore();
  const [showModal, setShowModal] = useState({ menu: false, search: false });
  const [breadCrumb, setBreadCrumb] = useState<any>([]);

  useLifecycles(() => dispatch(actions.load()));

  const pathname = usePathname();
  const { id }: any = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { width, height } = useWindowSize();
  const [scroll] = useWindowScroll();
  const { x, y } = scroll as { x: number; y: number };

  const refSearch = useRef<any>(null);

  if (width < 640 && showModal.menu) setShowModal({ ...showModal, menu: false });

  useEffect(() => {
    if (state.routing) {
      dispatch(actions.set_routing(false));
    }
    if (pathname !== config.routes.client.products) {
      dispatch(actions.set_search(""));
    }
    switch (pathname) {
      case config.routes.client.products:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Sản phẩm",
            link: config.routes.client.products,
          },
        ]);
        break;
      case `${config.routes.client.productDetail}${id}`:
        productServices.getProById(id).then((res) => {
          if (res.status === 200) {
            setBreadCrumb([
              {
                name: "Trang Chủ",
                link: config.routes.client.home,
              },
              {
                name: "Sản phẩm",
                link: config.routes.client.products,
              },
              {
                name: `${res.data.category.name}`,
                link: `${config.routes.client.products}?categoryid=${res.data.category.id}`,
              },
              {
                name: `${res.data.name}`,
                link: `${config.routes.client.productDetail}${id}`,
              },
            ]);
          }
        });
        break;
      case config.routes.client.cart:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Giỏ hàng",
            link: config.routes.client.cart,
          },
        ]);
        break;
      case config.routes.client.login:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Đăng nhập",
            link: config.routes.client.login,
          },
        ]);
        break;
      case config.routes.client.register:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Đăng ký  ",
            link: config.routes.client.register,
          },
        ]);
        break;
      case config.routes.client.checkout:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Giỏ hàng",
            link: config.routes.client.cart,
          },
          {
            name: "Thanh Toán",
            link: config.routes.client.checkout,
          },
        ]);
        break;
      case config.routes.client.account.home:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Tài khoản",
            link: config.routes.client.account.home,
          },
        ]);
        break;
      case config.routes.client.account.order:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Tài khoản",
            link: config.routes.client.account.home,
          },
          {
            name: "Lịch sử mua hàng",
            link: config.routes.client.account.order,
          },
        ]);
        break;
      case config.routes.client.account.voucher:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Tài khoản",
            link: config.routes.client.account.home,
          },
          {
            name: "Voucher",
            link: config.routes.client.account.voucher,
          },
        ]);
        break;
      case config.routes.client.account.profile:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Tài khoản",
            link: config.routes.client.account.home,
          },
          {
            name: "Thông tin cá nhân",
            link: config.routes.client.account.profile,
          },
        ]);
        break;
      case config.routes.client.account.address:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Tài khoản",
            link: config.routes.client.account.home,
          },
          {
            name: "Địa chỉ của tôi",
            link: config.routes.client.account.address,
          },
        ]);
        break;
      case config.routes.client.account.password:
        setBreadCrumb([
          {
            name: "Trang Chủ",
            link: config.routes.client.home,
          },
          {
            name: "Tài khoản",
            link: config.routes.client.account.home,
          },
          {
            name: "Đổi mật khẩu",
            link: config.routes.client.account.password,
          },
        ]);
        break;
      default:
        setBreadCrumb([]);
        break;
    }
  }, [pathname]);

  useEffect(() => {
    const userJSON = localStorage.getItem("user") || "null";
    const user = JSON.parse(userJSON);

    if (user && authServices.getAccessToken() && authServices.getRefreshToken()) {
      (function callback() {
        authServices.getProfile(user.id).then((res) => {
          if (res.status === 200) {
            const token = authServices.getAccessToken();
            const refreshToken = authServices.getRefreshToken();

            if (!token || !refreshToken) {
              clear();
            }

            dispatch(
              actions.set({
                user: user,
                wish: res.data.wish,
                cart: res.data.cart,
              })
            );
          } else if (res.status === 401) {
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
          } else {
            clear();
          }
        });
      })();
    } else {
      localStorage.removeItem("user");
      dispatch(actions.set({ ...initState, load: false }));
    }
  }, [state.re_render]);

  useEffect(() => {
    if (searchParams.get("search")) dispatch(actions.set_search(searchParams.get("search") || ""));
  }, [searchParams]);

  function handleSearch() {
    refSearch.current.blur();
    const searchParamsNew = new URLSearchParams(searchParams.toString());
    searchParamsNew.set("search", `${state.search.toString()}`);
    if (pathname !== config.routes.client.products) dispatch(actions.set_routing(true));
    router.push(`${config.routes.client.products}?${searchParamsNew.toString()}`, {
      scroll: false,
    });
  }

  function clear() {
    authServices.clearUser();
    dispatch(actions.set({ ...initState, load: false }));
    if (pathname !== config.routes.client.login) dispatch(actions.set_routing(true));
    router.push(config.routes.client.login);
  }

  return (
    <>
      {state.routing && <Loading />}
      {/* nút scroll top  */}
      <FloatButton.BackTop
        visibilityHeight={200}
        icon={<FaAnglesUp className="text-black" />}
        className="w-12 h-12 !z-10"
        style={{ bottom: `${width < 640 ? "100px" : "40px"}` }}
      />
      {/* modal login */}
      <Modal
        open={state.show.login}
        onCancel={() => dispatch(actions.set({ show: { ...state.show, login: false } }))}
        footer={null}
        title={null}
        centered
        maskClosable={false}
      >
        <ModalLogin
          onClick={() => dispatch(actions.set({ show: { ...state.show, login: false } }))}
        />
      </Modal>

      {/* overlay popup */}
      {(showModal.search || showModal.menu) && (
        <div className="bg-black/30 fixed inset-0 z-[99] cursor-pointer"></div>
      )}
      <header
        className={`sticky ${
          y < 100 ? "top-0" : "top-0 md:-top-8 lg:-top-11"
        } transition-all duration-200 w-full z-[100] shadow-lg`}
      >
        <div className="bg-[#E9EFFF] h-8 lg:h-11 p-1.5 lg:p-2 hidden md:block">
          {state.load ? (
            <div className="container-custom h-full relative grid grid-cols-2 lg:grid-cols-3 gap-4">
              <Shimmer classNam="w-full h-full" />
              <Shimmer classNam="w-full h-full" />
              <Shimmer classNam="w-full h-full !hidden lg:!flex " />
            </div>
          ) : (
            <Swiper
              className="container-custom h-full relative "
              slidesPerView={3}
              spaceBetween={16}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Navigation]}
              breakpoints={{
                1024: { slidesPerView: 3 },
                0: { slidesPerView: 2 },
              }}
            >
              <SwiperSlide className="">
                <img
                  className="w-full h-full object-cover px-10 "
                  src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Giao%20hang.svg"
                  alt="Benner"
                />
              </SwiperSlide>
              <SwiperSlide className="">
                <img
                  className="w-full h-full object-cover px-10 "
                  src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Chinh%20hang.svg"
                  alt="Benner"
                />
              </SwiperSlide>
              <SwiperSlide className="">
                <img
                  className="w-full h-full object-cover px-10 "
                  src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Thu%20cu.svg"
                  alt="Benner"
                />
              </SwiperSlide>
              <SwiperSlide className="">
                <img
                  className="w-full h-full object-cover px-10 "
                  src="https://cdn2.cellphones.com.vn/x/https://dashboard.cellphones.com.vn/storage/Top%20banner_Giao%20hang.svg"
                  alt="Benner"
                />
              </SwiperSlide>
            </Swiper>
          )}
        </div>

        <div className="bg-primary py-4 ">
          <div className="h-10 lg:h-12 container-custom flex gap-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
            {/* Logo elecking */}
            <Link
              className="w-2/12 sm:w-1/12 lg:w-2/12 !shrink-0 h-full"
              onClick={() => {
                if (pathname !== config.routes.client.home) dispatch(actions.set_routing(true));
              }}
              href={config.routes.client.home}
            >
              <Logo className="hidden lg:block" />
              <LogoMobile className="block lg:hidden h-full !shrink-0" />
            </Link>

            {/* Icon category list */}
            <Popover
              placement="bottomLeft"
              title={null}
              trigger="click"
              open={showModal.menu}
              onOpenChange={(e) => setShowModal({ menu: e, search: false })}
              zIndex={101}
              styles={{ body: { padding: 0, overflow: "hidden", minWidth: "240px" } }}
              content={
                <MenuCategory onClose={() => setShowModal({ menu: false, search: false })} />
              }
            >
              <div className="!hidden sm:center-flex w-1/12 h-full shrink-0 center-flex hover:bg-white/20 cursor-pointer rounded-lg  transition-all duration-300">
                <div className="h-3/4 aspect-square cneter-flex">
                  <BiCategory className="w-full h-full text-white" />
                </div>
                <div className="h-1/2 w-auto cneter-flex">
                  <FaCaretDown className="w-auto h-full text-white" />
                </div>
              </div>
            </Popover>

            {/* Search */}
            <form className="w-full h-full relative flex flex-1 items-center justify-center hover:bg-white/20 cursor-pointer rounded-lg transition-all duration-300">
              <Popover
                placement={width < 640 ? "bottom" : "bottomLeft"}
                title={null}
                open={showModal.search}
                trigger="click"
                onOpenChange={(e) => setShowModal({ menu: false, search: e })}
                content={
                  <ResultSearch onClose={() => setShowModal({ menu: false, search: false })} />
                }
              >
                <input
                  ref={refSearch}
                  type="text"
                  value={state.search}
                  onChange={(e) => {
                    setShowModal({ menu: false, search: true });
                    dispatch(actions.set_search(e.target.value));
                  }}
                  className="w-full h-full rounded-lg border border-stone-300 pl-4 pr-20 outline-primaryDark"
                  placeholder="Bạn cần tìm gì ?"
                />
              </Popover>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch();
                  setShowModal({ menu: false, search: false });
                }}
                className="aspect-[2/1] h-5/6 center-flex bg-primary rounded-md absolute top-1/2 -translate-y-1/2 right-1"
              >
                <div className="h-3/4 !aspect-square">
                  <IoSearchSharp className="w-full h-full text-white" />
                </div>
              </button>
            </form>

            {/* Icon Cart */}
            <div
              className="w-2/12 sm:w-1/12 shrink-0 h-full center-flex rounded-lg hover:bg-white/20 transition-all duration-300 select-none cursor-pointer"
              onClick={() => {
                if (!!state.user) {
                  if (pathname !== config.routes.client.cart) dispatch(actions.set_routing(true));
                  router.push(config.routes.client.cart);
                } else {
                  dispatch(actions.set({ show: { ...state.show, login: true } }));
                }
              }}
            >
              <div className="relative">
                <AiOutlineShoppingCart className="w-9 h-9 text-white" />
                {!!state.cart.length && (
                  <div className="absolute w-7 h-7 border border-white font-semibold text-base center-flex bg-secondary center-flex rounded-full top-0 right-0 translate-x-1/2	-translate-y-1/3 md:-translate-y-1/2	">
                    {state.cart.length}
                  </div>
                )}
              </div>
            </div>

            {/* Icon login / register */}
            <div
              className="hidden sm:center-flex w-2/12 lg:w-1/12 p-1 shrink-0 h-full bg-white rounded-lg  flex-col cursor-pointer select-none"
              onClick={() => {
                if (!!state.user) {
                  if (pathname !== config.routes.client.account.home)
                    dispatch(actions.set_routing(true));
                  router.push(config.routes.client.account.home);
                } else {
                  dispatch(actions.set({ show: { ...state.show, login: true } }));
                }
              }}
            >
              {!!state.user ? (
                state.user.avatar ? (
                  <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={state.user.avatar}
                      alt="avarar"
                    />
                  </div>
                ) : (
                  <FaCircleUser className="text-base w-4 h-4 lg:w-6 lg:h-6 text-gray-800" />
                )
              ) : (
                <FaCircleUser className="text-base w-4 h-4 lg:w-6 lg:h-6 text-gray-800" />
              )}
              <p className="text-gray-800 text-xs font-medium">
                {!!state.user ? state.user.username : "Emember"}
              </p>
            </div>
          </div>
        </div>
        {breadCrumb.length > 0 && (
          <div className="bg-white">
            <div className="container-custom flex py-1.5 sm:py-2 px-3 md:px-3.5 lg:px-4 xl:px-0 items-center gap-1 ">
              {breadCrumb.map((e: any, i: number) => (
                <Fragment key={i}>
                  {i != 0 && <IoIosArrowForward />}

                  <Link
                    onClick={() => {
                      if (pathname !== e.link) dispatch(actions.set_routing(true));
                    }}
                    href={e.link}
                    className="text-xs font-normal text-gray-700 line-clamp-1"
                  >
                    {e.name}
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
