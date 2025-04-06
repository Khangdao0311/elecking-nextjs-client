"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import * as userServices from "@/app/services/userService";
import { useEffect, useState } from "react";
import Statususer from "@/app/pages/admin/Components/Status";
import { FaEye } from "react-icons/fa6";
import { LuEyeClosed } from "react-icons/lu";
import { useStore } from "@/app/store";
import Loading from "@/app/components/client/Loading";
import { Pagination} from "antd";
import { Space, Table} from "antd";
import type { TableProps } from "antd";
import { Switch } from 'antd';

function UserList() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [eyeState, setEyeState] = useState<{ [key: string]: boolean }>({});
  const [hiddenUsers, setHiddenUsers] = useState<Record<string, boolean>>({});
  const [state, dispatch] = useStore();

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

  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("[antd: compatible] antd v5 support React is 16 ~ 18")
    ) {
      return;
    }
    originalError(...args);
  };

  const toggleEye = async (id: string, role: number) => {
    try {
      const user = users.find((user) => user.id === id);
      if (!user) return;
      const newStatus = user.status === 1 ? 0 : 1;
      const dataNew = {
        status: newStatus,
        role: role,
      };
      await userServices.updateStatus(id, dataNew);
  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái người dùng:", error);
    }
  };
  

  const handleRoleChange = async (checked: boolean, id: string) => {
    try {
      const currentUser = users.find((user) => user.id === id);
      if (!currentUser) return;

      const newRole = checked ? 1 : 0;
      const dataNew = {
        role: newRole,
        status: currentUser.status,
      };

      await userServices.updateStatus(id, dataNew);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật vai trò người dùng:", error);
    }
  };

  const getTableScroll = (dataLength: any) => {
    if (dataLength <= 30) return undefined;
    return { x: 50, y: "max-content"  };
  };

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
      render: (role) => (role === 1 ? "Admin" : "Khách hàng"),
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
          <Switch
            checked={record.role === 1} 
            onChange={(checked) => handleRoleChange(checked, record.id)}
          />
          <button
            className="w-6 h-6 bg-red-100 rounded text-red-800 flex items-center justify-center"
            onClick={() => toggleEye(record.id, record.role)}
          >
            {record.status === 1 ? <FaEye className="w-5 h-5" /> : <LuEyeClosed className="w-5 h-5" />}
          </button>
        </Space>
      ),
    },
  ];
  
  return (
    <>
    {state.load && <Loading />}
    {state.load ? "" : <>
      <TitleAdmin title="Quản lý người dùng" />
      <Boxsearchlimit
        title="người dùng"
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
        <div style={{ width: "100%", overflowX: "auto", maxWidth: "100%"}}>
          <Table<IUser>
            columns={columns}
            dataSource={users}
            rowKey="id"
            scroll={getTableScroll(users.length)}
            pagination={false}
            rowClassName={(record) => (hiddenUsers[record.id] ? "bg-gray-200" : "")}
            onRow={() => ({
              onMouseEnter: (e) => e.stopPropagation(),
              onMouseLeave: (e) => e.stopPropagation(),
            })}
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

export default UserList;
