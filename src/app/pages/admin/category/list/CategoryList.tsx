import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { Pagination } from "antd";
function CategoryList() {
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-1 min-w-[300px] text-center">
                <div className="flex items-center min-w-[300px] justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5 w-[353px]"><span>Điện thoại</span></td>
              <td className="px-2 min-w-[300px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
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
          </tbody>
        </table>
        <div className="flex w-full justify-end"><Pagination defaultCurrent={1} align="end" total={500} showSizeChanger={false}/></div>

      </div>
    </>
  );
}
export default CategoryList;