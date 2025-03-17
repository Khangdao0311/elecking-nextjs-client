"use client";

import Link from "next/link";
import config from "@/app/config";
import { useState } from "react";
import { FaEye, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { LuEyeClosed } from "react-icons/lu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as authServices from "@/app/services/authService";
import { useRouter } from "next/navigation";
import ModalAddProduct from "@/app/components/client/ModalAddProduct";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

function Register() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showRepassword, setShowRepassword] = useState(false);
  const toggleRepasswordVisibility = () => {
    setShowRepassword(!showRepassword);
  };

  const router = useRouter();
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Vui lòng nhập Họ và Tên"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("vui lòng nhập Email"),
    username: Yup.string().required("Vui lòng nhập tên tài khoản"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
      .required("Vui lòng nhập lại mật khẩu"),
  });

  async function handleRegister(values: any) {
    const { fullname, email, username, password, repeatPassword } =
      await values;
    authServices
      .register(fullname, email, username, password)
      .then((res) => {
        if (res.status === 200) {
          setLoginSuccess(true);
        } else {
          setLoginFail(true);
        }
      })
      .catch(() => setLoginFail(true));
  }

  return (
    <>
      <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <section>
          <div className="flex justify-center items-center my-20">
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
              {({ errors, touched }) => (
                <Form className="bg-white p-8 rounded-lg border-gray-200 border shadow-xl w-[524px] flex items-center gap-5 flex-col">
                  <h2
                    className="text-2xl font-bold text-primary text-center w-full"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                  >
                    Đăng ký
                  </h2>
                  <div className="w-full flex flex-col gap-2">
                    <label className="block text-gray-700 font-medium text-base">
                      Họ và tên
                    </label>
                    <Field
                      type="text"
                      name="fullname"
                      placeholder="Nhập tên đăng nhập"
                      className="w-full px-4 py-4 text-sm font-normal border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.fullname && touched.fullname ? (
                      <div className="text-red-500 py-2">{errors.fullname}</div>
                    ) : null}
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="block text-gray-700 font-medium text-base">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Nhập email hoặc số điện thoại"
                      className="w-full px-4 py-4 text-sm font-normal border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-500 py-2">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="block text-gray-700 font-medium text-base">
                      Tên đăng nhập
                    </label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="Nhập tên đăng nhập"
                      className="w-full px-4 py-4 text-sm font-normal border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.username && touched.username ? (
                      <div className="text-red-500 py-2">{errors.username}</div>
                    ) : null}
                  </div>

                  <div className="relative w-full flex flex-col gap-2">
                    <label className="block text-gray-700 font-medium text-base">
                      Mật khẩu
                    </label>
                    <div className="relative w-full flex items-center">
                      <Field
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        name="password"
                        className="w-full px-4 py-4 text-sm font-normal border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 flex items-center cursor-pointer text-gray-500"
                      >
                        {showPassword ? (
                          <LuEyeClosed className="w-6 h-6" />
                        ) : (
                          <FaEye className="w-6 h-6" />
                        )}
                      </span>
                    </div>
                    {errors.password && touched.password ? (
                      <div className="text-red-500 py-2">{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="relative w-full flex flex-col gap-2">
                    <label className="block text-gray-700 font-medium text-base">
                      Nhập lại mật khẩu
                    </label>
                    <div className="relative w-full flex items-center">
                      <Field
                        type={showRepassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu"
                        name="repeatPassword"
                        className="w-full px-4 py-4 text-sm font-normal border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <span
                        onClick={toggleRepasswordVisibility}
                        className="absolute right-3 flex items-center h-full cursor-pointer text-gray-500"
                      >
                        {showRepassword ? (
                          <LuEyeClosed className="w-6 h-6" />
                        ) : (
                          <FaEye className="w-6 h-6" />
                        )}
                      </span>
                    </div>
                    {errors.repeatPassword && touched.repeatPassword ? (
                      <div className="text-red-500 py-2">
                        {errors.repeatPassword}
                      </div>
                    ) : null}
                  </div>

                  <div className="text-right w-full">
                    <div className="text-blue-500 text-sm font-bold hover:underline">
                      Quên mật khẩu?
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-red-600 text-white text-lg font-bold py-2 rounded-[4px] shadow-lg transition duration-300"
                  >
                    Đăng ký
                  </button>

                  <div className="gap-5 flex items-center justify-center text-center text-gray-500 relative w-full">
                    <div className="border-t absolute right-0 top-1/2 w-[180px] transform -translate-y-1/2 bg-gray-200"></div>
                    <span className="bg-white text-gray-400 text-sm font-medium">
                      HOẶC
                    </span>
                    <div className="border-t absolute left-0 top-1/2  w-[180px] transform -translate-y-1/2 bg-gray-200"></div>
                  </div>

                  <div className="flex justify-center gap-4 w-full">
                    <div className="flex w-1/2 items-center gap-2 border border-gray-200 rounded-md py-2 px-4 shadow-md transition duration-300">
                      <FcGoogle className="w-6 h-6" />
                      <div className="text-sm font-medium">Google</div>
                    </div>
                    <div className="flex w-1/2 items-center gap-2 border border-gray-200 rounded-md py-2 px-4 shadow-md transition duration-300">
                      <FaFacebook className="w-6 h-6 text-blue-600" />
                      <div className="text-sm font-medium">Facebook</div>
                    </div>
                  </div>

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
          </div>
        </section>
      </div>

      {loginSuccess && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 w-[519px] h-[250px] p-10 bg-white rounded-2xl z-50 items-center justify-center shadow-lg">
            <div>
              <HiCheckCircle className="w-24 h-24 fill-green-500 text-white" />
            </div>
            <div className="text-2xl font-bold">Đăng ký thành công!</div>
            <button
              onClick={() => router.push(config.routes.client.login)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Đăng nhập ngay
            </button>
          </div>
        </>
      )}
      {loginFail && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 w-[519px] h-[250px] p-10 bg-white rounded-2xl z-50 items-center justify-center shadow-lg">
            <div>
              <HiXCircle className="w-24 h-24 fill-red-500 text-white" />
            </div>
            <div className="text-2xl font-bold">Đăng ký thất bại!</div>
            <button
              onClick={() => setLoginFail(false)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Quay lại
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
