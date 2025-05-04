"use client";

import { Pagination, Popover, Slider } from "antd";
import { Fragment, useEffect, useState } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa6";
import { IoIosTrendingUp, IoMdArrowDropdown, IoMdCheckmark } from "react-icons/io";
import { IoCloseCircle, IoCloseOutline } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { TbMoodEmpty } from "react-icons/tb";
import { useWindowSize } from "react-use";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";

import { useStore, actions } from "@/app/store";
import * as productServices from "@/app/services/productService";
import * as categoryServices from "@/app/services/categoryService";
import * as brandServices from "@/app/services/brandService";
import * as propertyServices from "@/app/services/propertyService";
import ProductLoad from "@/app/components/client/ProductLoad";
import Product from "@/app/components/client/Product";
import Shimmer from "@/app/components/client/Shimmer";

function Products() {
  const [state, dispatch] = useStore();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [rams, setRams] = useState<IProperty[]>([]);
  const [storages, setStorages] = useState<IProperty[]>([]);
  const [ssds, setSsds] = useState<IProperty[]>([]);
  const [hdds, setHdds] = useState<IProperty[]>([]);
  const [screenSizes, setScreenSizes] = useState<IProperty[]>([]);
  const [refreshRates, setRefreshRates] = useState<IProperty[]>([]);
  const [resolutions, setResolutions] = useState<IProperty[]>([]);
  const [popup, setPopup] = useState({
    price: false,
    category: false,
    brand: false,
    ram: false,
    storage: false,
    ssd: false,
    hdd: false,
    screenSize: false,
    refreshRate: false,
    resolution: false,
  });
  const [filter, setFilter] = useState<any>({
    priceMin: 0,
    priceMax: 100000000,
    categoryid: [],
    brandid: [],
    ramid: [],
    storageid: [],
    ssdid: [],
    hddid: [],
    screen_sizeid: [],
    refresh_rateid: [],
    resolutionid: [],
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const { width, height } = useWindowSize();

  const query: any = {};

  query.page = searchParams.get("page") || 1;
  query.limit = searchParams.get("limit") || 15;
  query.orderby = searchParams.get("orderby") || "view-desc";

  if (searchParams.get("search")) query.search = searchParams.get("search");
  if (searchParams.get("categoryid")) query.categoryid = searchParams.get("categoryid");
  if (searchParams.get("brandid")) query.brandid = searchParams.get("brandid");
  if (searchParams.get("ramid")) query.ramid = searchParams.get("ramid");
  if (searchParams.get("storageid")) query.storageid = searchParams.get("storageid");
  if (searchParams.get("ssdid")) query.ssdid = searchParams.get("ssdid");
  if (searchParams.get("hddid")) query.hddid = searchParams.get("hddid");
  if (searchParams.get("screen_sizeid")) query.screen_sizeid = searchParams.get("screen_sizeid");
  if (searchParams.get("refresh_rateid")) query.refresh_rateid = searchParams.get("refresh_rateid");
  if (searchParams.get("resolutionid")) query.resolutionid = searchParams.get("resolutionid");
  if (searchParams.get("price")) query.price = searchParams.get("price");

  useEffect(() => {
    if (query.categoryid) {
      setFilter({ ...filter, categoryid: query.categoryid.split("-") });
    }

    if (query.brandid) {
      setFilter({ ...filter, brandid: query.brandid.split("-") });
    }

    if (query.ramid) {
      setFilter({ ...filter, ramid: query.ramid.split("-") });
    }

    if (query.storageid) {
      setFilter({ ...filter, storageid: query.storageid.split("-") });
    }

    if (query.ssdid) {
      setFilter({ ...filter, ssdid: query.ssdid.split("-") });
    }

    if (query.hddid) {
      setFilter({ ...filter, hddid: query.hddid.split("-") });
    }

    if (query.screen_sizeid) {
      setFilter({ ...filter, screen_sizeid: query.screen_sizeid.split("-") });
    }

    if (query.refresh_rateid) {
      setFilter({ ...filter, refresh_rateid: query.refresh_rateid.split("-") });
    }

    if (query.resolutionid) {
      setFilter({ ...filter, resolutionid: query.resolutionid.split("-") });
    }

    if (query.price) {
      const [min = 0, max = 100000000] = query.price.split("-");
      setFilter({ ...filter, priceMin: +min, priceMax: +max });
    }

    router.push(`?${new URLSearchParams(query).toString()}`);
    productServices.getQuery(query).then((res) => {
      if (res.status === 200) {
        setProducts(res.data);
        setTotalPages(res.total);
      }
    });
  }, [searchParams]);

  useEffect(() => {
    categoryServices.getQuery({ limit: 0, orderby: "id-asc", status: 1 }).then((res) => {
      if (res.status === 200) setCategories(res.data);
    });
    brandServices.getQuery({ limit: 0, orderby: "id-asc", status: 1 }).then((res) => {
      if (res.status === 200) setBrands(res.data);
    });
    propertyServices
      .getQuery({ limit: 0, orderby: "id-asc", proptype_id: "67cbb9d9c27a2ba1c45b87ac" })
      .then((res) => {
        if (res.status === 200) setRams(res.data);
      });
    propertyServices
      .getQuery({ limit: 0, orderby: "id-asc", proptype_id: "67cbb9d9c27a2ba1c45b87ad" })
      .then((res) => {
        if (res.status === 200) setStorages(res.data);
      });
    propertyServices
      .getQuery({ limit: 0, orderby: "id-asc", proptype_id: "67cbb9d9c27a2ba1c45b87b0" })
      .then((res) => {
        if (res.status === 200) setSsds(res.data);
      });
    propertyServices
      .getQuery({ limit: 0, orderby: "id-asc", proptype_id: "67cbb9d9c27a2ba1c45b87b1" })
      .then((res) => {
        if (res.status === 200) setHdds(res.data);
      });
    propertyServices
      .getQuery({ limit: 0, orderby: "id-asc", proptype_id: "67cbb9d9c27a2ba1c45b87b2" })
      .then((res) => {
        if (res.status === 200) setScreenSizes(res.data);
      });
    propertyServices
      .getQuery({ limit: 0, orderby: "id-asc", proptype_id: "67cbb9d9c27a2ba1c45b87b3" })
      .then((res) => {
        if (res.status === 200) setRefreshRates(res.data);
      });
    propertyServices
      .getQuery({ limit: 0, orderby: "id-asc", proptype_id: "67cbb9d9c27a2ba1c45b87b4" })
      .then((res) => {
        if (res.status === 200) setResolutions(res.data);
      });
  }, []);

  function handleSelectChange(key: string, value: string) {
    if (filter[key].includes(value)) {
      setFilter({
        ...filter,
        [key]: filter[key].filter((e: string) => e !== value),
      });
    } else {
      setFilter({
        ...filter,
        [key]: [...filter[key], value],
      });
    }
  }

  return (
    <>
      <div className="container-custom py-3 px-2 md:px-2.5 lg:px3 xl:px-0">
        {/* Lọc sản phẩm */}
        <section className="flex flex-col gap-4">
          {state.load ? (
            <>
              <div className="flex flex-col gap-3.5">
                <Shimmer className={"w-1/5 h-7"} />
                <div className="flex gap-4">
                  <Shimmer className={"w-1/12 h-11"} />
                  <Shimmer className={"w-2/12 h-11"} />
                  <Shimmer className={"w-1/12 h-11"} />
                  <Shimmer className={"w-2/12 h-11"} />
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                <Shimmer className={"w-[12%] h-7"} />
                <div className="flex gap-4">
                  <Shimmer className={"w-2/12 h-11"} />
                  <Shimmer className={"w-2/12 h-11"} />
                  <Shimmer className={"w-1/12 h-11"} />
                  <Shimmer className={"w-2/12 h-11"} />
                  <Shimmer className={"w-1/12 h-11"} />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Lọc sản phẩm */}
              <div className="flex flex-col gap-3.5">
                <h3 className="text-lg font-bold">Chọn theo tiêu chí</h3>
                <div className="flex flex-wrap gap-2.5">
                  {/* Giá */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.price}
                    onOpenChange={(e) =>
                      setPopup({
                        price: e,
                        category: false,
                        brand: false,
                        ram: false,
                        storage: false,
                        ssd: false,
                        hdd: false,
                        screenSize: false,
                        refreshRate: false,
                        resolution: false,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex items-center justify-between">
                          <span className="text-lg font-medium text-primary">
                            {filter.priceMin.toLocaleString("vi-VN")} đ
                          </span>
                          <span className="text-lg font-medium text-primary">
                            {filter.priceMax.toLocaleString("vi-VN")} đ
                          </span>
                        </div>
                        <div className="w-full">
                          <Slider
                            range
                            min={0}
                            max={100000000}
                            step={1000}
                            value={[+filter.priceMin, +filter.priceMax]}
                            onChange={(value) => {
                              console.log(value);
                              const [min, max] = value;
                              setFilter({ ...filter, priceMin: min, priceMax: max });
                            }}
                            tooltip={{ open: false }}
                            trackStyle={[{ backgroundColor: "#D70018" }]}
                            handleStyle={[
                              {
                                borderColor: "#D70018",
                                backgroundColor: "#D70018",
                              },
                              {
                                borderColor: "#D70018",
                                backgroundColor: "#D70018",
                              },
                            ]}
                          />
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-red-500 text-red-500 px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.price) {
                                const [min, max] = query.price.split("-");
                                setFilter({ ...filter, page: 1, priceMin: +min, priceMax: +max });
                              } else {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  priceMin: 0,
                                  priceMax: 100000000,
                                });
                              }
                              setPopup({ ...popup, price: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set("price", `${filter.priceMin}-${filter.priceMax}`);
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, price: false });
                            }}
                            className="bg-red-500 w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer
                          ${
                            popup.price || query.price
                              ? "border-primary text-primary"
                              : "text-gray-700"
                          }`}
                    >
                      <FaMoneyBill className={`w-6 h-6`} />
                      <p className={`text-base `}>Giá</p>
                    </div>
                  </Popover>
                  {/* Danh mục */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.category}
                    onOpenChange={(e) =>
                      setPopup({
                        price: false,
                        category: e,
                        brand: false,
                        ram: false,
                        storage: false,
                        ssd: false,
                        hdd: false,
                        screenSize: false,
                        refreshRate: false,
                        resolution: false,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex flex-wrap gap-2 max-h-[300px] overflow-auto">
                          {categories.map((category: ICategory, iCategory: number) => (
                            <div
                              key={iCategory}
                              onClick={() => handleSelectChange("categoryid", category.id)}
                              className={`px-4 py-2 border rounded-lg select-none cursor-pointer shadow hover:shadow-lg relative transition-all  ${
                                filter.categoryid.includes(category.id)
                                  ? "border-primary bg-red-50"
                                  : ""
                              }`}
                            >
                              {category.name}
                              {filter.categoryid.includes(category.id) && (
                                <div className="absolute top-0 left-0 w-5 h-3 bg-primary rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                  <IoMdCheckmark className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-primary text-primary px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.categoryid) {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  categoryid: query.categoryid.split("-"),
                                });
                              } else {
                                setFilter({ ...filter, page: 1, categoryid: [] });
                              }
                              setPopup({ ...popup, category: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set("categoryid", `${filter.categoryid.join("-")}`);
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, category: false });
                            }}
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer
                          ${
                            popup.category || query.categoryid
                              ? "border-primary text-primary"
                              : "text-gray-700"
                          } `}
                    >
                      <p className={`text-base`}>Danh mục</p>
                      <IoMdArrowDropdown className={`w-6 h-6`} />
                    </div>
                  </Popover>
                  {/* Thương hiệu */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.brand}
                    onOpenChange={(e) =>
                      setPopup({
                        price: false,
                        category: false,
                        brand: e,
                        ram: false,
                        storage: false,
                        ssd: false,
                        hdd: false,
                        screenSize: false,
                        refreshRate: false,
                        resolution: false,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex flex-wrap gap-2 max-h-[300px] overflow-auto">
                          {brands.map((brand: IBrand, iBrand: number) => (
                            <div
                              key={iBrand}
                              onClick={() => handleSelectChange("brandid", brand.id)}
                              className={`px-4 py-2 border rounded-lg select-none cursor-pointer shadow hover:shadow-lg relative transition-all ${
                                filter.brandid.includes(brand.id) ? "border-primary bg-red-50" : ""
                              }`}
                            >
                              {brand.name}
                              {filter.brandid.includes(brand.id) && (
                                <div className="absolute top-0 left-0 w-5 h-3 bg-primary rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                  <IoMdCheckmark className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-primary text-primary px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.brandid) {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  brandid: query.brandid.split("-"),
                                });
                              } else {
                                setFilter({ ...filter, page: 1, brandid: [] });
                              }
                              setPopup({ ...popup, brand: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set("brandid", `${filter.brandid.join("-")}`);
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, brand: false });
                            }}
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer ${
                        popup.brand || query.brandid
                          ? "border-primary text-primary"
                          : "text-gray-700"
                      }`}
                    >
                      <p className={`text-base`}>Thương hiệu</p>
                      <IoMdArrowDropdown className={`w-6 h-6`} />
                    </div>
                  </Popover>
                  {/* </SwiperSlide> */}
                  {/* Ram (Bộ nhớ lưu trữ tạm thời) */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.ram}
                    onOpenChange={(e) =>
                      setPopup({
                        price: false,
                        category: false,
                        brand: false,
                        ram: e,
                        storage: false,
                        ssd: false,
                        hdd: false,
                        screenSize: false,
                        refreshRate: false,
                        resolution: false,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex flex-wrap gap-2 max-h-[300px] overflow-auto">
                          {rams.map((ram: IProperty, iRam: number) => (
                            <div
                              key={iRam}
                              onClick={() => handleSelectChange("ramid", ram.id)}
                              className={`px-4 py-2 border rounded-lg select-none cursor-pointer shadow hover:shadow-lg relative transition-all ${
                                filter.ramid.includes(ram.id) ? "border-primary bg-red-50" : ""
                              }`}
                            >
                              {ram.name}
                              {filter.ramid.includes(ram.id) && (
                                <div className="absolute top-0 left-0 w-5 h-3 bg-primary rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                  <IoMdCheckmark className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-primary text-primary px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.ramid) {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  ramid: query.ramid.split("-"),
                                });
                              } else {
                                setFilter({ ...filter, page: 1, ramid: [] });
                              }
                              setPopup({ ...popup, ram: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set("ramid", `${filter.ramid.join("-")}`);
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, ram: false });
                            }}
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer ${
                        popup.ram || query.ramid ? "border-primary text-primary" : "text-gray-700"
                      }`}
                    >
                      <p className={`text-base`}>Ram</p>
                      <IoMdArrowDropdown className={`w-6 h-6`} />
                    </div>
                  </Popover>
                  {/* storage bộ nhớ trong */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.storage}
                    onOpenChange={(e) =>
                      setPopup({
                        price: false,
                        category: false,
                        brand: false,
                        ram: false,
                        storage: e,
                        ssd: false,
                        hdd: false,
                        screenSize: false,
                        refreshRate: false,
                        resolution: false,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex flex-wrap gap-2 max-h-[300px] overflow-auto">
                          {storages.map((storage: IProperty, iRam: number) => (
                            <div
                              key={iRam}
                              onClick={() => handleSelectChange("storageid", storage.id)}
                              className={`px-4 py-2 border rounded-lg select-none cursor-pointer shadow hover:shadow-lg relative transition-all ${
                                filter.storageid.includes(storage.id)
                                  ? "border-primary bg-red-50"
                                  : ""
                              }`}
                            >
                              {storage.name}
                              {filter.storageid.includes(storage.id) && (
                                <div className="absolute top-0 left-0 w-5 h-3 bg-primary rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                  <IoMdCheckmark className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-primary text-primary px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.storageid) {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  storageid: query.storageid.split("-"),
                                });
                              } else {
                                setFilter({ ...filter, page: 1, storageid: [] });
                              }
                              setPopup({ ...popup, storage: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set("storageid", `${filter.storageid.join("-")}`);
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, storage: false });
                            }}
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer ${
                        popup.storage || query.storageid
                          ? "border-primary text-primary"
                          : "text-gray-700"
                      }`}
                    >
                      <p className={`text-base`}>Bộ nhớ trong</p>
                      <IoMdArrowDropdown className={`w-6 h-6`} />
                    </div>
                  </Popover>
                  {/* SSD */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.ssd}
                    onOpenChange={(e) =>
                      setPopup({
                        price: false,
                        category: false,
                        brand: false,
                        ram: false,
                        storage: false,
                        ssd: e,
                        hdd: false,
                        screenSize: false,
                        refreshRate: false,
                        resolution: false,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex flex-wrap gap-2 max-h-[300px] overflow-auto">
                          {ssds.map((ssd: IProperty, iRam: number) => (
                            <div
                              key={iRam}
                              onClick={() => handleSelectChange("ssdid", ssd.id)}
                              className={`px-4 py-2 border rounded-lg select-none cursor-pointer shadow hover:shadow-lg relative transition-all ${
                                filter.ssdid.includes(ssd.id) ? "border-primary bg-red-50" : ""
                              }`}
                            >
                              {ssd.name}
                              {filter.ssdid.includes(ssd.id) && (
                                <div className="absolute top-0 left-0 w-5 h-3 bg-primary rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                  <IoMdCheckmark className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-primary text-primary px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.ssdid) {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  ssdid: query.ssdid.split("-"),
                                });
                              } else {
                                setFilter({ ...filter, page: 1, ssdid: [] });
                              }
                              setPopup({ ...popup, ssd: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set("ssdid", `${filter.ssdid.join("-")}`);
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, ssd: false });
                            }}
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer ${
                        popup.ssd || query.ssdid ? "border-primary text-primary" : "text-gray-700"
                      }`}
                    >
                      <p className={`text-base`}>SSD</p>
                      <IoMdArrowDropdown className={`w-6 h-6`} />
                    </div>
                  </Popover>
                  {/* HDD */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.hdd}
                    onOpenChange={(e) =>
                      setPopup({
                        price: false,
                        category: false,
                        brand: false,
                        ram: false,
                        storage: false,
                        ssd: false,
                        hdd: e,
                        screenSize: false,
                        refreshRate: false,
                        resolution: false,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex flex-wrap gap-2 max-h-[300px] overflow-auto">
                          {hdds.map((hdd: IProperty, iRam: number) => (
                            <div
                              key={iRam}
                              onClick={() => handleSelectChange("hddid", hdd.id)}
                              className={`px-4 py-2 border rounded-lg select-none cursor-pointer shadow hover:shadow-lg relative transition-all ${
                                filter.hddid.includes(hdd.id) ? "border-primary bg-red-50" : ""
                              }`}
                            >
                              {hdd.name}
                              {filter.hddid.includes(hdd.id) && (
                                <div className="absolute top-0 left-0 w-5 h-3 bg-primary rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                  <IoMdCheckmark className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-primary text-primary px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.hddid) {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  hddid: query.hddid.split("-"),
                                });
                              } else {
                                setFilter({ ...filter, page: 1, hddid: [] });
                              }
                              setPopup({ ...popup, hdd: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set("hddid", `${filter.hddid.join("-")}`);
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, hdd: false });
                            }}
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer ${
                        popup.hdd || query.hddid ? "border-primary text-primary" : "text-gray-700"
                      }`}
                    >
                      <p className={`text-base`}>HDD</p>
                      <IoMdArrowDropdown className={`w-6 h-6`} />
                    </div>
                  </Popover>
                  {/* screen_size (Kích thước màn hình) */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.screenSize}
                    onOpenChange={(e) =>
                      setPopup({
                        price: false,
                        category: false,
                        brand: false,
                        ram: false,
                        storage: false,
                        ssd: false,
                        hdd: false,
                        screenSize: e,
                        refreshRate: false,
                        resolution: false,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex flex-wrap gap-2 max-h-[300px] overflow-auto">
                          {screenSizes.map((screenSize: IProperty, iRam: number) => (
                            <div
                              key={iRam}
                              onClick={() => handleSelectChange("screen_sizeid", screenSize.id)}
                              className={`px-4 py-2 border rounded-lg select-none cursor-pointer shadow hover:shadow-lg relative transition-all ${
                                filter.screen_sizeid.includes(screenSize.id)
                                  ? "border-primary bg-red-50"
                                  : ""
                              }`}
                            >
                              {screenSize.name}
                              {filter.screen_sizeid.includes(screenSize.id) && (
                                <div className="absolute top-0 left-0 w-5 h-3 bg-primary rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                  <IoMdCheckmark className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-primary text-primary px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.screen_sizeid) {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  screen_sizeid: query.screen_sizeid.split("-"),
                                });
                              } else {
                                setFilter({ ...filter, page: 1, screen_sizeid: [] });
                              }
                              setPopup({ ...popup, screenSize: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set(
                                "screen_sizeid",
                                `${filter.screen_sizeid.join("-")}`
                              );
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, screenSize: false });
                            }}
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer ${
                        popup.screenSize || query.screen_sizeid
                          ? "border-primary text-primary"
                          : "text-gray-700"
                      }`}
                    >
                      <p className={`text-base`}>Kính thước màn hình</p>
                      <IoMdArrowDropdown className={`w-6 h-6`} />
                    </div>
                  </Popover>
                  {/* refresh_rate (Kích thước màn hình) */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.refreshRate}
                    onOpenChange={(e) =>
                      setPopup({
                        price: false,
                        category: false,
                        brand: false,
                        ram: false,
                        storage: false,
                        ssd: false,
                        hdd: false,
                        screenSize: false,
                        refreshRate: e,
                        resolution: false,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex flex-wrap gap-2 max-h-[300px] overflow-auto">
                          {refreshRates.map((refreshRate: IProperty, iRam: number) => (
                            <div
                              key={iRam}
                              onClick={() => handleSelectChange("refresh_rateid", refreshRate.id)}
                              className={`px-4 py-2 border rounded-lg select-none cursor-pointer shadow hover:shadow-lg relative transition-all ${
                                filter.refresh_rateid.includes(refreshRate.id)
                                  ? "border-primary bg-red-50"
                                  : ""
                              }`}
                            >
                              {refreshRate.name}
                              {filter.refresh_rateid.includes(refreshRate.id) && (
                                <div className="absolute top-0 left-0 w-5 h-3 bg-primary rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                  <IoMdCheckmark className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-primary text-primary px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.refresh_rateid) {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  refresh_rateid: query.refresh_rateid.split("-"),
                                });
                              } else {
                                setFilter({ ...filter, page: 1, refresh_rateid: [] });
                              }
                              setPopup({ ...popup, refreshRate: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set(
                                "refresh_rateid",
                                `${filter.refresh_rateid.join("-")}`
                              );
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, refreshRate: false });
                            }}
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer ${
                        popup.refreshRate || query.refresh_rateid
                          ? "border-primary text-primary"
                          : "text-gray-700"
                      }`}
                    >
                      <p className={`text-base`}>Tần số quét</p>
                      <IoMdArrowDropdown className={`w-6 h-6`} />
                    </div>
                  </Popover>
                  {/* resolution (Dộ phân giải) */}
                  <Popover
                    placement={width < 640 ? "bottom" : "bottomLeft"}
                    title={null}
                    trigger="click"
                    open={popup.resolution}
                    onOpenChange={(e) =>
                      setPopup({
                        price: false,
                        category: false,
                        brand: false,
                        ram: false,
                        storage: false,
                        ssd: false,
                        hdd: false,
                        screenSize: false,
                        refreshRate: false,
                        resolution: e,
                      })
                    }
                    zIndex={20}
                    content={
                      <div className="w-[90vw] max-w-[400px] bg-white rounded-2xl flex flex-col items-center gap-4">
                        <div className="w-full flex flex-wrap gap-2 max-h-[300px] overflow-auto">
                          {resolutions.map((resolution: IProperty, iRam: number) => (
                            <div
                              key={iRam}
                              onClick={() => handleSelectChange("resolutionid", resolution.id)}
                              className={`px-4 py-2 border rounded-lg select-none cursor-pointer shadow hover:shadow-lg relative transition-all ${
                                filter.resolutionid.includes(resolution.id)
                                  ? "border-primary bg-red-50"
                                  : ""
                              }`}
                            >
                              {resolution.name}
                              {filter.resolutionid.includes(resolution.id) && (
                                <div className="absolute top-0 left-0 w-5 h-3 bg-primary rounded-tl-lg rounded-br-lg flex items-center justify-center">
                                  <IoMdCheckmark className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 w-full">
                          <button
                            className="border w-full border-primary text-primary px-4 py-2 rounded-md"
                            onClick={() => {
                              if (query.resolutionid) {
                                setFilter({
                                  ...filter,
                                  page: 1,
                                  resolutionid: query.resolutionid.split("-"),
                                });
                              } else {
                                setFilter({ ...filter, page: 1, resolutionid: [] });
                              }
                              setPopup({ ...popup, resolution: false });
                            }}
                          >
                            Đóng
                          </button>
                          <button
                            onClick={() => {
                              const searchParamsNew = new URLSearchParams(searchParams.toString());
                              searchParamsNew.set(
                                "resolutionid",
                                `${filter.resolutionid.join("-")}`
                              );
                              searchParamsNew.set("page", `1`);
                              router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                              setPopup({ ...popup, resolution: false });
                            }}
                            className="bg-primary w-full text-white px-4 py-2 rounded-md"
                          >
                            Xem kết quả
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <div
                      className={`w-auto flex flex-nowrap items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer ${
                        popup.resolution || query.resolutionid
                          ? "border-primary text-primary"
                          : "text-gray-700"
                      }`}
                    >
                      <p className={`text-base`}>Độ phân giải</p>
                      <IoMdArrowDropdown className={`w-6 h-6`} />
                    </div>
                  </Popover>
                </div>
              </div>
              {(!!query.search ||
                !!query.price ||
                !!query.categoryid ||
                !!query.brandid ||
                !!query.ramid ||
                !!query.storageid ||
                !!query.ssdid ||
                !!query.hddid ||
                !!query.screen_sizeid ||
                !!query.refresh_rateid ||
                !!query.resolutionid) && (
                <div className="flex flex-col gap-3.5">
                  <h3 className="text-lg font-bold">Đang lọc theo</h3>
                  <div className="w-full flex gap-2.5 flex-wrap">
                    {!!query.search && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("search");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          dispatch(actions.set_search(""));
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">Tìm kiếm: {query.search}</p>
                      </div>
                    )}
                    {!!query.price && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("price");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, page: 1, priceMin: 0, priceMax: 100000000 });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          Giá:{" "}
                          <span className="inline">
                            {filter.priceMin.toLocaleString("vi-VN")} đ
                          </span>{" "}
                          -{" "}
                          <span className="inline">
                            {filter.priceMax.toLocaleString("vi-VN")} đ
                          </span>
                        </p>
                      </div>
                    )}
                    {!!query.categoryid && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("categoryid");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, categoryid: [] });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          Danh mục:{" "}
                          <span className="inline">
                            {categories
                              .filter((category: ICategory) =>
                                query.categoryid.includes(category.id)
                              )
                              .map((category: ICategory) => category.name)
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    )}
                    {!!query.brandid && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("brandid");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, page: 1, brandid: [] });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          Danh mục:{" "}
                          <span className="inline">
                            {brands
                              .filter((brand: IBrand) => query.brandid.includes(brand.id))
                              .map((brand: IBrand) => brand.name)
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    )}
                    {!!query.ramid && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("ramid");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, page: 1, ramid: [] });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          Dung lượng RAM:{" "}
                          <span className="inline">
                            {rams
                              .filter((ram: IProperty) => query.ramid.includes(ram.id))
                              .map((ram: IProperty) => ram.name)
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    )}
                    {!!query.storageid && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("storageid");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, page: 1, storageid: [] });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          Bộ nhớ trong:{" "}
                          <span className="inline">
                            {storages
                              .filter((storage: IProperty) => query.storageid.includes(storage.id))
                              .map((storage: IProperty) => storage.name)
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    )}
                    {!!query.ssdid && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("ssdid");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, page: 1, ssdid: [] });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          SSD:{" "}
                          <span className="inline">
                            {ssds
                              .filter((ssd: IProperty) => query.ssdid.includes(ssd.id))
                              .map((ssd: IProperty) => ssd.name)
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    )}
                    {!!query.hddid && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("hddid");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, page: 1, hddid: [] });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          HDD:{" "}
                          <span className="inline">
                            {hdds
                              .filter((hdd: IProperty) => query.hddid.includes(hdd.id))
                              .map((hdd: IProperty) => hdd.name)
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    )}
                    {!!query.screen_sizeid && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("screen_sizeid");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, page: 1, screen_sizeid: [] });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          Kích thước màn hình:{" "}
                          <span className="inline">
                            {screenSizes
                              .filter((screenSize: IProperty) =>
                                query.screen_sizeid.includes(screenSize.id)
                              )
                              .map((screenSize: IProperty) => screenSize.name)
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    )}
                    {!!query.refresh_rateid && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("refresh_rateid");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, page: 1, refresh_rateid: [] });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          Tần số quét:{" "}
                          <span className="inline">
                            {refreshRates
                              .filter((refreshRate: IProperty) =>
                                query.refresh_rateid.includes(refreshRate.id)
                              )
                              .map((refreshRate: IProperty) => refreshRate.name)
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    )}
                    {!!query.resolutionid && (
                      <div
                        className="!w-auto !flex flex-nowrap items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                        onClick={() => {
                          const searchParamsNew = new URLSearchParams(searchParams.toString());
                          searchParamsNew.delete("resolutionid");
                          searchParamsNew.set("page", `1`);
                          router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                          setFilter({ ...filter, page: 1, resolutionid: [] });
                        }}
                      >
                        <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                        <p className="text-base text-red-500">
                          Độ phân giải:{" "}
                          <span className="inline">
                            {resolutions
                              .filter((resolution: IProperty) =>
                                query.resolutionid.includes(resolution.id)
                              )
                              .map((resolution: IProperty) => resolution.name)
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    )}
                    <div
                      className="!w-auto !flex flex-nowrap items-center select-none gap-1.5 px-2.5 py-2 shadow-lg cursor-pointer border border-red-500 bg-red-50 rounded-lg"
                      onClick={() => {
                        const searchParamsNew = new URLSearchParams(searchParams.toString());
                        searchParamsNew.delete("search");
                        searchParamsNew.delete("price");
                        searchParamsNew.delete("categoryid");
                        searchParamsNew.delete("brandid");
                        searchParamsNew.delete("ramid");
                        searchParamsNew.delete("storageid");
                        searchParamsNew.delete("ssdid");
                        searchParamsNew.delete("hddid");
                        searchParamsNew.delete("screen_sizeid");
                        searchParamsNew.delete("refresh_rateid");
                        searchParamsNew.delete("resolutionid");
                        searchParamsNew.set("page", `1`);
                        router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                        setFilter({
                          ...filter,
                          priceMin: 0,
                          priceMax: 100000000,
                          categoryid: [],
                          brandid: [],
                          ramid: [],
                          storageid: [],
                          ssdid: [],
                          hddid: [],
                          screen_sizeid: [],
                          refresh_rateid: [],
                          resolutionid: [],
                        });
                        dispatch(actions.set_search(""));
                      }}
                    >
                      <IoCloseOutline className="w-6 h-6 text-red-500" />
                      <p className="text-base text-red-500">Bỏ chọn tất cả</p>
                    </div>
                  </div>
                </div>
              )}
              {/* sắp xếp */}
              <div className="flex flex-col gap-3.5">
                <h3 className="text-lg font-bold">Sắp xếp theo</h3>
                <div className="w-full flex gap-2.5 flex-wrap">
                  {/* Giá cao - Thấp */}
                  <div
                    onClick={() => {
                      const searchParamsNew = new URLSearchParams(searchParams.toString());
                      searchParamsNew.set("orderby", `price-desc`);
                      searchParamsNew.set("page", `1`);
                      router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                    }}
                    className={`!w-auto !flex shrink-0 items-center gap-1.5 px-2.5 py-2 shadow-lg border select-none hover:shadow-xl transition-all rounded-lg cursor-pointer ${
                      query.orderby === "price-desc"
                        ? "border-primary text-primary"
                        : "text-gray-700"
                    }`}
                  >
                    <BsSortDown className={`w-6 h-6 `} />
                    <p>
                      Giá: <span className="inline">Giá cao</span> -{" "}
                      <span className="inline">Thấp</span>
                    </p>
                  </div>
                  {/* Giá thấp - Cao */}
                  <div
                    onClick={() => {
                      const searchParamsNew = new URLSearchParams(searchParams.toString());
                      searchParamsNew.set("orderby", `price-asc`);
                      searchParamsNew.set("page", `1`);
                      router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                    }}
                    className={`!w-auto !flex shrink-0 items-center gap-1.5 px-2.5 py-2 shadow-lg border select-none hover:shadow-xl transition-all rounded-lg cursor-pointer ${
                      query.orderby === "price-asc"
                        ? "border-primary text-primary"
                        : "text-gray-700"
                    }`}
                  >
                    <BsSortDownAlt className={`w-6 h-6 `} />
                    <p>
                      Giá: <span className="inline">Giá thấp</span> -{" "}
                      <span className="inline">Cao</span>
                    </p>
                  </div>
                  {/* Khuyến mãi */}
                  <div
                    onClick={() => {
                      const searchParamsNew = new URLSearchParams(searchParams.toString());
                      searchParamsNew.set("orderby", `sale-desc`);
                      searchParamsNew.set("page", `1`);
                      router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                    }}
                    className={`!w-auto !flex shrink-0 items-center gap-1.5 px-2.5 py-2 shadow-lg border select-none hover:shadow-xl transition-all rounded-lg cursor-pointer ${
                      query.orderby === "sale-desc"
                        ? "border-primary text-primary"
                        : "text-gray-700"
                    }`}
                  >
                    <AiOutlinePercentage className={`w-6 h-6 `} />
                    <p>Khuyến mãi</p>
                  </div>
                  {/* Mới nhất */}
                  <div
                    onClick={() => {
                      const searchParamsNew = new URLSearchParams(searchParams.toString());
                      searchParamsNew.set("orderby", `id-desc`);
                      searchParamsNew.set("page", `1`);
                      router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                    }}
                    className={`!w-auto !flex shrink-0 items-center gap-1.5 px-2.5 py-2 shadow-lg border select-none hover:shadow-xl transition-all rounded-lg cursor-pointer ${
                      query.orderby === "id-desc" ? "border-primary text-primary" : "text-gray-700"
                    }`}
                  >
                    <IoIosTrendingUp className={`w-6 h-6 x`} />
                    <p>Mới nhất</p>
                  </div>
                  {/* Xem nhiều */}
                  <div
                    onClick={() => {
                      const searchParamsNew = new URLSearchParams(searchParams.toString());
                      searchParamsNew.set("orderby", `view-desc`);
                      searchParamsNew.set("page", `1`);
                      router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                    }}
                    className={`!w-auto !flex shrink-0 items-center gap-1.5 px-2.5 py-2 shadow-lg border select-none hover:shadow-xl transition-all rounded-lg cursor-pointer ${
                      query.orderby === "view-desc"
                        ? "border-primary text-primary"
                        : "text-gray-700"
                    }`}
                  >
                    <MdRemoveRedEye className={`w-6 h-6 x`} />
                    <p>Xem nhiều</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        {/* Show sản phẩm */}
        <section className="py-4 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 flex-wrap">
            {!state.load && products.length === 0 && (
              <div className="col-span-5 h-[400px] center-flex flex-col gap-4">
                <TbMoodEmpty className="w-36 h-36 text-gray-300" />
                <p className="text-3xl text-gray-400 font-medium">Không tìm thấy sản phẩm !</p>
              </div>
            )}
            {state.load && (
              <>
                <ProductLoad />
                <ProductLoad />
                <ProductLoad />
                <ProductLoad />
                <div className="hidden md:flex">
                  <ProductLoad />
                </div>
                <div className="hidden md:flex">
                  <ProductLoad />
                </div>
                <div className="hidden lg:flex">
                  <ProductLoad />
                </div>
                <div className="hidden lg:flex">
                  <ProductLoad />
                </div>
                <div className="hidden xl:flex">
                  <ProductLoad />
                </div>
                <div className="hidden xl:flex">
                  <ProductLoad />
                </div>
              </>
            )}
            {products.map((product: IProduct) => (
              <Fragment key={product.id}>
                <Product product={product} />
              </Fragment>
            ))}
          </div>
          <div className="flex items-center justify-center  mt-4">
            {totalPages > query.limit && (
              <Pagination
                onChange={(page) => {
                  const searchParamsNew = new URLSearchParams(searchParams.toString());
                  searchParamsNew.set("page", `${page}`);
                  router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                }}
                current={query.page}
                defaultCurrent={1}
                pageSize={query.limit}
                total={totalPages}
                showSizeChanger={false}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Products;
