"use client";
import Link from "next/link";
import { FaRegHeart, FaStar, FaRegStar, FaHeart } from "react-icons/fa6";
import { Fragment, useEffect, useState } from "react";

import config from "@/app/config";
import * as authServices from "@/app/services/authService";
import { useStore, actions } from "@/app/store";

function Product(props: { product: IProduct; userId: string }) {
  const [state, dispatch] = useStore();

  function handleAddToWish(id: string) {
    authServices.wish(props.userId, id).then((res) => {
      dispatch(actions.load());
    });
  }

  function handleRemoveFromWish(id: string) {
    authServices.wish(props.userId, id).then((res) => {
      dispatch(actions.load());
    });
  }

  return (
    <div className="border rounded-2xl shadow-lg p-4 w-full bg-white flex flex-wrap gap-2 cursor-pointer transition-all duration-150 hover:scale-[1.02] hover:border-primary hover:shadow-2xl  ">
      <Link
        href={`${config.routes.client.productDetail}/${props.product.id}`}
        className="w-full aspect-square"
      >
        <img
          className="w-full h-full object-contain"
          src={props.product.variants[0].colors[0].image}
          alt=""
        />
      </Link>
      <Link
        href={`${config.routes.client.productDetail}/${props.product.id}`}
        className="text-base w-full h-12 line-clamp-2 font-medium"
      >
        {props.product.name}
      </Link>
      <div className="text-lg text-primary font-bold w-full">
        {(props.product.variants[0].price - props.product.variants[0].price_sale).toLocaleString(
          "vi-VN"
        )}{" "}
        đ
      </div>
      <div className="flex gap-2.5">
        {props.product.variants[0].price - props.product.variants[0].price_sale <
          props.product.variants[0].price && (
          <del className="text-base font-normal text-gray-400">
            {props.product.variants[0].price.toLocaleString("vi-VN")} đ
          </del>
        )}
        {Math.ceil(
          100 -
            ((props.product.variants[0].price - props.product.variants[0].price_sale) /
              props.product.variants[0].price) *
              100
        ) > 0 && (
          <div className="bg-primary text-white px-1.5 py-1 rounded-md text-xs font-bold">
            {Math.ceil(
              100 -
                ((props.product.variants[0].price - props.product.variants[0].price_sale) /
                  props.product.variants[0].price) *
                  100
            )}{" "}
            %
          </div>
        )}
      </div>
      <div className="flex justify-between w-full">
        <div className="center-flex justify-start ">
          {props.product.rating !== null && (
            <Fragment>
              {Array.from({ length: props.product.rating }).map((_, i: number) => (
                <FaStar className="w-4 h-4 text-yellow-500" key={i} />
              ))}
              {Array.from({ length: 5 - props.product.rating }).map((_, i: number) => (
                <FaRegStar key={i} className="w-4 h-4 text-yellow-500" />
              ))}
              <span className="text-xs">( {props.product.rating} )</span>
            </Fragment>
          )}
        </div>
        <div className="center-flex gap-1 cursor-pointer">
          <p className="text-gray-700">Yêu thích</p>
          {state.wish.includes(props.product.id) ? (
            <div className="group relative" onClick={() => handleRemoveFromWish(props.product.id)}>
              <FaHeart className="text-primary group-hover:scale-125 transition-all duration-300" />
              <FaHeart className="hidden absolute inset-0 animate-ping group-hover:block text-primary" />
            </div>
          ) : (
            <div className="group relative" onClick={() => handleAddToWish(props.product.id)}>
              <FaRegHeart className="text-primary group-hover:scale-125 transition-all duration-300" />
              <FaHeart className="hidden absolute inset-0 animate-ping group-hover:block text-primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
