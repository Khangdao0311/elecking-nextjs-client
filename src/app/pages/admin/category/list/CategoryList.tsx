"use client"
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import * as categoryServices from "@/app/services/categoryService";
import Statuscategory from "@/app/pages/admin/Components/Status"

function CategoryList() {
  const [limit, setLimit] = useState();
  const [search, setSearch] = useState();
   const [categories, setCategories] = useState([]);
  useEffect(()=> {
      const query: any ={};
      query.limit = limit;
      if(0){
        query.search = search;
      }
      categoryServices.getQuery(query).then((res)=> setCategories(res.data))
    },[])
    console.log(categories);
  return (
    <>
      <TitleAdmin title="Danh Sách Danh Mục" />
      <Boxsearchlimit title="danh mục"/>
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded">
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo danh mục mới</p>
        </div>
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-2 py-2.5 min-w-12 text-sm font-bold">STT</th>
              <th className=" min-w-[300px] px-2 py-2.5  text-sm font-bold">Ảnh</th>
              <th className="px-2 py-2.5 w-[353px] text-left text-sm font-bold line-clamp-1">
                Tên Danh Mục
              </th>
              <th className="px-2 py-2.5 min-w-[300px] text-sm font-bold">Trạng Thái</th>
              <th className="px-2 py-2.5  w-full text-sm font-bold">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: ICategory)=>{
              let text = ""
              switch (category.status) {
                case 0:
                  text = "Ngưng hoạt động"
                  break;
                case 1:
                  text = "Đang hoạt động"
                  break;
                case 2:
                  text = "Chờ xác nhận"
                  break;
                case 3:
                  text = "Đang vận chuyển"
                default:
                  break;
              }
              return(
                <tr key={category.id} className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src={category.image}
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>{category.name}</span></td>
              <td className="px-20  py-2.5 text-center">
              <Statuscategory status={category.status} text={text}/>
              </td>
              <td className="p-2 w-full">
                <div className="flex items-center justify-center gap-2">
                  <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                  <FiEdit className="w-5 h-5"/>
                  </button>
                  <button className="w-6 h-6 bg-red-100 rounded text-red-800 center-flex">
                  <MdDeleteForever className="w-5 h-5"/>
                  </button>
                </div>
              </td>
            </tr>
              )
            })}
            
          </tbody>
        </table>
        <div className="flex w-full justify-end"><Pagination defaultCurrent={1} align="end" total={500} showSizeChanger={false}/></div>
      </div>
    </>
  );
}
export default CategoryList;