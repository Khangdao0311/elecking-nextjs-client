"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { FaEye, FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LuEyeClosed } from "react-icons/lu";
import * as authServices from "@/app/services/authService";
import config from "@/app/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { Modal } from "antd";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    account: Yup.string().required("Vui lòng nhập tài khoản"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(values: any) {
    const { account, password } = await values;
    authServices
      .login(account, password)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem(
            "access_token",
            JSON.stringify(res.data.access_token)
          );
          localStorage.setItem(
            "refresh_token",
            JSON.stringify(res.data.refresh_token)
          );
          setLoginSuccess(true);
          setTimeout(() => router.push("/home"), 1000);
        }
      })
      .catch((error: any) => {
        if (error.response?.status === 400) {
          setLoginFail(true);
        } else {
          setLoginFail(true);
        }
      });
  }

  return (
    <>
      <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <section>
          <div className="flex justify-center items-center my-20">
            <Formik
              initialValues={{
                account: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ errors, touched }) => (
                <Form className="bg-white p-8 rounded-lg border-gray-200 border shadow-xl w-[524px] flex items-center gap-5 flex-col">
                  <h2
                    className="text-2xl font-bold text-primary text-center w-full"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                  >
                    Đăng nhập
                  </h2>
                  <div className="w-full flex flex-col gap-2">
                    <label className="block text-gray-700 font-medium text-base">
                      Tên đăng nhập
                    </label>
                    <Field
                      className="w-full px-4 py-4 text-sm font-normal border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary"
                      name="account"
                      type="text"
                      placeholder="Nhập tên tài khoản"
                    />
                    {errors.account && touched.account ? (
                      <div className="text-red-500 py-2">{errors.account}</div>
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

                  <div className="text-right w-full">
                    <Link
                      href={config.routes.client.forgotPassword}
                      className="text-blue-500 text-sm font-bold hover:underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-red-600 text-white text-lg font-bold py-2 rounded-[4px] shadow-lg transition duration-300"
                  >
                    Đăng nhập
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
                    <div>Bạn mới đến ElecKing ?</div>
                    <Link
                      href={config.routes.client.register}
                      className="text-primary font-semibold text-sm hover:underline cursor-pointer"
                    >
                      Đăng ký
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </div>
      <Modal
        open={loginSuccess}
        closeIcon={<div className="hidden" />}
        onCancel={() => setLoginSuccess(false)}
        footer={null}
        title={null}
        centered
        maskClosable={false}
      >
        {loginSuccess && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 w-[519px] h-[250px] p-10 bg-white rounded-2xl z-50 items-center justify-center shadow-lg">
              <div>
                <HiCheckCircle className="w-24 h-24 fill-green-500 text-white" />
              </div>
              <div className="text-2xl font-bold">Đăng nhập thành công!</div>
            </div>
          </>
        )}
      </Modal>
      <Modal
        open={loginFail}
        closeIcon={<div className="hidden" />}
        onCancel={() => setLoginFail(false)}
        footer={null}
        title={null}
        centered
        maskClosable={false}
      >
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
      </Modal>
    </>
  );
}

export default Login;
