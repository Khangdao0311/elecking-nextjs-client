import axios from "axios";
import config from "@/app/config";
import * as authServices from "./authService"

export async function uploadSingle(body: FormData) {
  const headers = {
    Authorization: `Bearer ${authServices.getAccessTokenAdmin()}`,
  };
  return axios
    .post(`${config.api.upload}/image`, {body},{headers})
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
export async function uploadMultiple(body: FormData) {
  return axios
    .post(`${config.api.upload}/images`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
