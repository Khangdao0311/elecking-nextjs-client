"use client";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useEffect, useState } from "react";
import Link from "next/link";
import TitleAdmin from "@/components/admin/TitleAdmin";
import Boxsearchlimit from "@/components/admin/boxsearchlimtit";
import * as categoryServices from "@/services/categoryService";
import Statuscategory from "@/components/pages/E-admin/Components/Status";
import config from "@/config";
import { useStore } from "@/store";
import Loading from "@/components/client/Loading";
import { Pagination } from "antd";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

function CategoryList() {
  const [state, dispatch] = useStore();
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
      if (res.status === 200) {
        setTotalPages(res.total);
        setCategories(res.data);
      }
    });
  }, [limit, page, search]);

  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 30) return undefined;
    return { x: 50, y: "max-content" };
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
      title: "Tên Danh Mục",
      dataIndex: "name",
      width: 450,
      key: "name",
    },
    {
      title: "Tên Danh Mục Cấu Hình",
      dataIndex: "proptypes",
      align: "center",
      width: 450,
      key: "proptypes",
      render: (proptypes) =>
        proptypes.map((proptype: any) => proptype.name).join(" - ") || "-",
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

  return (
    <>
      {state.load && <Loading />}
      {state.load ? (
        ""
      ) : (
        <>
          <TitleAdmin title="Danh Sách Danh Mục" />
          <Boxsearchlimit
            title="danh mục"
            onLimitChange={(newLimit: any) => {
              setLimit(newLimit);
              setPage(1);
            }}
            onSearch={(value: string) => {
              setSearch(value);
              setPage(1);
            }}
          />
          <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex min-h-0 items-start flex-col gap-4">
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
      )}
    </>
  );
}
export default CategoryList;
