"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { Pagination, TabPaneProps } from "antd";
import * as userServices from "@/app/services/userService";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import Statususer from "@/app/pages/admin/Components/Status";
import Link from "next/link";
import config from "@/app/config";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { FaEye } from "react-icons/fa6";
import { LuEyeClosed } from "react-icons/lu";
function UserList() {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [eyeState, setEyeState] = useState<{ [key: string]: boolean }>({});
  useEffect(() => {
    const query: any = {};

    query.limit = limit;
    query.page = page;
    if (search != "") {
      query.search = search;
    }

    userServices.getQuery(query).then((res) => {
      setUsers(res.data);
      setTotalPages(res.total);
      const initialEyeState = res.data.reduce((acc: any, user: any) => {
        acc[user.id] = true;
        return acc;
      }, {});
      setEyeState(initialEyeState);
    });
  }, [limit, page, search]);

  const toggleEye = (id: string) => {
    setEyeState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  console.log(users);
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "STT",
      dataIndex: "index",
      align: "center",
      width: 80,
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      align: "center",
      width: 96,
      render: (avatar) => (
        <div className="flex items-center justify-center">
          <img
            src={
              avatar ||
              "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
            }
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      ),
    },
    {
      title: "Tên Người Dùng",
      dataIndex: "fullname",
      width: 260,
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      align: "center",
      width: 180,
    },
    {
      title: "Vai Trò",
      dataIndex: "role",
      align: "center",
      width: 160,
      render: (role) => (role ? "Admin" : "Khách hàng"),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      align: "center",
      width: 160,
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
        return (
          <div className="flex items-center justify-center">
            <Statususer status={status} text={text} />
          </div>
        );
      },
    },
    {
      title: "Chức năng",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Link
            href={`${config.routes.admin.user.edit}/${record.id}`}
            className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex"
          >
            <FiEdit className="w-5 h-5" />
          </Link>
          <button
            className="w-6 h-6 bg-red-100 rounded text-red-800 flex items-center justify-center"
            onClick={() => toggleEye(record.id)}
          >
            {eyeState[record.id] ? <FaEye className="w-5 h-5" /> : <LuEyeClosed className="w-5 h-5" />}
          </button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <TitleAdmin title="Quản lý người dùng" />
      <Boxsearchlimit
        title="người dùng"
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
        <Link
          href={config.routes.admin.user.add}
          className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded"
        >
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo người dùng mới</p>
        </Link>
        <div style={{ width: "100%", overflowX: "auto", maxWidth: "100%" }}>
          <Table<IUser>
            columns={columns}
            dataSource={users}
            rowKey="id"
            scroll={{ x: 1000, y: 400 }}
            pagination={false}
            tableLayout="auto"
          />
        </div>
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

export default UserList;
