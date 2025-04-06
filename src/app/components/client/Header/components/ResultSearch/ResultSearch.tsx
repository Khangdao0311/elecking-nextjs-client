"use clent";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TbMoodEmpty } from "react-icons/tb";
import { usePathname } from "next/navigation";

import config from "@/app/config";
import { useDebounce } from "@/app/hooks";
import { useStore, actions } from "@/app/store";
import * as productServices from "@/app/services/productService";

function ResultSearch({ onClose }: any) {
  const [state, dispatch] = useStore();
  const [searchResult, setSearchResult] = useState<IProduct[]>([]);
  const pathname = usePathname();

  const debouncedValue = useDebounce(state.search, 500);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      productServices.getQuery({ orderby: "view-desc", page: 1, limit: 5 }).then((res) => {
        setSearchResult(res.data);
      });
      return;
    }

    productServices
      .getQuery({ search: debouncedValue, orderby: "view-desc", page: 1, limit: 5 })
      .then((res) => {
        setSearchResult(res.data);
      });
  }, [debouncedValue]);

  return (
    <div className="w-[80vw] max-w-[460px] md:max-w-[560px] flex flex-col ">
      <p className=" px-4 py-2 bg-gray-100 text-sm shrink-0 font-medium">Sản phẩm gợi ý:</p>
      <div className="w-full h-full flex flex-col overflow-auto">
        {searchResult.length === 0 && (
          <div className="w-full min-h-40 p-20 center-flex flex-col gap-2">
            <TbMoodEmpty className="w-36 h-36 text-gray-300" />
            <p className="text-3xl text-center text-gray-400 font-medium">
              Không tìm thấy sản phẩm "{debouncedValue}"
            </p>
          </div>
        )}
        {searchResult.map((product: IProduct, iProduct: number) => (
          <Link
            onClick={() => {
              onClose();
              if (!pathname.startsWith(config.routes.client.productDetail))
                dispatch(actions.set_routing(true));
            }}
            href={`${config.routes.client.productDetail}/${product.id}`}
            className="px-6 py-2 flex gap-4 hover:bg-gray-100 cursor-pointer"
            key={iProduct}
          >
            <img className="w-16 h-16 rounded" src={product.variants[0]?.colors[0]?.image} alt="" />
            <div className="flex w-full flex-col gap-2">
              <p className="font-bold text-base">{product.name}</p>
              <div className="text-primary text-base font-bold flex gap-2 items-center">
                {(
                  product.variants[0]?.price -
                  product.variants[0]?.price_sale +
                  product.variants[0]?.colors[0]?.price_extra
                ).toLocaleString("vi-VN")}

                {product.variants[0]?.price_sale !== 0 && (
                  <del className="text-gray-700 text-sm font-normal ">
                    {(product.variants[0]?.price || 0).toLocaleString("vi-VN")}đ
                  </del>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ResultSearch;
