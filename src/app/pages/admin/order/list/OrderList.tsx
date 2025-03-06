import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { Pagination } from "antd";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";


function OrderList() {
  return (
  <>
  <TitleAdmin title="Quản lý đơn hàng" />
  <Boxsearchlimit title="đơn hàng" />
  <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-2 py-2.5 w-12 min-w-12 text-sm font-bold">STT</th>

              <th className=" min-w-[128px]  px-2 py-2.5 text-left  text-sm font-bold">
                Mã Đơn Hàng
              </th>
              <th className=" min-w-[128px] text-left px-2 py-2.5  text-sm font-bold">
                Ngày Đặt Hàng
              </th>

              <th className="px-2 py-2.5 w-full text-left text-sm font-bold ">
                Khách Hàng
              </th>

              <th className="px-2 py-2.5 min-w-[150px] text-left text-sm font-bold ">
                Tổng tiền
              </th>

              <th className="px-2 py-2.5  w-[112px] min-w-[112px] max-w-[112px] text-center text-sm font-bold ">
                Mã giao dịch
              </th>

              <th className="px-2 py-2.5  w-[230px] min-w-[230px] max-w-[230px] text-left text-sm font-bold ">
                Phương Thức Thanh Toán
              </th>

              <th className="px-2 py-2.5  w-[128px] min-w-[128px] max-w-[128px] text-sm font-bold">
                Trạng Thái
              </th>

              <th className="px-2 py-2.5 w-[96px] min-w-[96px] max-w-[96px] text-sm font-bold">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-2.5 w-[128px]">
                DH321313
              </td>
              <td className="px-2 py-2.5 w-[128px]">
                10/02/2025
              </td>
              <td className="px-2 flex-1 py-2">
              Nguyễn Đặng Hưng
              </td>
              <td className="px-2 flex-1 py-2 w-[150px]">
              23.200.000 đ
              </td>
              <td className="px-2 min-w-[112px] max-w-[112px] text-center py-2.5"><span className="line-clamp-1">DSFSDFSDAVA</span></td>
              <td className="px-2 min-w-[230px] py-2.5">
              Thanh toán khi nhận hàng
              </td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Chờ xác nhận
                </span>
              </td>
              <td className="p-2 w-24">
                <div className="flex min-w-24 items-center justify-center gap-2">
                  <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                    <FiEdit className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-2.5 w-[128px]">
                DH321313
              </td>
              <td className="px-2 py-2.5 w-[128px]">
                10/02/2025
              </td>
              <td className="px-2 flex-1 py-2">
              Nguyễn Đặng Hưng
              </td>
              <td className="px-2 flex-1 py-2 w-[150px]">
              23.200.000 đ
              </td>
              <td className="px-2 min-w-[112px] max-w-[112px] text-center py-2.5"><span className="line-clamp-1">DSFSDFSDAVA</span></td>
              <td className="px-2 min-w-[230px] py-2.5">
              Thanh toán khi nhận hàng
              </td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Chờ xác nhận
                </span>
              </td>
              <td className="p-2 w-24">
                <div className="flex min-w-24 items-center justify-center gap-2">
                  <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                    <FiEdit className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-2.5 w-[128px]">
                DH321313
              </td>
              <td className="px-2 py-2.5 w-[128px]">
                10/02/2025
              </td>
              <td className="px-2 flex-1 py-2">
              Nguyễn Đặng Hưng
              </td>
              <td className="px-2 flex-1 py-2 w-[150px]">
              23.200.000 đ
              </td>
              <td className="px-2 min-w-[112px] max-w-[112px] text-center py-2.5"><span className="line-clamp-1">DSFSDFSDAVA</span></td>
              <td className="px-2 min-w-[230px] py-2.5">
              Thanh toán khi nhận hàng
              </td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Chờ xác nhận
                </span>
              </td>
              <td className="p-2 w-24">
                <div className="flex min-w-24 items-center justify-center gap-2">
                  <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                    <FiEdit className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-2.5 w-[128px]">
                DH321313
              </td>
              <td className="px-2 py-2.5 w-[128px]">
                10/02/2025
              </td>
              <td className="px-2 flex-1 py-2">
              Nguyễn Đặng Hưng
              </td>
              <td className="px-2 flex-1 py-2 w-[150px]">
              23.200.000 đ
              </td>
              <td className="px-2 min-w-[112px] max-w-[112px] text-center py-2.5"><span className="line-clamp-1">DSFSDFSDAVA</span></td>
              <td className="px-2 min-w-[230px] py-2.5">
              Thanh toán khi nhận hàng
              </td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Chờ xác nhận
                </span>
              </td>
              <td className="p-2 w-24">
                <div className="flex min-w-24 items-center justify-center gap-2">
                  <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                    <FiEdit className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-2.5 w-[128px]">
                DH321313
              </td>
              <td className="px-2 py-2.5 w-[128px]">
                10/02/2025
              </td>
              <td className="px-2 flex-1 py-2">
              Nguyễn Đặng Hưng
              </td>
              <td className="px-2 flex-1 py-2 w-[150px]">
              23.200.000 đ
              </td>
              <td className="px-2 min-w-[112px] max-w-[112px] text-center py-2.5"><span className="line-clamp-1">DSFSDFSDAVA</span></td>
              <td className="px-2 min-w-[230px] py-2.5">
              Thanh toán khi nhận hàng
              </td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Chờ xác nhận
                </span>
              </td>
              <td className="p-2 w-24">
                <div className="flex min-w-24 items-center justify-center gap-2">
                  <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                    <FiEdit className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="even:bg-gray-100">
              <td className="px-2 py-2.5 w-12 text-center">1</td>
              <td className="px-2 py-2.5 w-[128px]">
                DH321313
              </td>
              <td className="px-2 py-2.5 w-[128px]">
                10/02/2025
              </td>
              <td className="px-2 flex-1 py-2">
              Nguyễn Đặng Hưng
              </td>
              <td className="px-2 flex-1 py-2 w-[150px]">
              23.200.000 đ
              </td>
              <td className="px-2 min-w-[112px] max-w-[112px] text-center py-2.5"><span className="line-clamp-1">DSFSDFSDAVA</span></td>
              <td className="px-2 min-w-[230px] py-2.5">
              Thanh toán khi nhận hàng
              </td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Chờ xác nhận
                </span>
              </td>
              <td className="p-2 w-24">
                <div className="flex min-w-24 items-center justify-center gap-2">
                  <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                    <FiEdit className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
            
          </tbody>
        </table>
        <div className="flex w-full justify-end">
          <Pagination
            defaultCurrent={1}
            align="end"
            total={500}
            showSizeChanger={false}
          />
        </div>
      </div>
  </>
  )
}

export default OrderList;
