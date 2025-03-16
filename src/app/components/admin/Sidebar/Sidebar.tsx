"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCategory } from "react-icons/bi";
import { BsBoxSeam, BsClipboardCheck, BsSpeedometer2 } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { VscTag } from "react-icons/vsc";
import React from "react";

import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
import config from "@/app/config";
import { SiBrandfolder } from "react-icons/si";

function Sidebar() {
  const pathname = usePathname();

  const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  return (
    <aside className="w-64 fixed top-0 left-0 bottom-0 bg-slate-800 px-3 py-6 flex flex-col gap-3">
      <div className="w-full center-flex flex-col gap-1">
        <div className="w-20 h-20 p-1.5 rounded-full border-2 border-white center-flex">
          <FaCircleUser className="w-full h-full text-white" />
        </div>
        <h2 className="text-base font-bold text-white">ADMIN NE</h2>
        <p className="text-sm font-medium text-white">Chào mừng bạn trở lại</p>
      </div>
      <hr />
      <div className="h-full flex flex-col overflow-auto gap-3 bg-">
        <Link
          href={config.routes.admin.dashboard}
          className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
            pathname.startsWith("/admin/dashboard") ? "pl-7 bg-white" : ""
          } transition-all duration-300	rounded-md cursor-pointer select-none`}
        >
          <BsSpeedometer2
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/dashboard")
                ? "text-primary"
                : "text-white"
            } w-6 h-6`}
          />
          <p
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/dashboard")
                ? "text-primary"
                : "text-white"
            } text-sm font-bold`}
          >
            Bảng điều khiểu
          </p>
        </Link>
        <Link
          href={config.routes.admin.category.list}
          className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
            pathname.startsWith("/admin/category") ? "pl-7 bg-white" : ""
          } transition-all duration-300	rounded-md cursor-pointer select-none`}
        >
          <BiCategory
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/category")
                ? "text-primary"
                : "text-white"
            } w-6 h-6`}
          />
          <p
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/category")
                ? "text-primary"
                : "text-white"
            } text-sm font-bold`}
          >
            Quản lý danh mục
          </p>
        </Link>
        <Link
          href={config.routes.admin.product.list}
          className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
            pathname.startsWith("/admin/product") ? "pl-7 bg-white" : ""
          } transition-all duration-300	rounded-md cursor-pointer select-none`}
        >
          <BsBoxSeam
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/product")
                ? "text-primary"
                : "text-white"
            } w-6 h-6`}
          />
          <p
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/product")
                ? "text-primary"
                : "text-white"
            } text-sm font-bold`}
          >
            Quản lý sản phẩm
          </p>
        </Link>
        <Link
          href={config.routes.admin.user.list}
          className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
            pathname.startsWith("/admin/user") ? "pl-7 bg-white" : ""
          } transition-all duration-300	rounded-md cursor-pointer select-none`}
        >
          <LuUser
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/user") ? "text-primary" : "text-white"
            } w-6 h-6`}
          />
          <p
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/user") ? "text-primary" : "text-white"
            } text-sm font-bold`}
          >
            Quản lý người dùng
          </p>
        </Link>
        <Link
          href={config.routes.admin.brand.list}
          className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
            pathname.startsWith("/admin/brand") ? "pl-7 bg-white" : ""
          } transition-all duration-300	rounded-md cursor-pointer select-none`}
        >
          <SiBrandfolder
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/brand")
                ? "text-primary"
                : "text-white"
            } w-6 h-6`}
          />
          <p
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/brand")
                ? "text-primary"
                : "text-white"
            } text-sm font-bold`}
          >
            Quản lý thương hiệu
          </p>
        </Link>
        <Link
          href={config.routes.admin.order.list}
          className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white ${
            pathname.startsWith("/admin/order") ? "pl-7 bg-white" : ""
          } transition-all duration-300	rounded-md cursor-pointer select-none`}
        >
          <BsClipboardCheck
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/order")
                ? "text-primary"
                : "text-white"
            } w-6 h-6`}
          />
          <p
            className={`group-hover:text-primary ${
              pathname.startsWith("/admin/order")
                ? "text-primary"
                : "text-white"
            } text-sm font-bold`}
          >
            Quản lý đơn hàng
          </p>
        </Link>
        <div className={pathname.startsWith("/admin/voucher") ? "active" : ""}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            className="bg-slate-800 border-none"
            style={{ margin: 0 }}
            items={[
              {
                key: "sub1",
                label: (
                  <div
                    className={`group a items-center h-14 p-3 w-full flex gap-3 hover:pl-7 text-white hover:bg-white ${
                      pathname.startsWith("/admin/voucher")
                        ? "pl-7 bg-white"
                        : ""
                    } transition-all duration-300	rounded-md cursor-pointer select-none`}
                  >
                    <VscTag
                      className={`group-hover:text-primary ${
                        pathname.startsWith("/admin/voucher")
                          ? "text-primary"
                          : "text-white"
                      } w-6 h-6`}
                    />
                    <p
                      className={`group-hover:text-primary  ${
                        pathname.startsWith("/admin/voucher")
                          ? "text-primary"
                          : "text-white"
                      } text-sm font-bold`}
                    >
                      Quản lí voucher
                    </p>
                  </div>
                ),
                children: [
                  {
                    key: "1",
                    label: (
                      <Link
                        href={config.routes.admin.voucher.list.stillexpired}
                        className={`group  a h-11 p-3  flex gap-3 hover:pl-7 hover:bg-white ${
                          pathname.startsWith("/admin/voucher")
                            ? "pl-7 bg-white"
                            : ""
                        } transition-all duration-300	rounded-lg cursor-pointer select-none`}
                      >
                        <VscTag
                          className={`group-hover:text-primary ${
                            pathname.startsWith("/admin/voucher")
                              ? "text-primary"
                              : "text-white"
                          } w-6 h-6`}
                        />
                        <p
                          className={`group-hover:text-primary ${
                            pathname.startsWith("/admin/voucher")
                              ? "text-primary"
                              : "text-white"
                          } text-sm font-bold`}
                        >
                          Còn hoạt động
                        </p>
                      </Link>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <Link
                        href={config.routes.admin.voucher.list.expired}
                        className={`group  a h-11 p-3  flex gap-3 hover:pl-7 hover:bg-white ${
                          pathname.startsWith("/admin/voucher/2")
                            ? "pl-7 bg-white"
                            : ""
                        } transition-all duration-300	rounded-lg cursor-pointer select-none`}
                      >
                        <VscTag
                          className={`group-hover:text-primary ${
                            pathname.startsWith("/admin/voucher/2")
                              ? "text-primary"
                              : "text-white"
                          } w-6 h-6`}
                        />
                        <p
                          className={`group-hover:text-primary ${
                            pathname.startsWith("/admin/voucher/2")
                              ? "text-primary"
                              : "text-white"
                          } text-sm font-bold`}
                        >
                          Hết hạn
                        </p>
                      </Link>
                    ),
                  },
                ],
              },
            ]}
          />
        </div>

        <style jsx>{`
          :global(.ant-menu-submenu .ant-menu-item) {
            margin-top: 5px !important;
          }
        `}</style>
        <style jsx>{`
          :global(.ant-menu-submenu-title) {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
        `}</style>
        <style jsx>{`
          :global(.ant-menu-item-only-child) {
            margin: 0 !important;
            padding: 10px !important;
            background-color: 
          }
        `}</style>
        <style jsx>{`
          :global(
              .ant-menu
                ant-menu-root
                ant-menu-inline
                ant-menu-light
                bg-slate-800
                border-none
                css-dev-only-do-not-override-19lec04
            ) {
            border: none !important;
          }
        `}</style>
        <style jsx>{`
          :global(.ant-menu-submenu-arrow) {
            color: white !important;
          }

          :global(.active .ant-menu-submenu-arrow) {
            color: red !important;
          }

          :global(.ant-menu-submenu:hover .ant-menu-submenu-arrow) {
            color: red !important;
          }
        `}</style>

        <div
          className={`group  a h-11 p-3 flex gap-3 hover:pl-7 hover:bg-white transition-all duration-300	rounded-md cursor-pointer select-none`}
        >
          <TbLogout2
            className={`group-hover:text-primary w-6 h-6 text-white `}
          />
          <p
            className={`group-hover:text-primary text-white text-sm font-bold`}
          >
            Đăng xuất
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
