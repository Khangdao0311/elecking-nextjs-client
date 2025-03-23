"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import * as proptypeService from "@/app/services/proptypeService";
import * as propertyService from "@/app/services/propertyService";
import { useEffect, useState } from "react";
import { Pagination, Space, Table, type TableProps } from "antd";
import Link from "next/link";
import config from "@/app/config";
import { FiEdit } from "react-icons/fi";
import BoxSearchLimit from "@/app/components/admin/boxsearchlimtit";

function ConfigurationList() {
  const [proptype, setProptype] = useState([]);
  const [property, setProperTy] = useState([]);
  const [limitProptype, setLimitProptype] = useState(5);
  const [limitProperty, setLimitProperty] = useState(5);
  const [totalPagesProptype, setTotalPagesProptype] = useState(0);
  const [totalPagesProperty, setTotalPagesProperty] = useState(0);
  const [searchProptype, setSearchProptype] = useState("");
  const [searchProperty, setSearchProperty] = useState("");
  const [pageProptype, setPageProptype] = useState(1);
  const [pageProperty, setPageProperty] = useState(1);

  useEffect(() => {
    const query: any = {};
    query.limit = limitProptype;
    query.page = pageProptype;
    if (searchProptype != "") {
      query.search = searchProptype;
    }
    console.log(searchProperty);
    proptypeService.getQuery(query).then((res) => {
      setTotalPagesProptype(res.total);
      setProptype(res.data);
    });
  }, [limitProptype, pageProptype, searchProptype]);

  useEffect(() => {
    const query: any = {};
    query.limit = limitProperty;
    query.page = pageProperty;
    if (searchProperty != "") {
      query.search = searchProperty;
    }
    console.log(searchProperty);

    propertyService.getQuery(query).then((res) => {
      setProperTy(res.data);
      setTotalPagesProperty(res.total);
    });
  }, [limitProperty, pageProperty, searchProperty]);

  const columnsProptype: TableProps<IProptype>["columns"] = [
    {
      title: "STT",
      align: "center",
      dataIndex: "index",
      width: 100,
      key: "index",
      render: (_, __, index) => (pageProptype - 1) * limitProptype + index + 1,
    },
    {
      title: "Tên Cấu Hình",
      dataIndex: "name",
      width: 450,
      key: "name",
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
  const columnsProperty: TableProps<IProperty>["columns"] = [
    {
      title: "STT",
      align: "center",
      dataIndex: "index",
      width: 100,
      key: "index",
      render: (_, __, index) => (pageProperty - 1) * limitProperty + index + 1,
    },
    {
      title: "Tên danh mục cấu hình",
      dataIndex: "proptype",
      width: 450,
      key: "proptype",
      render: (proptype) => proptype?.name,
    },
    {
      title: "Tên cấu hình",
      dataIndex: "name",
      width: 200,
      key: "name",
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
      <TitleAdmin title="Danh Sách Cấu Hình" />

      <div className="flex w-full gap-4 ">
        <div className="p-5 flex flex-col gap-4 w-1/2 h-[600px] rounded-lg border border-gray-200 shadow-lg">
          <p className="text-xl font-bold">Tên Danh Mục Cấu Hình</p>
          <div className="border border-zinc-300"></div>
          <div className="w-full">
            <BoxSearchLimit
              title="danh mục"
              onLimitChange={(newLimit: any) => {
                setLimitProptype(newLimit);
                setPageProptype(1);
              }}
              onSearch={(value) => {
                setSearchProptype(value);
                setPageProptype(1);
              }}
            />
          </div>
          <div style={{ width: "100%", maxWidth: "100%" }}>
            <Table<IProptype>
              columns={columnsProptype}
              dataSource={proptype}
              rowKey="id"
              scroll={{ x: 50, y: 300 }}
              pagination={false}
              tableLayout="auto"
            />
            {totalPagesProptype > limitProptype && (
              <div className="flex w-full justify-end mt-2">
                <Pagination
                  current={pageProptype}
                  onChange={(e) => {
                    setPageProptype(e);
                  }}
                  defaultCurrent={1}
                  align="end"
                  pageSize={limitProptype}
                  total={totalPagesProptype}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </div>
        <div className="p-5 flex flex-col gap-4 w-1/2 h-[600px] rounded-lg border border-gray-200 shadow-lg">
          <p className="text-xl font-bold">Tên Các Cấu Hình</p>
          <div className="border border-zinc-300"></div>
          <div className="w-[582px]">
            <BoxSearchLimit
              title="danh mục"
              onLimitChange={(newLimit: any) => {
                setLimitProperty(newLimit);
                setPageProperty(1);
              }}
              onSearch={(value) => {
                setSearchProperty(value);
                setPageProperty(1);
              }}
            />
          </div>
          <div style={{ width: "100%", maxWidth: "100%" }}>
            <Table<IProperty>
              columns={columnsProperty}
              dataSource={property}
              rowKey="id"
              scroll={{ x: 50, y: 300 }}
              pagination={false}
              tableLayout="auto"
            />
            {totalPagesProperty > limitProperty && (
              <div className="flex w-full justify-end mt-2">
                <Pagination
                  current={pageProperty}
                  onChange={(e) => setPageProperty(e)}
                  defaultCurrent={1}
                  align="end"
                  pageSize={limitProperty}
                  total={totalPagesProperty}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfigurationList;
