"use client";

import { Input } from "antd";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import moment from "moment";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { useStore, actions } from "@/app/store";
import * as userServices from "@/app/services/userService";
import * as authServices from "@/app/services/authService";
import Shimmer from "@/app/components/client/Shimmer";
import ModalNotification from "@/app/components/client/ModalNotification";
import Loading from "@/app/components/client/Loading";
import config from "@/app/config";

function AccountProfile() {
  const [state, dispatch] = useStore();
  const [file, setFile] = useState<File>();
  const [user, setUser] = useState<IUser>();
  const [profile, setProfile] = useState<any>({
    fullname: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>({ status: null, message: "" });

  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      userServices.getById(state.user.id).then((res) => {
        if (res.status === 200) {
          setProfile({
            fullname: res.data.fullname,
            email: res.data.email,
            phone: res.data.phone,
          });
          setUser(res.data);
        }
      });
    }
  }, [state.user]);

  function handleUpdateProfile() {
    if (
      file ||
      profile.fullname !== user?.fullname ||
      profile.email !== user?.email ||
      profile.phone !== user?.phone
    ) {
      const formDataUpload = new FormData();
      formDataUpload.append("fullname", profile.fullname);
      formDataUpload.append("email", profile.email);
      formDataUpload.append("phone", profile.phone);

      if (file) {
        formDataUpload.append("avatar", file);
      }
      setLoading(true);
      (function callback() {
        authServices.updateProfile(user!.id, formDataUpload).then((res) => {
          if (res.status === 200) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: user!.id,
                avatar: res.data.avatar,
                username: res.data.username,
                fullname: res.data.fullname,
                email: res.data.email,
                phone: res.data.phone,
              })
            );
            dispatch(actions.re_render());
            setFile(undefined);
            setLoading(false);
            setNotification({ status: true, message: "Thay đổi thông tin thành công !" });
            setTimeout(() => {
              setNotification({ status: null, message: "" });
            }, 1000);
          } else if (res.status === 401) {
            const refreshToken = authServices.getRefreshToken();
            if (refreshToken) {
              authServices.getToken(refreshToken).then((res) => {
                if (res.status === 200) {
                  Cookies.set("access_token", res.data);
                  callback();
                } else {
                  authServices.clearUser();
                  router.push(config.routes.client.login);
                  dispatch(actions.re_render());
                }
              });
            }
          } else {
            setLoading(false);
            setNotification({ status: false, message: res.message });
            setTimeout(() => {
              setNotification({ status: null, message: "" });
            }, 1000);
          }
        });
      })();
    }
  }

  return (
    <>
      {/* {contextHolder} */}
      {loading && <Loading />}
      <ModalNotification noti={notification} />
      <div className="flex flex-col gap-6 ">
        <h2 className="text-2xl font-bold uppercase">Tài Khoản Của Bạn</h2>
        <div className=" flex flex-col-reverse md:flex-row gap-6 h-full md:divide-x-2 md:divide-gray-100">
          <div className="flex flex-col flex-1 gap-6 md:gap-8 md:w-2/3 md:pr-10">
            {!state.load || user ? (
              <>
                <div className="flex gap-4 h-10 items-center">
                  <p className="w-4/12 shrink-0 h-full flex items-center justify-end select-none font-medium text-gray-700">
                    Tên tài khoản:
                  </p>
                  <p className="w-8/12 shrink-0 h-full flex items-center justify-start select-none font-normal">
                    {user?.username}
                  </p>
                </div>
                <div className="flex gap-4 h-10 items-center">
                  <p className="w-4/12 shrink-0 h-full flex items-center justify-end select-none font-medium text-gray-700">
                    Họ và Tên:
                  </p>
                  <Input
                    className="w-8/12 h-full flex items-center justify-start select-none font-normal"
                    placeholder="Nhập Họ và Tên"
                    value={profile.fullname}
                    onChange={(e) => setProfile({ ...profile, fullname: e.target.value })}
                  />
                </div>
                <div className="flex gap-4 h-10 items-center">
                  <p className="w-4/12 shrink-0 h-full flex items-center justify-end select-none font-medium text-gray-700">
                    Email:
                  </p>
                  <Input
                    className="w-8/12 h-full flex items-center justify-start select-none font-normal"
                    placeholder="Nhập Email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="flex gap-4 h-10 items-center">
                  <p className="w-4/12 shrink-0 h-full flex items-center justify-end select-none font-medium text-gray-700">
                    Số điện thoại:
                  </p>
                  <Input
                    className="w-8/12 h-full flex items-center justify-start select-none font-normal"
                    placeholder="Nhập số điện thoại"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="flex gap-4 h-10 items-center">
                  <p className="w-4/12 shrink-0 h-full flex items-center justify-end select-none font-medium text-gray-700">
                    Ngày Tham Gia:
                  </p>
                  <p className="w-8/12 h-full flex items-center justify-start select-none font-normal">
                    {moment(user?.register_date, "YYYYMMDDHHmmss").format("DD/MM/YYYY")}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-4 h-10 items-center">
                  <Shimmer className="w-4/12 h-full" />
                  <Shimmer className="w-8/12 h-full" />
                </div>
                <div className="flex gap-4 h-10 items-center">
                  <Shimmer className="w-4/12 h-full" />
                  <Shimmer className="w-8/12 h-full" />
                </div>
                <div className="flex gap-4 h-10 items-center">
                  <Shimmer className="w-4/12 h-full" />
                  <Shimmer className="w-8/12 h-full" />
                </div>
                <div className="flex gap-4 h-10 items-center">
                  <Shimmer className="w-4/12 h-full" />
                  <Shimmer className="w-8/12 h-full" />
                </div>
                <div className="flex gap-4 h-10 items-center">
                  <Shimmer className="w-4/12 h-full" />
                  <Shimmer className="w-8/12 h-full" />
                </div>
              </>
            )}
          </div>
          <div className=" w-full md:w-1/3 md:pl-10 center-flex flex-col gap-6">
            <div className="w-1/3 sm:w-1/4 md:w-2/3 aspect-square rounded-full overflow-hidden center-flex shadow-lg border-2 border-primaryDark">
              {file || user?.avatar ? (
                <img
                  src={file ? URL?.createObjectURL(file!) : user?.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="w-1/2 h-1/2 text-gray-400" />
              )}
            </div>
            <label
              htmlFor="avatar"
              className="center-flex gap-2 px-10 py-2 border border-primary rounded-lg select-none cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <FiUpload className="text-primary w-5 h-5" />
              <span className="text-primary font-bold">Upload</span>
              <input type="file" hidden id="avatar" onChange={(e) => setFile(e.target.files![0])} />
            </label>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleUpdateProfile}
            className="text-lg font-bold text-white px-16 py-2 rounded-lg bg-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Lưu
          </button>
        </div>
      </div>
    </>
  );
}

export default AccountProfile;
