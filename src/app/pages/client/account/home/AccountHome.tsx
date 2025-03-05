"use client";
import images from "@/app/assets/image";
import Sidebar from "@/app/components/client/Sidebar_user";
import { FaAngleRight, FaFireFlameCurved, FaUser } from "react-icons/fa6";
import HeaderUser from "../Components/HeaderUser";
import Product from "@/app/components/client/Product";
import { Fragment, useEffect, useState } from "react";
import * as productServices from "@/app/services/productService";
import { MdArrowForwardIos } from "react-icons/md";

function AccountHome() {
  const [productHot, setProductHot] = useState([]);
  useEffect(() => {
    const query = { orderby: "view-desc" };
    productServices.getQuery(query).then((res) => setProductHot(res.data));
  }, []);
  
  return (
    <>
      <div className="container-custom flex gap-4 py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <Sidebar />
        <div className="w-[9/12px] flex flex-col gap-4">
          {/* đây */}
          <HeaderUser />
          <div className="w-full">
            <img src={images.banneruserhome} alt="" className="w-full" />
          </div>
          <div className="bg-primary flex-col gap-4 p-4 rounded">
            <div className="flex justify-between items-center px-2 p-2">
              <div className="flex gap-1">
                <div className="w-[48px] h-[48px]">
                  <FaFireFlameCurved className="text-white w-[33px] h-[42px]" />
                </div>
                <p className="text-4xl font-bold text-white">HOT SALE</p>
              </div>
              <div className="flex gap-1 items-center">
                <p className="text-base font-medium underline text-white italic">
                  Xem tất cả
                </p>
                <MdArrowForwardIos className="text-white w-5 h-5" />
              </div>
            </div>
            <div className="grid grid-cols-3 container-custom gap-2.5">
              {productHot.map((product: IProduct) => (
                <Fragment key={product.id}>
                  <Product product={product} />
                </Fragment>
              ))}
            </div>
          </div>
          <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 flex justify-between  items-center">
          <div className="flex gap-1.5 ">
            <p className="text-4xl font-bold text-black">
              YÊU THÍCH
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <em className="underline text-gray-500 drop-shadow-md text-base font-medium">
              Xem tất cả{" "}
            </em>
            <MdArrowForwardIos className="text-gray-500 drop-shadow-md w-5 h-5" />
          </div>
        </div>
        <div className="grid grid-cols-3 container-custom gap-4">
          {/* {productLaptop.map((product: IProduct) => (
            <Fragment key={product.id}>
              <Product product={product} />
            </Fragment>
          ))} */}
        </div>
      </section>
        </div>
      </div>
    </>
  );
}

export default AccountHome;
