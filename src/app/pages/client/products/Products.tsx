"use client";

import { Pagination, Popover, Slider } from "antd";
import { Fragment, useEffect, useState } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdCheckmark } from "react-icons/io";
import { IoCloseCircle, IoCloseOutline } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { TbMoodEmpty } from "react-icons/tb";

import Product from "@/app/components/client/Product";
import * as productServices from "@/app/services/productService";
import * as categoryServices from "@/app/services/categoryService";
import * as brandServices from "@/app/services/brandService";
import * as userServices from "@/app/services/userService";
import ProductLoad from "@/app/components/client/ProductLoad";
import { useStore } from "@/app/store";
import Shimmer from "@/app/components/client/Shimmer";

function Products() {
  const [state, dispatch] = useStore();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [popup, setPopup] = useState({
    price: false,
    category: false,
    brand: false,
  });
  const [filter, setFilter] = useState<any>({
    priceMin: 0,
    priceMax: 50000000,
    categoryid: [],
    brandid: [],
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const query: any = {};

  query.page = searchParams.get("page") || 1;
  query.limit = searchParams.get("limit") || 15;
  query.orderby = searchParams.get("orderby") || "view-desc";

  if (searchParams.get("search")) query.search = searchParams.get("search");
  if (searchParams.get("categoryid")) query.categoryid = searchParams.get("categoryid");
  if (searchParams.get("brandid")) query.brandid = searchParams.get("brandid");
  if (searchParams.get("price")) query.price = searchParams.get("price");

  useEffect(() => {
    if (query.categoryid) {
      setFilter({ ...filter, categoryid: query.categoryid.split("-") });
    }

    if (query.brandid) {
      setFilter({ ...filter, brandid: query.brandid.split("-") });
    }

    if (query.price) {
      const [min, max] = query.price.split("-");
      setFilter({ ...filter, priceMin: +min, priceMax: +max });
    }

    router.push(`?${new URLSearchParams(query).toString()}`);
    productServices.getQuery(query).then((res) => {
      setProducts(res.data);
      setTotalPages(res.total);
    });
  }, [searchParams]);

  // Lấy danh sách danh mục và thương hiệu
  useEffect(() => {
    categoryServices
      .getQuery({ limit: 0, orderby: "id-asc" })
      .then((res) => setCategories(res.data));
    brandServices.getQuery({ limit: 0, orderby: "id-asc" }).then((res) => setBrands(res.data));
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
              <div className="flex gap-4">
                {/* Giá */}
                <Popover
                  placement="bottomLeft"
                  title={null}
                  trigger="click"
                  open={popup.price}
                  onOpenChange={(e) => setPopup({ ...popup, price: e })}
                  zIndex={20}
                  content={
                    <div className=" bg-white rounded-2xl flex flex-col items-center gap-4">
                      <div className="w-[416px] flex items-center justify-between">
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
                          max={50000000}
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
                              setFilter({ ...filter, page: 1, priceMin: 0, priceMax: 50000000 });
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
                    className={`flex items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer
                ${popup.price || query.price ? "border-primary text-primary" : "text-gray-700"}
                `}
                  >
                    <FaMoneyBill className={`w-6 h-6`} />
                    <p className={`text-base `}>Giá</p>
                  </div>
                </Popover>
                {/* Danh mục */}
                <Popover
                  placement="bottomLeft"
                  title={null}
                  trigger="click"
                  open={popup.category}
                  onOpenChange={(e) => setPopup({ ...popup, category: e })}
                  zIndex={20}
                  content={
                    <div className=" bg-white rounded-2xl flex flex-col items-center gap-4">
                      <div className="w-[416px] flex flex-wrap gap-2">
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
                    className={`flex items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer
                ${
                  popup.category || query.categoryid
                    ? "border-primary text-primary"
                    : "text-gray-700"
                }
                `}
                  >
                    <p className={`text-base`}>Danh mục</p>
                    <IoMdArrowDropdown className={`w-6 h-6`} />
                  </div>
                </Popover>
                {/* Thương hiệu */}
                <Popover
                  placement="bottomLeft"
                  title={null}
                  trigger="click"
                  open={popup.brand}
                  onOpenChange={(e) => setPopup({ ...popup, brand: e })}
                  zIndex={20}
                  content={
                    <div className=" bg-white rounded-2xl flex flex-col items-center gap-4">
                      <div className="w-[416px] flex flex-wrap gap-2">
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
                              setFilter({ ...filter, page: 1, brandid: query.brandid.split("-") });
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
                    className={`flex items-center gap-1.5 px-4 py-2 shadow-lg select-none border transition-all duration-300 rounded-lg cursor-pointer
                ${popup.brand || query.brandid ? "border-primary text-primary" : "text-gray-700"}
                `}
                  >
                    <p className={`text-base`}>Thương hiệu</p>
                    <IoMdArrowDropdown className={`w-6 h-6`} />
                  </div>
                </Popover>
              </div>
            </div>
            {(!!query.price || !!query.categoryid || !!query.brandid) && (
              <div className="flex flex-col gap-3.5">
                <h3 className="text-lg font-bold">Đang lọc theo</h3>
                <div className="flex gap-4">
                  {!!query.price && (
                    <div
                      onClick={() => {
                        const searchParamsNew = new URLSearchParams(searchParams.toString());
                        searchParamsNew.delete("price");
                        searchParamsNew.set("page", `1`);
                        router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                        setFilter({ ...filter, page: 1, priceMin: 0, priceMax: 50000000 });
                      }}
                      className="flex items-center select-none cursor-pointer gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                    >
                      <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                      <p className="text-base text-red-500">
                        Giá:{" "}
                        <span className="inline">{filter.priceMin.toLocaleString("vi-VN")} đ</span>{" "}
                        -{" "}
                        <span className="inline">{filter.priceMax.toLocaleString("vi-VN")} đ</span>
                      </p>
                    </div>
                  )}

                  {!!query.categoryid && (
                    <div
                      onClick={() => {
                        const searchParamsNew = new URLSearchParams(searchParams.toString());
                        searchParamsNew.delete("categoryid");
                        searchParamsNew.set("page", `1`);
                        router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                        setFilter({ ...filter, categoryid: [] });
                      }}
                      className="flex items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
                    >
                      <IoCloseCircle className="w-6 h-6 text-red-500 cursor-pointer" />
                      <p className="text-base text-red-500">
                        Danh mục:{" "}
                        <span className="inline">
                          {categories
                            .filter((category: ICategory) => query.categoryid.includes(category.id))
                            .map((category: ICategory) => category.name)
                            .join(", ")}
                        </span>
                      </p>
                    </div>
                  )}
                  {!!query.brandid && (
                    <div
                      onClick={() => {
                        const searchParamsNew = new URLSearchParams(searchParams.toString());
                        searchParamsNew.delete("brandid");
                        searchParamsNew.set("page", `1`);
                        router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                        setFilter({ ...filter, page: 1, brandid: [] });
                      }}
                      className="flex items-center select-none cursor-pointer  gap-1.5 px-2.5 py-2 shadow-lg border border-red-500 bg-red-50 rounded-lg  hover:shadow-xl transition-all"
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
                  {(!!query.price || !!query.categoryid || !!query.brandid) && (
                    <div
                      onClick={() => {
                        const searchParamsNew = new URLSearchParams(searchParams.toString());
                        searchParamsNew.delete("price");
                        searchParamsNew.delete("categoryid");
                        searchParamsNew.delete("brandid");
                        searchParamsNew.set("page", `1`);
                        router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                        setFilter({
                          ...filter,
                          page: 1,
                          priceMin: 0,
                          priceMax: 50000000,
                          categoryid: [],
                          brandid: [],
                        });
                      }}
                      className="flex items-center  select-none gap-1.5 px-2.5 py-2 shadow-lg cursor-pointer border border-red-500 bg-red-50 rounded-lg"
                    >
                      <IoCloseOutline className="w-6 h-6 text-red-500" />
                      <p className="text-base text-red-500">Bỏ chọn tất cả</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* sắp xếp */}
            <div className="flex flex-col gap-3.5">
              <h3 className="text-lg font-bold">Sắp xếp theo</h3>
              <div className="flex gap-4">
                {/* Giá cao - Thấp */}
                <div
                  onClick={() => {
                    const searchParamsNew = new URLSearchParams(searchParams.toString());
                    searchParamsNew.set("orderby", `price-desc`);
                    searchParamsNew.set("page", `1`);
                    router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-2 shadow-lg border select-none hover:shadow-xl transition-all rounded-lg cursor-pointer ${
                    query.orderby === "price-desc" ? "border-primary text-primary" : "text-gray-700"
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
                  className={`flex items-center gap-1.5 px-2.5 py-2 shadow-lg border select-none hover:shadow-xl transition-all rounded-lg cursor-pointer ${
                    query.orderby === "price-asc" ? "border-primary text-primary" : "text-gray-700"
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
                  className={`flex items-center gap-1.5 px-2.5 py-2 shadow-lg border select-none hover:shadow-xl transition-all rounded-lg cursor-pointer ${
                    query.orderby === "sale-desc" ? "border-primary text-primary" : "text-gray-700"
                  }`}
                >
                  <AiOutlinePercentage className={`w-6 h-6 `} />
                  <p>Khuyến mãi</p>
                </div>

                {/* Xem nhiều */}
                <div
                  onClick={() => {
                    const searchParamsNew = new URLSearchParams(searchParams.toString());
                    searchParamsNew.set("orderby", `view-desc`);
                    searchParamsNew.set("page", `1`);
                    router.push(`?${searchParamsNew.toString()}`, { scroll: false });
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-2 shadow-lg border select-none hover:shadow-xl transition-all rounded-lg cursor-pointer ${
                    query.orderby === "view-desc" ? "border-primary text-primary" : "text-gray-700"
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
        <div className="grid grid-cols-5 gap-2.5 flex-wrap">
          {!state.load && products.length === 0 && (
            <div className="col-span-5 h-[400px] center-flex flex-col gap-4">
              <TbMoodEmpty className="w-36 h-36 text-gray-300" />
              <p className="text-3xl text-gray-400 font-medium">Không tìm thấy sản phẩm !</p>
            </div>
          )}
          {state.load &&
            Array.from({ length: query.limit }).map((_, i: number) => (
              <Fragment key={i}>
                <ProductLoad />
              </Fragment>
            ))}
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
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;
