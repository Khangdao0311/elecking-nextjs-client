"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import config from "@/config";
import { actions, useStore } from "@/store";
import Loading from "@/components/client/Loading";
import Shimmer from "@/components/client/Shimmer";
import * as authServices from "@/services/authService";
import ModalNotification from "@/components/client/Modal/ModalNotification";

function Login() {
  const [state, dispatch] = useStore();
  const [notification, setNotification] = useState<any>({ status: null, mesage: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    account: Yup.string()
      .matches(/^\S+$/, "Tên tài khoản không được chứa khoảng trắng")
      .required("Vui lòng nhập tên tài khoản"),
    password: Yup.string()
      .matches(/^\S+$/, "Mật khẩu không được chứa khoảng trắng")
      .required("Vui lòng nhập mật khẩu"),
  });

  useEffect(() => {
    // if (!state.user) {
    localStorage.removeItem("user");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    dispatch(actions.set({ re_render: !state.re_render, user: null, wish: [], cart: [] }));
    // }
  }, []);

  async function handleLogin(values: any) {
    setLoading(true);
    authServices.login(values.account, values.password).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        Cookies.set("access_token", res.data.access_token, { expires: 1 });
        Cookies.set("refresh_token", res.data.refresh_token, { expires: 1 });
        setNotification({ status: true, message: "Đăng nhập thành công !" });
        setTimeout(() => {
          dispatch(actions.set_routing(true));
          router.push(config.routes.client.home);
        }, 1000);
      } else {
        setNotification({ status: false, message: res.message });
        setTimeout(() => {
          setNotification({ status: null, message: "" });
        }, 1000);
      }
    });
  }

  return (
    <>
      {loading && <Loading />}
      <ModalNotification noti={notification} />
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 center-flex mt-4">
        {state.load ? (
          <div className="bg-white p-8 rounded-lg border-gray-200 border shadow-xl w-[90vw] max-w-[500px] flex items-center gap-5 flex-col">
            <Shimmer className="w-1/3 h-8" />
            <div className="w-full flex flex-col gap-2">
              <Shimmer className="w-1/3 h-6" />
              <Shimmer className="w-full h-10" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Shimmer className="w-1/3 h-6" />
              <Shimmer className="w-full h-10" />
            </div>
            <div className="flex justify-end w-full">
              <Shimmer className="w-1/3 h-6" />
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
              account: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="bg-white p-8 rounded-lg border-gray-200 border shadow-xl w-[90vw] max-w-[500px] flex items-center gap-5 flex-col">
                <h2
                  className="text-2xl font-bold text-primary text-center w-full"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                >
                  Đăng nhập
                </h2>
                <div className="w-full flex flex-col gap-2">
                  <label className="block text-gray-700 font-medium text-base">Tên đăng nhập</label>
                  <Input
                    name="account"
                    className="w-full px-4 py-2.5 text-sm font-normal "
                    placeholder="Nhập tên tài khoản"
                    value={values.account}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="account"
                  />
                  {errors.account && touched.account ? (
                    <div className="text-red-500 text-sm">{errors.account}</div>
                  ) : null}
                </div>

                <div className="relative w-full flex flex-col gap-2">
                  <label className="block text-gray-700 font-medium text-base">Mật khẩu</label>
                  <Input.Password
                    name="password"
                    className="w-full px-4 py-2.5 text-sm font-normal border rounded-[4px] focus:outline-none focus:ring-2 focus:ring-primary"
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

                <div className="text-right w-full">
                  <Link
                    onClick={() => dispatch(actions.set_routing(true))}
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

                {/* <div className="gap-5 flex items-center justify-center text-center text-gray-500 relative w-full">
                    <div className="border-t absolute right-0 top-1/2 w-[180px] transform -translate-y-1/2 bg-gray-200"></div>
                    <span className="bg-white text-gray-400 text-sm font-medium">HOẶC</span>
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
                  </div> */}

                <div className="flex items-center justify-center w-full gap-1.5">
                  <div>Bạn mới đến ElecKing ?</div>
                  <Link
                    onClick={() => dispatch(actions.set_routing(true))}
                    href={config.routes.client.register}
                    className="text-primary font-semibold text-sm hover:underline cursor-pointer"
                  >
                    Đăng ký
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </section>
    </>
  );
}

export default Login;
