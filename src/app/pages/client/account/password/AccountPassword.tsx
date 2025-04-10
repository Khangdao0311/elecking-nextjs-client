"use client";

import React, { useState } from "react";
import { Input } from "antd";
import { FaUser } from "react-icons/fa6";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import SidebarAccount from "@/app/components/client/SidebarAccount";
import { useStore } from "@/app/store";
import * as authServices from "@/app/services/authService";
import Shimmer from "@/app/components/client/Shimmer";

function AccountPassword() {
  const [state, dispatch] = useStore();

  const [initialValues, setInitialValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Mật khẩu hiện tại không được để trống"),
    newPassword: Yup.string().required("Mật khẩu mới không được để trống"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Mật khẩu xác nhận không khớp")
      .required("Vui lòng nhập lại mật khẩu mới"),
  });

  function handleChangePassword(values: any, resetForm: any) {
    authServices
      .changePassword(state.user.id, values.currentPassword, values.newPassword)
      .then((res) => {
        if (res.status == 200) resetForm();
      });
  }

  return (
    <div className="flex flex-col gap-6 ">
      <h2 className="text-2xl font-bold uppercase">Đổi mật khẩu</h2>
      <div className="w-full center-flex">
        <div className="w-32 h-32 aspect-square rounded-full overflow-hidden center-flex shadow-lg border-2 border-primaryDark">
          {state.user?.avatar ? (
            <img src={state.user?.avatar} alt="" className="w-full h-full object-cover" />
          ) : (
            <FaUser className="w-1/2 h-1/2 text-gray-400" />
          )}
        </div>
      </div>
      {/*  */}
      {!state.load ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleChangePassword(values, resetForm);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="flex flex-col gap-5 md:px-20">
              <input type="text" name="username" autoComplete="username" hidden />
              {/* Mật khẩu hiện tại */}
              <div className="flex flex-col gap-4">
                <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-thirdaryDark to-thirdary">
                  Mật khẩu hiện tại <span className="text-primary">*</span>
                </p>
                <div className="flex gap-4 h-10 items-center">
                  <p className="hidden md:flex w-1/4 h-fullitems-center justify-end select-none font-medium text-gray-700">
                    Mật khẩu hiện tại:
                  </p>
                  <Input.Password
                    name="currentPassword"
                    className="w-full md:w-3/4 h-full"
                    placeholder="Nhập mật khẩu hiện tại"
                    value={values.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                  />
                </div>
                <div className="flex gap-4 -mt-2">
                  <p className=" w-1/4 h-full"></p>
                  {errors.currentPassword && touched.currentPassword && (
                    <p className="w-3/4 text-red-500 text-sm">{errors.currentPassword}</p>
                  )}
                </div>
              </div>

              {/* Mật khẩu mới */}
              <div className="flex flex-col gap-4">
                <p className=" text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-thirdaryDark to-thirdary">
                  Mật khẩu mới <span className="text-primary">*</span>
                </p>
                <div className="flex gap-4 h-10 items-center">
                  <p className="hidden md:flex w-1/4 h-full items-center justify-end select-none font-medium text-gray-700">
                    Mật khẩu mới:
                  </p>
                  <Input.Password
                    name="newPassword"
                    className="w-full md:w-3/4 h-full"
                    placeholder="Nhập mật khẩu mới"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                  />
                </div>
                <div className="flex gap-4 -mt-2">
                  <p className="w-1/4 h-full"></p>
                  {errors.newPassword && touched.newPassword && (
                    <p className="text-red-500 text-sm">{errors.newPassword}</p>
                  )}
                </div>
                {/* Nhập lại mật khẩu mới */}
                <div className="flex gap-4 h-10 items-center">
                  <p className="hidden md:flex w-1/4 h-full items-center justify-end select-none font-medium text-gray-700">
                    Nhập lại mật khẩu mới:
                  </p>
                  <Input.Password
                    name="confirmPassword"
                    className="w-full md:w-3/4 h-full"
                    placeholder="Nhập lại mật khẩu mới"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="confirm-password"
                  />
                </div>
                <div className="flex gap-4 -mt-2">
                  <p className="w-1/4 h-full"></p>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Nút Submit */}
              <button
                type="submit"
                className="bg-primary center-flex p-4 rounded-lg text-base font-bold text-white"
              >
                Đổi mật khẩu
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="flex flex-col gap-5 md:px-20">
          <input type="text" name="username" autoComplete="username" hidden />
          <div className="flex flex-col gap-4">
            <Shimmer className= {"w-1/2 md:w-1/5 h-7"} />
            <div className="flex gap-4 h-10 items-center">
              <Shimmer className={"!hidden md:!flex w-1/4 h-10"} />
              <Shimmer className={"w-full md:w-3/4 h-10"} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Shimmer className={"w-1/2 md:w-1/5 h-7"} />
            <div className="flex gap-4 h-10 items-center">
            <Shimmer className={"!hidden md:!flex w-1/4 h-10"} />
            <Shimmer className={"w-full md:w-3/4 h-10"} />
            </div>
            <div className="flex gap-4 h-10 items-center">
            <Shimmer className={"!hidden md:!flex w-1/4 h-10"} />
            <Shimmer className={"w-full md:w-3/4 h-10"} />
            </div>
          </div>
          <Shimmer className={"w-full h-14"} />
        </div>
      )}

    </div>
  );
}

export default AccountPassword;
