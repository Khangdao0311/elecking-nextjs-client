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
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import Link from "next/link";
import config from "@/app/config";
import { useStore } from "@/app/store";
import Loading from "@/app/components/client/Loading";
function voucherExpired() {
  const [vouchers, setVouchers] = useState<IVoucher[]>([]);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [state, dispatch] = useStore();
  useEffect(() => {
    const query: any = { expired: 0 };
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
  const columns: TableProps<IVoucher>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Mã Voucher",
      dataIndex: "code",
      key: "code",
      width: "15%",
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "start_date",
      key: "start_date",
      width: 160,
      render: (date) => moment(date, "YYYYMMDD").format("DD/MM/YYYY"),
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "end_date",
      key: "end_date",
      width: 140,
      render: (date) => moment(date, "YYYYMMDD").format("DD/MM/YYYY"),
    },
    {
      title: "Đơn Hàng Tối Thiểu",
      dataIndex: "min_order_value",
      key: "min_order_value",
      width: 180,
      render: (value) => `${value.toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Giá Trị Tối Đa",
      dataIndex: "max_discount",
      key: "max_discount",
      width: 140,
      render: (value) => `${value.toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Giá trị Voucher",
      dataIndex: "discount_value",
      key: "discount_value",
      width: 144,
      render: (value, record) =>
        record.discount_type === 1
          ? `${value.toLocaleString("vi-VN")} đ`
          : `${value}%`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: 110,
      align: "center",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      width: 160,
      align: "center",
      render: (status) =>
        <Statusvoucher status={1} text={"Đang hoạt động"} />
    },
    {
      title: "Chức năng",
      key: "action",
      width: 96,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Link
            href={`${config.routes.admin.voucher.edit}/${record.id}`}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 flex items-center justify-center">
            <FiEdit className="w-5 h-5" />
          </Link>
        </Space>
      ),
    },
  ];
  
  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 5) return undefined;
    return { x: 1000, y: "max-content"  };
  };

  return (
    <>
    {state.load && <Loading />}
    {state.load ? "" : <>
      <TitleAdmin title="Quản lý voucher" />
      <Boxsearchlimit
        title="voucher"
        onLimitChange={(newLimit: any) => {
          setLimit(newLimit);
          setPage(1);
        }}
        onSearch={(value:string) => {
          setSearch(value);
          setPage(1);
        }}
      />
      <div className=" bg-white shadow-xl min-h-0 rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <Link
          href={config.routes.admin.voucher.add}
          className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded">
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo voucher mới</p>
        </Link>
        <div style={{ width: "100%", overflowX: "auto", maxWidth: "100%" }}>
          <Table<IVoucher>
            columns={columns}
            dataSource={vouchers}
            rowKey="id"
            scroll={getTableScroll(vouchers.length)}
            pagination={false}
            tableLayout="auto"
          />
        </div>
        {totalPages > limit && (
          <div className="flex w-full justify-end mt-auto">
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
    </>}
    </>
  );
}

export default voucherExpired;
