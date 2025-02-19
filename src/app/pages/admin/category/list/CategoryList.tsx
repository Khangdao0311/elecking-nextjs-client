import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { Pagination } from "antd";
function CategoryList() {
  return (
    <>
      <TitleAdmin title="Danh Sách Danh Mục" />
      <div className="flex items-center bg-white shadow-xl rounded-lg px-7 py-3 justify-between">
        <div className="flex gap-4 items-center">
          <p>Tìm kiếm:</p>
          <input type="text" className="w-80 h-8 border rounded outline-none" />
        </div>
        <div className="flex gap-2">
          <p>Hiện</p>
          <select name="" id="" className="px-4 border rounded-lg">
            <option value="">10</option>
          </select>
          <p>sản phẩm</p>
        </div>
      </div>
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded">
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo sản phẩm mới</p>
        </div>
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-2 py-2.5 w-12 text-sm font-bold">STT</th>
              <th className="px-2 py-2.5 text-left text-sm font-bold">
                Mã Danh Mục
              </th>
              <th className="px-2 py-2.5 w-16 text-sm font-bold">Ảnh</th>
              <th className="px-2 py-2.5 text-left text-sm font-bold line-clamp-1">
                Tên Danh Mục
              </th>
              <th className="px-2 py-2.5 text-sm font-bold">Trạng Thái</th>
              <th className="px-2 py-2.5 w-24 text-sm font-bold">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 text-center">1</td>
              <td className="px-2 py-2.5"><span className="line-clamp-1">NVD123124</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Điện thoại</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">2</td>
              <td className="px-2 py-2.5"><span>EEFG48465</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-6-m2-11-inch_9_.jpg"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Máy tính bảng</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg">
                  Ngừng hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">1</td>
              <td className="px-2 py-2.5"><span className="line-clamp-1">NVD123124</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Điện thoại</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">2</td>
              <td className="px-2 py-2.5"><span>EEFG48465</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-6-m2-11-inch_9_.jpg"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Máy tính bảng</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg">
                  Ngừng hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">1</td>
              <td className="px-2 py-2.5"><span className="line-clamp-1">NVD123124</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Điện thoại</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">2</td>
              <td className="px-2 py-2.5"><span>EEFG48465</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-6-m2-11-inch_9_.jpg"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Máy tính bảng</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg">
                  Ngừng hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">1</td>
              <td className="px-2 py-2.5"><span className="line-clamp-1">NVD123124</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Điện thoại</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">2</td>
              <td className="px-2 py-2.5"><span>EEFG48465</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-6-m2-11-inch_9_.jpg"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Máy tính bảng</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg">
                  Ngừng hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">1</td>
              <td className="px-2 py-2.5"><span className="line-clamp-1">NVD123124</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Điện thoại</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">2</td>
              <td className="px-2 py-2.5"><span>EEFG48465</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-6-m2-11-inch_9_.jpg"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Máy tính bảng</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg">
                  Ngừng hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">1</td>
              <td className="px-2 py-2.5"><span className="line-clamp-1">NVD123124</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Điện thoại</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Đang hoạt động
                </span>
              </td>
              <td className="p-2">
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
              <td className="px-2 py-2.5 text-center">2</td>
              <td className="px-2 py-2.5"><span>EEFG48465</span></td>
              <td className="px-2 py-1 text-center">
                <div className="flex items-center justify-center">
                  <img
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-air-6-m2-11-inch_9_.jpg"
                    alt="Điện thoại"
                    className="w-8 h-8 rounded"
                  />
                </div>
              </td>
              <td className="px-2 py-2.5"><span>Máy tính bảng</span></td>
              <td className="px-2 py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg">
                  Ngừng hoạt động
                </span>
              </td>
              <td className="p-2">
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
        <div className="flex w-full justify-end">        <Pagination defaultCurrent={1} align="end" total={500} showSizeChanger={false}/></div>

      </div>
    </>
  );
}
export default CategoryList;