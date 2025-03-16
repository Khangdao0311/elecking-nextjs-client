import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { Pagination } from "antd";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
function VoucherExpired() {
  return (
    <>
      <TitleAdmin title="Quản lý voucher" />
      {/* <Boxsearchlimit title="voucher" /> */}
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded">
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo voucher mới</p>
        </div>
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-2 py-2.5 w-12 min-w-12 text-sm font-bold">
                STT
              </th>

              <th className=" w-full  px-2 py-2.5 text-left  text-sm font-bold">
                Mã Voucher
              </th>
              <th className=" min-w-[140px] text-left px-2 py-2.5  text-sm font-bold">
                Ngày Bắt Đầu
              </th>

              <th className="px-2 py-2.5 min-w-[140px] text-left text-sm font-bold ">
                Ngày Kết Thúc
              </th>

              <th className="px-2 py-2.5 min-w-[150px] text-left text-sm font-bold ">
                Đơn Hàng Tối Thiểu
              </th>

              <th className="px-2 py-2.5  w-[140px] min-w-[140px] max-w-[140px] text-left text-sm font-bold ">
                Giá Trị Tối Đa
              </th>

              <th className="px-2 py-2.5  w-[144px] min-w-[144px] max-w-[144px] text-left text-sm font-bold ">
                Giá trị Vouchers
              </th>

              <th className="px-2 py-2.5  w-[96px] min-w-[96px] max-w-[96px] text-sm font-bold ">
                Số lượng
              </th>

              <th className="px-2 py-2.5  w-[112px] min-w-[112px] max-w-[112px] text-sm font-bold">
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Hoạt động
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Hoạt động
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Hoạt động
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Hoạt động
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Hoạt động
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Hoạt động
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
                  Hoạt động
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
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-2 py-2.5 w-12 min-w-12 text-sm font-bold">
                STT
              </th>

              <th className=" w-full  px-2 py-2.5 text-left  text-sm font-bold">
                Mã Voucher
              </th>
              <th className=" min-w-[140px] text-left px-2 py-2.5  text-sm font-bold">
                Ngày Bắt Đầu
              </th>

              <th className="px-2 py-2.5 min-w-[140px] text-left text-sm font-bold ">
                Ngày Kết Thúc
              </th>

              <th className="px-2 py-2.5 min-w-[150px] text-left text-sm font-bold ">
                Đơn Hàng Tối Thiểu
              </th>

              <th className="px-2 py-2.5  w-[140px] min-w-[140px] max-w-[140px] text-left text-sm font-bold ">
                Giá Trị Tối Đa
              </th>

              <th className="px-2 py-2.5  w-[144px] min-w-[144px] max-w-[144px] text-left text-sm font-bold ">
                Giá trị Vouchers
              </th>

              <th className="px-2 py-2.5  w-[96px] min-w-[96px] max-w-[96px] text-sm font-bold ">
                Số lượng
              </th>

              <th className="px-2 py-2.5  w-[112px] min-w-[112px] max-w-[112px] text-sm font-bold">
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-red-800 bg-red-100 rounded-lg ">
                  Hết hàng
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-red-800 bg-red-100 rounded-lg ">
                  Hết hàng
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
              <td className="px-2 py-2.5 w-full">AR8421</td>
              <td className="px-2 py-2.5 w-[140px]">10/02/2025</td>
              <td className="px-2 py-2.5 w-[140px]">15/04/2025</td>
              <td className="px-2 flex-1 py-2 w-[150px]">1.000.000 đ</td>
              <td className="px-2 flex-1 py-2 w-[140px]">500.000 đ</td>
              <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                50%
              </td>
              <td className="px-2 min-w-[96px] text-center py-2.5">120</td>
              <td className="px-2 min-w-[112px] py-2.5 text-center">
                <span className="px-3 py-1 text-xs font-normal text-red-800 bg-red-100 rounded-lg ">
                  Hết hàng
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
      </div>
    </>
  );
}

export default VoucherExpired;
