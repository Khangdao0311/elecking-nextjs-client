"use client";

import { GoArrowLeft } from "react-icons/go";
import { Input, notification, Space } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdMailLock } from "react-icons/md";

import config from "@/app/config";
import * as authServices from "@/app/services/authService";
import Loading from "@/app/components/client/Loading";
import { useStore, actions } from "@/app/store";

function ForgotPassword() {
  const [state, dispatch] = useStore();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email không đúng định dạng").required("Vui lòng nhập email"),
  });

  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message: string) => {
    api.error({
      message: message,
      placement: "topRight",
      style: {
        width: "fit-content",
        display: "inline-block",
        whiteSpace: "nowrap",
      },
    });
  };

  function handleSendFogotPassword(values: any) {
    setLoading(true);
    authServices.forgotPassword(values.email).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setSent(true);
        setEmail(values.email);
      } else {
        openNotification(res.message);
      }
    });
  }

  return (
    <>
      {loading && <Loading />}
      {contextHolder}
      <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
        <div className="flex items-center justify-center min-h-[500px]">
          {!sent && (
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSendFogotPassword}
            >
              {({ errors, touched, isValid }) => (
                <Form className="w-[600px] p-10 shadow-xl">
                  <div className="flex items-center justify-center flex-col gap-5">
                    <div className="flex items-center w-[100%] gap-28">
                      <button
                        className="text-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(actions.set_routing(true));
                          router.push(config.routes.client.login);
                        }}
                      >
                        <GoArrowLeft className="w-6 h-6" />
                      </button>
                      <div className="text-2xl font-bold text-primary">Quên mật khẩu</div>
                    </div>
                    <div className="flex flex-col gap-2 mx-auto w-[100%]">
                      <div className="text-base font-medium">Email của bạn</div>
                      <Field
                        className="text-sm font-normal text-gray-500 pt-4 pb-4 pl-4 border border-gray-200 rounded"
                        name="email"
                        type="email"
                        placeholder="Nhập email của bạn"
                      />
                      {errors.email && touched.email ? (
                        <div className="text-red-500 text-sm ">{errors.email}</div>
                      ) : null}
                    </div>
                    <button
                      disabled={!isValid}
                      className={`text-lg text-center font-bold text-white py-2.5 w-full bg-primary rounded ${
                        !isValid ? "opacity-50" : ""
                      }`}
                    >
                      Tiếp theo
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}

          {sent && (
            <div className="w-[600px] p-10 shadow-xl">
              <div className="flex items-center justify-center flex-col gap-2.5">
                <div className="center-flex w-full relative">
                  <button
                    onClick={() => {
                      setSent(false);
                      setEmail("");
                    }}
                    className="text-primary absolute top-1/2 -translate-y-1/2 left-0"
                  >
                    <GoArrowLeft className="w-6 h-6" />
                  </button>
                  <div className="text-2xl font-bold text-primary text-center">
                    Đặt lại mật khẩu
                  </div>
                </div>
                <MdMailLock className="w-20 h-20" />
                <div className="text-base font-normal">Mã xác nhận đã được gửi đến email</div>
                <div className="text-base font-medium text-primary">{email}</div>
                <div className="text-base font-normal"> Vui lòng xác minh.</div>

                <button
                  onClick={() => {
                    dispatch(actions.set_routing(true));
                    router.push(config.routes.client.login);
                  }}
                  type="submit"
                  className={`text-lg text-center font-bold text-white py-2.5 w-full bg-primary rounded`}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
