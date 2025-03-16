"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { Pagination } from "antd";
import { CiCircleMore } from "react-icons/ci";
import * as productServices from "@/app/services/productService";
import Statusproduct from "@/app/pages/admin/Components/Status";
import Link from "next/link";
import config from "@/app/config";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
function ProductList() {
  const [productdetail, setProductdetail] = useState(false);
  const showproductdetail = () => setProductdetail(true);
  const closeproductdetail = () => setProductdetail(false);
  const [products, setProducts] = useState([]);
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
    productServices.getQuery(query).then((res) => {
      setProducts(res.data);
      setTotalPages(res.total);
    });
  }, [limit, page, search]);
  console.log(products);

  const columns: TableProps<IProduct>['columns'] = [
    {
      title: 'STT',
      align: 'center',
      dataIndex: 'index',
      width: 80,
      key: 'index',
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: 'Ảnh',
      dataIndex: 'variants',
      align: 'center',
      width: 96,
      key: 'image',
      render: (variants) => {
        const image = variants?.[0]?.colors?.[0]?.image || 
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQegZDhYp7xib4Rc4ZxRGe_cHEH5WrGL1wupA&s";
        return (
          <div className="flex items-center justify-center">
            <img src={image} alt="Sản phẩm" className="w-8 h-8 rounded" />
          </div>
        );
      },
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá Sản Phẩm',
      align: 'center',
      dataIndex: 'variants',
      width: 130,
      key: 'price',
      render: (variants) => {
        const variant = variants[0];
        const finalPrice = variant.price + variant.colors[0].price_extra - variant.price_sale;
        
        return (
          <div className="text-xs font-medium text-red-500">
            {finalPrice.toLocaleString("vi-VN")} đ
            {variant.price_sale !== 0 && (
              <del className="text-xs font-light text-gray-500 block">
                {variant.price_sale.toLocaleString("vi-VN")} đ
              </del>
            )}
          </div>
        );
      },
    },
    {
      title: 'Số Lượng',
      align: 'center',
      dataIndex: 'variants',
      width: 130,
      key: 'quantity',
      render: (variants) => variants?.[0]?.colors?.[0]?.quantity || 0,
    },
    {
      title: 'Biến Thể',
      align: 'center',
      dataIndex: 'variants',
      width: 130,
      key: 'variant',
      render: (variants) => variants?.[0]?.properties?.[0]?.name || "-",
    },
    {
      title: 'Màu Sắc',
      align: 'center',
      dataIndex: 'variants',
      width: 130,
      key: 'color',
      render: (variants) => variants?.[0]?.colors?.[0]?.name || "-",
    },
    {
      title: 'Trạng thái',
      align: 'center',
      dataIndex: 'variants',
      width: 130,
      key: 'status',
      render: (variants) => {
        const status = variants?.[0]?.colors?.[0]?.status;
        let text = "";
        switch (status) {
          case 0:
            text = "Hết hàng";
            break;
          case 1:
            text = "Còn hàng";
            break;
          case 2:
            text = "Ẩn";
            break;
          case 3:
            text = "Đang nhập hàng";
            break;
          default:
            text = "Không xác định";
        }
        return (
          <div className="flex items-center justify-center">
            <Statusproduct status={status} text={text} />
          </div>
        );
      },
    },
    {
      title: 'Chức năng',
      align: 'center',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Link
            href={`${config.routes.admin.product.edit}/${record.id}`}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex"
          >
            <FiEdit className="w-5 h-5" />
          </Link>
          <button
            onClick={showproductdetail}
            className="w-6 h-6 bg-red-100 rounded text-thirdary center-flex"
          >
            <CiCircleMore className="w-5 h-5" />
          </button>
        </Space>
      ),
    },
  ];
  

  return (
    <>
      <TitleAdmin title="Danh Sách Sản Phẩm" />
      <Boxsearchlimit
        title="Sản Phẩm"
        onLimitChange={(newLimit: any) => {
          setLimit(newLimit);
          setPage(1);
        }}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />
      <div className=" bg-red-200 shadow-xl rounded-lg px-4 py-4 flex  items-start flex-col gap-4">
        <Link
          href={config.routes.admin.product.add}
          className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded"
        >
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo sản phẩm mới</p>
        </Link>
        <Table<IProduct> columns={columns} dataSource={products} rowKey="id" className="w-full min-h-full"  pagination={totalPages > limit ? {
    current: page,
    pageSize: limit,
    total: totalPages,
    onChange: (newPage) => setPage(newPage),
    showSizeChanger: false,
  } : false}/>
      </div>
      {productdetail && (
        <>
          <div className="bg-white w-[600px] center-fixed flex flex-col gap-2.5 rounded-lg shadow-xl z-50">
            <div className="h-[64px] flex items-center px-4">
              <p className="text-xl font-semibold w-full">Thông tin sản phẩm</p>
            </div>
            <div className="px-4">
              <div className="flex px-3 py-2.5 gap-2.5 border border-gray-200 rounded">
                <p className="text-sm font-medium">Tên sản phẩm:</p>
                <p className="text-sm font-medium">
                  iphone 16 Pro Max | Chính hãng VN/A
                </p>
              </div>
            </div>
            <div className="flex-col gap-3 px-4 py-1">
              <div className="flex flex-col gap-2 py-2 px-3 border shadow-lg rounded">
                <div className="flex">
                  <p className="min-w-[64px]">Hình ảnh</p>
                  <p className="w-full text-center">Màu</p>
                  <p className="w-full text-center">Dung lượng</p>
                  <p className="min-w-[64px]">Số lượng</p>
                </div>
                <div className="flex border-t">
                  <div className="min-w-[64px] flex items-center">
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16e-128gb.png"
                      alt=""
                      className="w-16 h-16"
                    />
                  </div>
                  <div className="w-full text-center flex items-center">
                    <p className="w-full text-sm font-medium">Titan tự nhiên</p>
                  </div>
                  <div className="w-full flex-col py-1.5 gap-1.5">
                    <p className="text-sm text-center font-normal border-b border-gray-200">
                      256 GB
                    </p>
                    <p className="text-sm text-center font-normal border-b border-gray-200">
                      512 GB
                    </p>
                    <p className="text-sm text-center font-normal ">1 TB</p>
                  </div>
                  <div className="min-w-[64px] flex-col py-1.5 gap-1.5">
                    <p className="text-sm text-center font-normal border-b border-gray-200">
                      10
                    </p>
                    <p className="text-sm text-center font-normal border-b border-gray-200">
                      10
                    </p>
                    <p className="text-sm text-center font-normal">10</p>
                  </div>
                </div>
              </div>
              <div className=" flex gap-4 justify-end h-[64px] items-center">
                <p
                  className="px-6 bg-red-100 text-red-800 h-10 flex items-center rounded text-sm font-bold cursor-pointer"
                  onClick={closeproductdetail}
                >
                  Trở lại
                </p>
              </div>
            </div>
          </div>
          <div className="overlay"></div>
        </>
      )}
    </>
  );
}

export default ProductList;
