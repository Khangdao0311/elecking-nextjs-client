"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Loading from "@/app/components/client/Loading";
import { useStore } from "@/app/store";
import config from "@/app/config";
import * as authServices from "@/app/services/authService";
import { Input } from "antd";

function ResetPassword() {
  const [state, dispatch] = useStore();
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const router = useRouter();

  if (!token) router.push(config.routes.client.forgotPassword);

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
    authServices.resetPassword(token!.toString(), values.passwordNew).then((res) => {
      if (res.status === 200) {
        router.push(config.routes.client.login);
      }
      if (res.status === 401) {
        router.push(config.routes.client.forgotPassword);
      }
    });
  }

  return (
    <div className="container-custom py-4 px-3 md:px-3.5 lg:px-4 xl:px-0">
      <div className="flex items-center justify-center min-h-[500px]">
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
              <Form className="w-[600px] p-10 shadow-xl">
                <div className="flex items-center justify-center flex-col gap-5">
                  <div className="text-2xl font-bold text-primary">Thiết lập lại mật khẩu</div>
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
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;
