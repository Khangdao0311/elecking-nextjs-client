"use client";
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import Boxsearchlimit from "@/app/components/admin/boxsearchlimtit";
import { Pagination } from "antd";
import * as userServices from "@/app/services/userService";
import { FiEdit } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import Statususer from "@/app/pages/admin/Components/Status" 
function UserList() {
  const [users, setUsers] = useState([]);
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

    userServices.getQuery(query).then((res) => {setUsers(res.data); setTotalPages(res.total);});
  }, [limit, page, search]);
  console.log(users);
  
  return (
    <>
      <TitleAdmin title="Quản lý người dùng" />
      <Boxsearchlimit title="người dùng" onLimitChange={(newLimit:any) =>{setLimit(newLimit); setPage(1)}} onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}/>
      <div className=" bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="flex items-center gap-2.5 p-2.5 bg-green-100 rounded">
          <GoPlus className="w-6 h-6" />
          <p className="text-sm font-bold">Tạo người dùng mới</p>
        </div>
        <table className="w-full bg-white shadow-xl rounded-lg overflow-hidden text-sm font-normal">
          <thead className="bg-stone-100">
            <tr>
              <th className="px-2 py-2.5 min-w-12 text-sm font-bold">STT</th>

              <th className=" min-w-16 w-16 max-w-16  px-2 py-2.5  text-sm font-bold">
                Ảnh
              </th>

              <th className="px-2 py-2.5 w-1/2 text-left text-sm font-bold ">
                <span className="">Tên Người Dùng</span>
              </th>

              <th className="px-2 py-2.5 w-1/2 text-left text-sm font-bold ">
                Email
              </th>

              <th className="px-2 py-2.5  w-[112px] min-w-[112px] max-w-[112px] text-center text-sm font-bold ">
                Số Điện Thoại
              </th>

              <th className="px-2 py-2.5  w-[112px] min-w-[112px] max-w-[112px] text-center  text-sm font-bold ">
                Vai Trò
              </th>

              <th className="px-2 py-2.5  w-[140px] min-w-[140px] max-w-[140px] text-sm font-bold">
                Trạng Thái
              </th>

              <th className="px-2 py-2.5 w-[112px] min-w-[112px] max-w-[112px] text-sm font-bold">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((getuser: IUser, index: number) => {
              let content = "";
              switch (getuser.status) {
                case 0:
                  content = "Ngưng hoạt động"
                  break;
                case 1:
                  content = "Đang hoạt động"
                  break;
                case 2:
                  content = "Chờ xác nhận"
                  break;
                case 3:
                  content = "Đang vận chuyển"
                default:
                  break;
              }
              return (
                <tr key={getuser.id} className="even:bg-gray-100">
                  <td className="px-2 py-2.5 w-12 text-center">{(page - 1) * limit + index + 1}</td>
                  <td className="px-2 w-16 py-1 text-center">
                    <div className="flex items-center justify-center">
                      <img
                        src={
                          getuser.avatar ||
                          "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
                        }
                        alt="Điện thoại"
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-2.5">
                    <span className="line-clamp-1">{getuser.fullname}</span>
                  </td>
                  <td className="px-2 flex-1 py-2">{getuser.email}</td>
                  <td className="px-2 min-w-[112px] text-center py-2.5">
                    {getuser.phone}
                  </td>
                  <td className="px-2 min-w-[112px] py-2.5 text-center">
                    {getuser.role ? "Amin" : "Khách hàng"}
                  </td>
                  <td className="px-2 min-w-[140px] py-2.5 text-center">


                    <Statususer status={getuser.status} text= {content}/>
                  </td>
                  <td className="p-2 w-24">
                    <div className="flex min-w-24 items-center justify-center gap-2">
                      <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button className="w-6 h-6 bg-red-100 rounded text-red-800 center-flex">
                        <MdDeleteForever className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {/* // <tr className="even:bg-gray-100">
            //   <td className="px-2 py-2.5 w-12 text-center">1</td>
            //   <td className="px-2 w-16 py-1 text-center">
            //     <div className="flex items-center justify-center">
            //       <img
            //         src="https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg"
            //         alt="Điện thoại"
            //         className="w-8 h-8 rounded"
            //       />
            //     </div>
            //   </td>
            //   <td className="px-2 py-2.5">
            //     <span className="line-clamp-1">Nguyễn văn admin</span>
            //   </td>
            //   <td className="px-2 flex-1 py-2">
            //   NguyenVanA@gmail.com
            //   </td>
            //   <td className="px-2 min-w-[112px] text-center py-2.5">0123456789</td>
            //   <td className="px-2 min-w-[112px] py-2.5 text-center">
            //     Admin
            //   </td>
            //   <td className="px-2 min-w-[112px] py-2.5 text-center">
            //     <span className="px-3 py-1 text-xs font-normal text-green-800 bg-green-100 rounded-lg ">
            //       Hoạt động
            //     </span>
            //   </td>
            //   <td className="p-2 w-24">
            //     <div className="flex min-w-24 items-center justify-center gap-2">
            //       <button className="w-6 h-6 bg-yellow-100 rounded text-yellow-800 center-flex">
            //         <FiEdit className="w-5 h-5" />
            //       </button>
            //       <button className="w-6 h-6 bg-red-100 rounded text-red-800 center-flex">
            //         <MdDeleteForever className="w-5 h-5" />
            //       </button>
            //     </div>
            //   </td>
            // </tr> */}
          </tbody>
        </table>
        {totalPages > limit &&(
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
