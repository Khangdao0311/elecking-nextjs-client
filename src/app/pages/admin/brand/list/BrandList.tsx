"use client";

import { FiEdit } from "react-icons/fi";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import Statusbrand from "@/app/pages/admin/Components/Status";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import * as brandServices from "@/app/services/brandService";
import { Pagination } from "antd";
import config from "@/app/config";
import Link from "next/link";
function BrandList() {
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  
  console.log(page);

  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    query.page = page;
    if (search != "") {
      query.search = search;
    }
    brandServices.getQuery(query).then((res) => {
      setBrands(res.data);
      setTotalPages(res.total);
    });
  }, [limit, page, search]);
  console.log(brands);
  return (
    <>
      <TitleAdmin title="Danh Sách Thương Hiệu" />
      <Boxsearchlimit title="thương hiệu" onLimitChange={(newLimit:any) =>{setLimit(newLimit); setPage(1)}} onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}/>
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <Link href={config.routes.admin.brand.add} className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded">
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo thương hiệu mới</p>
        </Link>
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-2 py-2.5 min-w-12 text-sm font-bold">STT</th>
              <th className="px-2 py-2.5 w-[240px] text-left text-sm font-bold line-clamp-1">
                Tên Thương Hiệu
              </th>
              <th className=" min-w-[120px] px-2 py-2.5  text-sm font-bold">
                Logo
              </th>
              <th className=" min-w-[240px] px-2 py-2.5  text-sm font-bold">
                Ảnh Bìa
              </th>
              <th className=" min-w-full px-2 py-2.5  text-sm font-bold">
                Ảnh Bìa
              </th>
              <th className="px-2 py-2.5 min-w-[140px] text-sm font-bold">
                Trạng Thái
              </th>
              <th className="px-2 py-2.5 min-w-[96px] text-sm font-bold">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand: IBrand, iBrand: number) => {
              let text = "";
              switch (brand.status) {
                case 0:
                  text = "Ngưng hoạt động";
                  break;
                case 1:
                  text = "Đang hoạt động";
                  break;
                case 2:
                  text = "Chờ xác nhận";
                  break;
                case 3:
                  text = "Đang vận chuyển";
                default:
                  break;
              }
              return (
                <tr key={brand.id} className="even:bg-gray-100">
                  <td className="px-2 py-2.5 w-12 text-center">
                    {(page - 1) * limit + iBrand + 1}
                  </td> 
                  <td className="px-2 py-2.5 w-[240px]">
                    <span>{brand.name}</span>
                  </td>
                  <td className="px-2 py-1 min-w-[120px] text-center">
                    <div className="flex items-center min-w-[120px] justify-center">
                      <img
                        src={
                          brand.logo !== ""
                            ? brand.logo
                            : "https://vawr.vn/images/logo-google.png"
                        }
                        alt="Điện thoại"
                        className=" h-8 rounded"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-1 min-w-[240px] text-center">
                    <div className="flex items-center min-w-[240px] justify-center">
                      <img
                        src={
                          brand.banner !== ""
                            ? brand.banner
                            : "https://vawr.vn/images/logo-google.png"
                        }
                        alt="banner"
                        className=" h-8 rounded"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-2.5 w-full">
                    <span className="line-clamp-1">{brand.description}</span>
                  </td>
                  <td className="px-20w-[140px]  py-2.5 text-center">
                    <Statusbrand status={brand.status} text={text} />
                  </td>
                  <td className="p-2 w-[96px]">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`${config.routes.admin.brand.edit}/${brand.id}`} className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                        <FiEdit className="w-5 h-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {totalPages > limit &&(
            <div className="flex w-full justify-end">
          <Pagination
          current={page}
            onChange={(e) => setPage(e)}
            defaultCurrent={1}
            align="end"
            pageSize={limit}
            total={totalPages}
            showSizeChanger={false}
          />
        </div>
        )}
        
      </div>
    </>
  );
}
export default BrandList;
