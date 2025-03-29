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
import { FaAngleLeft, FaAngleRight, FaAnglesUp, FaCircleUser } from "react-icons/fa6";
import { Fragment, useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { FloatButton, Modal, Popover } from "antd";
import { useWindowScroll } from "@uidotdev/usehooks";
import Cookies from "js-cookie";

import config from "@/app/config";
import LogoMobile from "@/app/assets/LogoMobile";
import MenuCategory from "../MenuCategory";
import ModalLogin from "../ModalLogin";
import Logo from "@/app/assets/Logo";
import * as userServices from "@/app/services/userService";
import * as authServices from "@/app/services/authService";
import * as productServices from "@/app/services/productService";
import { useStore, actions, initState } from "@/app/store";
import { useLifecycles } from "react-use";
import { re_render } from "@/app/store/actions";

function Header() {
  const [state, dispatch] = useStore();
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [breadCrumb, setBreadCrumb] = useState<any>([]);

  useLifecycles(() => dispatch(actions.load()));

  const pathname = usePathname();
  const { id }: any = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [scroll] = useWindowScroll();
  const { x, y } = scroll as { x: number; y: number };

  useEffect(() => {
    const userJSON = localStorage.getItem("user") || "null";
    const user = JSON.parse(userJSON);

    if (user) {
      userServices
        .getById(user.id)
        .then((res) => {
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
          } else {
            clear();
          }
        })
        .catch((err) => clear());
    } else {
      localStorage.removeItem("user");
      dispatch(actions.set({ ...initState, load: false }));
    }
  }, [state.re_render]);

  useEffect(() => {
    if (searchParams.get("search")) setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
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
              link: `${config.routes.client.productDetail}/${id}`,
            },
          ]);
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

  function handleSearch() {
    const searchParamsNew = new URLSearchParams(searchParams.toString());
    searchParamsNew.set("search", `${search}`);
    router.push(`${config.routes.client.products}?${searchParamsNew.toString()}`, {
      scroll: false,
    });
  }

  function clear() {
    localStorage.removeItem("user");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    dispatch(actions.set({ ...initState, load: false }));
    router.push(config.routes.client.login);
  }

  return (
    <>
      {/* nút scroll top  */}
      <FloatButton.BackTop
        visibilityHeight={200}
        icon={<FaAnglesUp className="text-black" />}
        className="w-12 h-12 !z-10"
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

      {/* overlay popup categpry menu */}
      {showMenu && <div className="bg-black/30 fixed inset-0 z-20 cursor-pointer"></div>}
      <header
        className={`sticky ${
          y < 100 ? "top-0" : "-top-11"
        } transition-all duration-200 w-full z-30 shadow-lg`}
      >
        {state.load ? (
          <div className="bg-[#E9EFFF] h-11 p-2 hidden md:block">
            <div className="container-custom h-full relative grid grid-cols-3 gap-4">
              <div className="relative bg-gray-300 rounded-lg  shadow !w-full h-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                      w-full h-full animate-[shimmer_1.5s_infinite]"
                ></div>
              </div>
              <div className="relative bg-gray-300 rounded-lg  shadow !w-full h-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                      w-full h-full animate-[shimmer_1.5s_infinite]"
                ></div>
              </div>
              <div className="relative bg-gray-300 rounded-lg  shadow !w-full h-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                      w-full h-full animate-[shimmer_1.5s_infinite]"
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#E9EFFF] h-11 p-2 hidden md:block">
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
          </div>
        )}

        <div className="bg-primary  ">
          <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
            {/* Logo elecking */}
            <Link href={config.routes.client.home} className=" w-12 md:w-[200px] h-12">
              <Logo className="hidden md:block" />
              <LogoMobile className="block md:hidden" />
            </Link>

            {/* Icon category list */}
            <Popover
              placement="bottomLeft"
              title={null}
              trigger="click"
              open={showMenu}
              onOpenChange={(e) => setShowMenu(e)}
              zIndex={20}
              styles={{ body: { padding: 0, overflow: "hidden", minWidth: "240px" } }}
              overlayStyle={{ zIndex: 1050 }}
              content={<MenuCategory onClick={() => setShowMenu(false)} />}
              className="hidden md:flex w-[92px] h-12 items-center justify-center  hover:bg-white/20 cursor-pointer rounded-lg  transition-all duration-300"
            >
              <BiCategory className="w-9 h-9 text-white" />
              <FaCaretDown className="w-6 h-6 text-white" />
            </Popover>

            {/* Search */}
            <form className=" flex-1 h-12 relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-full rounded-lg border border-stone-300 pl-4 pr-20 outline-primaryDark"
                placeholder="Bạn cần tìm gì ?"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="w-16 h-9 center-flex bg-primary rounded-md absolute top-1/2 -translate-y-1/2 right-2"
              >
                <IoSearchSharp className="w-6 h-6 text-white" />
              </button>
            </form>

            {/* Icon Cart */}
            <div
              className="w-[92px] h-12 center-flex rounded-lg hover:bg-white/20 transition-all duration-300 select-none cursor-pointer"
              onClick={() => {
                if (!!state.user) {
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
              className="hidden w-[92px] h-12 bg-white rounded-lg md:center-flex flex-col cursor-pointer select-none"
              onClick={() => {
                if (!!state.user) {
                  router.push(config.routes.client.account.home);
                } else {
                  dispatch(actions.set({ show: { ...state.show, login: true } }));
                }
              }}
            >
              {state.user ? (
                state.user.avatar ? (
                  <div className=" w-6 h-6 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-fill"
                      src={state.user.avatar}
                      alt="avarar"
                    />
                  </div>
                ) : (
                  <FaCircleUser className="text-base w-6 h-6 text-gray-800" />
                )
              ) : (
                <FaCircleUser className="text-base w-6 h-6 text-gray-800" />
              )}
              <p className="text-gray-800 text-xs font-medium">
                {!!state.user ? state.user.username : "Emember"}
              </p>
            </div>
          </div>
        </div>
        {breadCrumb.length > 0 && (
          <div className="bg-white">
            <div className="container-custom flex py-2 items-center gap-2.5 ">
              {breadCrumb.map((e: any, i: number) => (
                <Fragment key={i}>
                  {i != 0 && <IoIosArrowForward />}
                  <Link href={e.link} className="text-xs font-normal text-gray-700">
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
