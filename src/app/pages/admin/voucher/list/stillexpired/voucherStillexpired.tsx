"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { Pagination } from "antd";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import * as voucherServices from "@/app/services/voucherService";
import { useEffect, useState } from "react";
import Statusvoucher from "@/app/pages/admin/Components/Status";
import moment from "moment";
function VoucherStillexpired() {
  const [vouchers, setVouchers] = useState([]);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    query.page = page;
    if (search != "") {
      query.search = search;
    }
    voucherServices.getQuery(query).then((res) => {
      setTotalPages(res.total);
      setVouchers(res.data);
    });
  }, [limit, page, search]);
  return (
    <>
      <TitleAdmin title="Quản lý voucher" />
      <Boxsearchlimit
        title="voucher"
        onLimitChange={(newLimit: any) => {
          setLimit(newLimit);
          setPage(1);
        }}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />
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

              <th className="px-2 py-2.5  w-[110px] min-w-[110px] max-w-[110px] text-sm font-bold ">
                Số lượng
              </th>

              <th className="px-2 py-2.5  w-[140px] min-w-[140px] max-w-[140px] text-sm font-bold">
                Trạng Thái
              </th>

              <th className="px-2 py-2.5 w-[96px] min-w-[96px] max-w-[96px] text-sm font-bold">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {vouchers
            .filter((voucher: IVocher) => voucher.status === 1)
            .map((voucher: IVocher, index: number) => {
              let text = "";
              switch (voucher.status) {
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
                <tr key={voucher.id} className="even:bg-gray-100">
                  <td className="px-2 py-2.5 w-12 text-center">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-2 py-2.5 w-full">{voucher.id}</td>
                  <td className="px-2 py-2.5 w-[140px]">
                    {moment(voucher.start_date, "YYYYMMDD").format(
                      "DD/MM/YYYY"
                    )}
                  </td>
                  <td className="px-2 py-2.5 w-[140px]">
                    {moment(voucher.end_date, "YYYYMMDD").format("DD/MM/YYYY")}
                  </td>
                  <td className="px-2 flex-1 py-2 w-[150px]">
                    {voucher.min_order_value.toLocaleString("vi-VN")} đ
                  </td>
                  <td className="px-2 flex-1 py-2 w-[140px]">
                    {voucher.max_discount.toLocaleString("vi-VN")} đ
                  </td>
                  <td className="px-2 min-w-[144px] max-w-[144px] text-left py-2.5">
                    {voucher.discount_type === 1
                      ? `${voucher.discount_value.toLocaleString("vi-VN")} đ`
                      : `${voucher.discount_value}%`}
                  </td>
                  <td className="px-2 min-w-[110px] text-center py-2.5">{voucher.quantity}</td>
                  <td className="px-2 min-w-[140px] py-2.5 text-center">
                  <Statusvoucher status={voucher.status} text={text} />
                  </td>
                  <td className="p-2 w-24">
                    <div className="flex min-w-24 items-center justify-center gap-2">
                      <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                        <FiEdit className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {totalPages > limit && (
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

export default VoucherStillexpired;
