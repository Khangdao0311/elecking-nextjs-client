"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import * as categoryServices from "@/app/services/categoryService";
import Statuscategory from "@/app/pages/admin/Components/Status";
import Link from "next/link";
import config from "@/app/config";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

function CategoryList() {
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const query: any = {};
    query.limit = limit;
    query.page = page;
    if (search != "") {
      query.search = search;
    }
    categoryServices.getQuery(query).then((res) => {
      setTotalPages(res.total);
      setCategories(res.data);
    });
  }, [limit, page, search]);


  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 5) return undefined;
    return { x: 50, y: 460 };
  };


  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "STT",
      align: "center",
      dataIndex: "index",
      width: 100,
      key: "index",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      align: "center",
      key: "image",
      render: (image) => (
        <div className="flex items-center justify-center">
          <img src={image} alt="Danh mục" className="w-8 max-w-8 h-8 rounded" />
        </div>
      ),
    },
    {
      title: "Tên Danh Mục Cấu Hình",
      dataIndex: "name",
      width: 450,
      key: "name",
    },
    {
      title: <span className="w-6 text-center">Trạng thái</span>,
      align: "center",
      dataIndex: "status",
      width: 290,
      key: "status",
      render: (status) => {
        let text = "";
        switch (status) {
          case 0:
            text = "Ngưng hoạt động";
            break;
          case 1:
            text = "Đang hoạt động";
            break;
        }
        return (
          <div className="flex items-center justify-center">
            <Statuscategory status={status} text={text} />
          </div>
        );
      },
    },
    {
      title: "Chức năng",
      width: 200,
      align: "center",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            href={`${config.routes.admin.category.edit}/${record.id}`}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex"
          >
            <FiEdit className="w-5 h-5" />
          </Link>
        </Space>
      ),
    },
  ];
  console.log(
    "Products:",
    categories.length,
    "Limit:",
    limit,
    "Total:",
    totalPages
  );

  return (
    <>
      <TitleAdmin title="Danh Sách Danh Mục" />
      <Boxsearchlimit
        title="danh mục"
        onLimitChange={(newLimit: any) => {
          setLimit(newLimit);
          setPage(1);
        }}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex h-full items-start flex-col gap-4">
        <Link
          href={config.routes.admin.category.add}
          className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded"
        >
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo danh mục mới</p>
        </Link>
        <div style={{ width: "100%", overflowX: "auto", maxWidth: "100%" }}>
          <Table<ICategory>
            columns={columns}
            dataSource={categories}
            rowKey="id"
            scroll={getTableScroll(categories.length)}
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
  );
}
export default CategoryList;
