import axios from "axios";
import config from "@/app/config";

export async function uploadSingle(body: FormData) {
  return axios
    .post(`${config.api.upload}/image`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
export async function uploadMultiple(body: FormData) {
  return axios
    .post(`${config.api.upload}/images`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
