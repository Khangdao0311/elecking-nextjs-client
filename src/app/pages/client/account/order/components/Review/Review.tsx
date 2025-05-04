"use client";

import { message, Rate, Upload, UploadFile } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import * as reviewServices from "@/app/services/reviewService";
import * as authServices from "@/app/services/authService";
import { useStore, actions } from "@/app/store";
import config from "@/app/config";
import Loading from "@/app/components/client/Loading";
import ModalNotification from "@/app/components/client/Modal/ModalNotification";

function Review(props: { order_id: any; indexReview: number; productOrder: any; onClose: any }) {
  const [state, dispatch] = useStore();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<any>({ status: null, message: "" });

  const router = useRouter();

  function handleReview() {
    const formDataUpload = new FormData();
    fileList.forEach((image: any) => {
      formDataUpload.append("images", image.originFileObj);
    });
    formDataUpload.append("rating", rating.toString());
    formDataUpload.append("content", content);
    formDataUpload.append("order_id", props.order_id);
    formDataUpload.append("product_id", props.productOrder.product.id);
    formDataUpload.append("indexReview", props.indexReview.toString());

    setLoading(true);
    (function callback() {
      reviewServices.create(formDataUpload).then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setNotification({ status: true, message: "Đánh giá thành công !" });
          setTimeout(() => {
            setRating(5);
            setContent("");
            setFileList([]);
            setNotification({ status: null, message: "" });
            props.onClose();
            dispatch(actions.re_render());
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

  return (
    <>
      {loading && <Loading />}
      <ModalNotification noti={notification} />
      <div className="w-[450px] flex flex-col gap-4">
        <h2 className="text-xl font-bold uppercase">Đánh giá sản phẩm</h2>
        <div className="!flex w-full gap-2 py-2 px-3 rounded-lg bg-white drop-shadow-xl border border-gray-300">
          <div className="w-20 h-20 rounded-lg shrink-0">
            <img
              src={props.productOrder.product.image}
              alt={props.productOrder.product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-base font-medium text-gray-700">
              {props.productOrder.product.name} / x{props.productOrder.quantity}
            </p>
            <p className="text-base font-medium text-primary">
              {props.productOrder.product.price.toLocaleString("vi-VN")} đ
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Rate
            value={rating}
            allowClear={false}
            onChange={(e) => setRating(e)}
            className="text-2xl text-secondaryDark"
          />
          <textarea
            className="w-full border border-gray-200 rounded-lg p-4 outline-gray-300 outline-1 ou"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nhập nội đung đánh giá về sản phẩm trên..."
          ></textarea>
          <div className="overflow-auto max-h-56 ">
            <Upload
              multiple
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList: newFileList }) => {
                const uniqueFiles = newFileList.filter(
                  (file, index, self) => index === self.findIndex((f) => f.name === file.name)
                );
                setFileList(uniqueFiles);
              }}
              showUploadList={{ showPreviewIcon: false }} // Ẩn icon con mắt
            >
              <button className="center-flex gap-2 flex-col" type="button">
                <FaPlus />
                <div>Upload</div>
              </button>
            </Upload>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={() => {
              props.onClose();
              setRating(5);
              setContent("");
              setFileList([]);
            }}
            className="text-base font-bold text-primary border border-primary rounded px-8 py-2 select-none cursor-pointer shadow-lg"
          >
            Trở về
          </button>
          <button
            onClick={handleReview}
            className="text-base font-bold bg-primary text-white rounded px-8 py-2 select-none cursor-pointer shadow-lg"
          >
            Đánh giá
          </button>
        </div>
      </div>
    </>
  );
}

export default Review;
