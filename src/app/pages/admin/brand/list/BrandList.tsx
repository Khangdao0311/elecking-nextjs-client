"use client";

import { FiEdit } from "react-icons/fi";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import Statusbrand from "@/app/pages/admin/Components/Status";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import * as brandServices from "@/app/services/brandService";
import { Pagination, Tooltip } from "antd";
import config from "@/app/config";
import Link from "next/link";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Spin } from 'antd';
function BrandList() {
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(true);

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
      setLoad(false);
    });
  }, [limit, page, search]);
  console.log(brands);

  
  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 5) return undefined;
    return { x: 50, y: 460 };
  };
  
  const columns: TableProps<IBrand>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: 80,
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Tên Thương Hiệu",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Logo",
      dataIndex: "logo",
      align: "center",
      width: 150,
      render: (logo) => (
        <div className="flex justify-center">
          <img
            src={logo || "https://vawr.vn/images/logo-google.png"}
            alt="Logo"
            className=" h-8 rounded text-center"
          />
        </div>
      ),
    },
    {
      title: "Ảnh Bìa",
      dataIndex: "banner",
      align: "center",
      width: 180,
      render: (banner) => (
        <div className="flex justify-center">
          <img
            src={banner || "https://vawr.vn/images/logo-google.png"}
            alt="Banner"
            className="w-16 h-8 rounded"
          />
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 290,
      key: "description",
      render: (text) => (
        <Tooltip title={<div dangerouslySetInnerHTML={{ __html: text }} />}>
          <span className="line-clamp-1" dangerouslySetInnerHTML={{ __html: text }} />
        </Tooltip>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      align: "center",
      width: 120,
      render: (status) => {
        let text = "";
        switch (status) {
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
            break;
        }
        return <Statusbrand status={status} text={text} />;
      },
    },
    {
      title: "Chức năng",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Space>
          <Link
            href={`${config.routes.admin.brand.edit}/${record.id}`}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 flex items-center justify-center"
          >
            <FiEdit className="w-5 h-5" />
          </Link>
        </Space>
      ),
    },
  ];
  
  return (
    <>
      {load ? (
        <Spin />
      ) : (
        <>
          <TitleAdmin title="Danh Sách Thương Hiệu" />
          <Boxsearchlimit
            title="thương hiệu"
            onLimitChange={(newLimit: any) => {
              setLimit(newLimit);
              setPage(1);
            }}
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
          <div className=" bg-white shadow-xl h-full rounded-lg px-4 py-4 flex items-start flex-col gap-4">
            <Link
              href={config.routes.admin.brand.add}
              className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded"
            >
              <GoPlus className="w-6 h-6" />
              <p className="text-sm font-bold">Tạo thương hiệu mới</p>
            </Link>
            <div style={{ width: "100%", overflowX: "auto", maxWidth: "100%" }}>
              <Table<IBrand>
                columns={columns}
                dataSource={brands}
                rowKey="id"
                scroll={getTableScroll(brands.length)}
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
        </>
      )}
    </>
  );
}
export default BrandList;
