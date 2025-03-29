"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Modal } from "antd";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

import config from "@/app/config";
import * as authServices from "@/app/services/authService";
import Shimmer from "@/app/components/client/Shimmer";
import { useStore } from "@/app/store";
import Loading from "@/app/components/client/Loading";

function Register() {
  const [state, dispatch] = useStore();
  const [registerStatus, setRegisterStatus] = useState(false);
  const [messageError, setMessageError] = useState("Đăng ký thấy bại !");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Vui lòng nhập Họ và Tên"),
    email: Yup.string().email("Email không hợp lệ").required("vui lòng nhập Email"),
    username: Yup.string().required("Vui lòng nhập tên tài khoản"),
    password: Yup.string()
    .matches(/[a-z]/, "Ít nhất một ký tự viết thường")
      .matches(/[A-Z]/, "Ít nhất một ký tự viết hoa")
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?/~`-]+$/,
        "Chỉ chứa chữ cái, số và ký tự phổ biến"
      )
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(16, "Mật khẩu không được vượt quá 16 ký tự")
    .required("Vui lòng nhập mật khẩu"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
      .required("Vui lòng nhập lại mật khẩu"),
  });

  async function handleRegister(values: any) {
    setLoading(true);
    authServices
      .register(values.fullname, values.email, values.username, values.password)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setRegisterStatus(true);
          setShowModal(true);
          setTimeout(() => {
            router.push(config.routes.client.login);
          }, 1000);
        } else {
          setRegisterStatus(false);
          setShowModal(true);
          setMessageError(res.message);
          setTimeout(() => {
            setShowModal(false);
          }, 1500);
        }
      });
  }

  return (
    <>
      {loading && <Loading />}
      <Modal
        open={showModal}
        footer={null}
        title={null}
        centered
        maskClosable={false}
        closable={false}
        width="auto"
      >
        {registerStatus ? (
          <div className="center-flex flex-col gap-4">
            <div>
              <FaCircleCheck className="w-20 h-20 text-green-500 " />
            </div>
            <div className="text-lg font-medium text-green-700">Đăng ký thành công !</div>
          </div>
        ) : (
          <div className="center-flex flex-col gap-4">
            <div>
              <FaCircleExclamation className="w-20 h-20 text-red-500 " />
            </div>
            <div className="text-lg font-medium text-red-700">{messageError}</div>
          </div>
        )}
      </Modal>
      <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <section>
          <div className="flex justify-center items-center my-6">
            {state.load ? (
              <div className="bg-white p-8 rounded-lg border-gray-200 border shadow-xl w-[500px] flex items-center gap-5 flex-col">
                <Shimmer className="w-1/3 h-8" />
                <div className="w-full flex flex-col gap-2">
                  <Shimmer className="w-1/3 h-6" />
                  <Shimmer className="w-full h-10" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Shimmer className="w-2/5 h-6" />
                  <Shimmer className="w-full h-10" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Shimmer className="w-2/6 h-6" />
                  <Shimmer className="w-full h-10" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Shimmer className="w-1/3 h-6" />
                  <Shimmer className="w-full h-10" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Shimmer className="w-2/5 h-6" />
                  <Shimmer className="w-full h-10" />
                </div>
                <Shimmer className="w-full h-11" />
                <div className="flex items-center justify-center w-full gap-1.5">
                  <Shimmer className="w-1/2 h-6" />
                  <Shimmer className="w-1/6 h-6" />
                </div>
              </div>
            ) : (
              <Formik
                initialValues={{
                  fullname: "",
                  email: "",
                  username: "",
                  password: "",
                  repeatPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form className="bg-white p-8 rounded-lg border-gray-200 border shadow-xl w-[500px] flex items-center gap-5 flex-col">
                    <h2
                      className="text-2xl font-bold text-primary text-center w-full"
                      style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                    >
                      Đăng ký
                    </h2>
                    <div className="w-full flex flex-col gap-2">
                      <label className="block text-gray-700 font-medium text-base">Họ và tên</label>
                      <Input
                        name="fullname"
                        className="w-full px-4 py-2.5 text-sm font-normal "
                        placeholder="Nhập họ và tên"
                        value={values.fullname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="fullname"
                      />
                      {errors.fullname && touched.fullname ? (
                        <div className="text-red-500 text-sm">{errors.fullname}</div>
                      ) : null}
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label className="block text-gray-700 font-medium text-base">Email</label>
                      <Input
                        name="email"
                        className="w-full px-4 py-2.5 text-sm font-normal "
                        placeholder="Nhập email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                      />
                      {errors.email && touched.email ? (
                        <div className="text-red-500 text-sm">{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label className="block text-gray-700 font-medium text-base">
                        Tên đăng nhập
                      </label>
                      <Input
                        name="username"
                        className="w-full px-4 py-2.5 text-sm font-normal "
                        placeholder="Nhập tên tài khoản"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="username"
                      />
                      {errors.username && touched.username ? (
                        <div className="text-red-500 text-sm">{errors.username}</div>
                      ) : null}
                    </div>

                    <div className="relative w-full flex flex-col gap-2">
                      <label className="block text-gray-700 font-medium text-base">Mật khẩu</label>
                      <Input.Password
                        name="password"
                        className="w-full px-4 py-2.5 text-sm font-normal "
                        placeholder="Nhập mật khẩu"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="password"
                      />
                      {errors.password && touched.password ? (
                        <div className="text-red-500 text-sm">{errors.password}</div>
                      ) : null}
                    </div>

                    <div className="relative w-full flex flex-col gap-2">
                      <label className="block text-gray-700 font-medium text-base">
                        Nhập lại mật khẩu
                      </label>
                      <Input.Password
                        name="repeatPassword"
                        className="w-full px-4 py-2.5 text-sm font-normal "
                        placeholder="Nhập lại mật khẩu"
                        value={values.repeatPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="repeatPassword"
                      />
                      {errors.repeatPassword && touched.repeatPassword ? (
                        <div className="text-red-500 text-sm">{errors.repeatPassword}</div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-red-600 text-white text-lg font-bold py-2 rounded-[4px] shadow-lg transition duration-300"
                    >
                      Đăng ký
                    </button>
                    <div className="flex items-center justify-center w-full gap-1.5">
                      <div>Bạn đã có tài khoản ?</div>
                      <Link
                        href={config.routes.client.login}
                        className="text-primary font-semibold text-sm hover:underline cursor-pointer"
                      >
                        Đăng nhập
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
