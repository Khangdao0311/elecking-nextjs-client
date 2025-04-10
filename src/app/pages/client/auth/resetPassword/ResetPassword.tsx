"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { Input, Modal } from "antd";

import Loading from "@/app/components/client/Loading";
import { actions, useStore } from "@/app/store";
import config from "@/app/config";
import * as authServices from "@/app/services/authService";
import Shimmer from "@/app/components/client/Shimmer";

function ResetPassword() {
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { token } = useParams();
  const router = useRouter();

  if (!token) {
    dispatch(actions.set_routing(true));
    router.push(config.routes.client.forgotPassword);
  }

  const validationSchema = Yup.object().shape({
    passwordNew: Yup.string()
      .matches(/[a-z]/, "Ít nhất một ký tự viết thường")
      .matches(/[A-Z]/, "Ít nhất một ký tự viết hoa")
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?/~`-]+$/,
        "Chỉ chứa chữ cái, số và ký tự phổ biến"
      )
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(16, "Mật khẩu không được vượt quá 16 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });

  function handleResetPassword(values: any) {
    setLoading(true);
    authServices.resetPassword(token!.toString(), values.passwordNew).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setStatus(true);
        setShowModal(true);
        setTimeout(() => {
          dispatch(actions.set_routing(true));
          router.push(config.routes.client.login);
        }, 1500);
      }
      if (res.status === 401) {
        setStatus(false);
        setShowModal(true);
        setTimeout(() => {
          dispatch(actions.set_routing(true));
          router.push(config.routes.client.forgotPassword);
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
        {status ? (
          <div className="center-flex flex-col gap-4">
            <div>
              <FaCircleCheck className="w-20 h-20 text-green-500 " />
            </div>
            <div className="text-lg font-medium text-green-700">
              Thiết lập lại mật khẩu thành công !
            </div>
          </div>
        ) : (
          <div className="center-flex flex-col gap-4">
            <div>
              <FaCircleExclamation className="w-20 h-20 text-red-500 " />
            </div>
            <div className="text-lg font-medium text-red-700">Token hết hạng sử dụng !</div>
          </div>
        )}
      </Modal>
      <section className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0 center-flex mt-4">
        {state.load ? (
          <div className="w-[90vw] max-w-[500px] p-10 shadow-xl flex flex-col gap-5 rounded-lg">
            <div className="w-full center-flex ">
              <Shimmer className="w-2/3 h-8" />
            </div>
            <div className=" flex flex-col gap-4">
              <Shimmer className="w-1/4 h-6" />
              <Shimmer className="w-full h-12" />
              <div className="flex flex-col gap-2">
                <Shimmer className="w-5/12 h-6" />
                <Shimmer className="w-2/5 h-6" />
                <Shimmer className="w-1/4 h-6" />
                <Shimmer className="w-1/2 h-6" />
              </div>
            </div>
            <Shimmer className="w-full h-12" />
          </div>
        ) : (
          <Formik
            initialValues={{
              passwordNew: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleResetPassword}
          >
            {({ values, errors, touched, isValid, handleChange, handleBlur }) => {
              const passwordChecks = [
                { regex: /[a-z]/, text: "Ít nhất một ký tự viết thường" },
                { regex: /[A-Z]/, text: "Ít nhất một ký tự viết hoa" },
                { regex: /^.{8,16}$/, text: "8 - 16 ký tự" },
                {
                  regex: /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?/~`-]+$/,
                  text: "Chỉ chứa chữ cái, số và ký tự phổ biến",
                },
              ];

              return (
                <Form className="w-[90vw] max-w-[500px] rounded-lg p-10 shadow-xl flex items-center justify-center flex-col gap-5">
                  <div className="w-full text-center text-2xl font-bold text-primary">
                    Thiết lập lại mật khẩu
                  </div>
                  <div className="flex flex-col gap-4 mx-auto w-[100%]">
                    <div className="text-base font-medium">Mật khẩu Mới</div>
                    <Input.Password
                      name="passwordNew"
                      className="text-base p-2.5 font-normal rounded"
                      placeholder="Nhập mật khẩu mới"
                      value={values.passwordNew}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="new-password"
                    />
                    <div className="flex flex-col gap-2">
                      {passwordChecks.map(({ regex, text }, index) => (
                        <div
                          key={index}
                          className={`text-base  ${
                            regex.test(values.passwordNew)
                              ? "text-green-600 font-bold"
                              : "opacity-50"
                          }`}
                        >
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    disabled={!isValid}
                    className={`text-lg text-center font-bold text-white py-2.5 w-full bg-primary rounded ${
                      !isValid ? "opacity-50" : ""
                    }`}
                  >
                    Tiếp theo
                  </button>
                </Form>
              );
            }}
          </Formik>
        )}
      </section>
    </>
  );
}

export default ResetPassword;
