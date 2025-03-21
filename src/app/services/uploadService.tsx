import axios from "axios";
import config from "@/app/config";

export async function uploadSingle(body:any) {
  return axios
    .post(`${config.api.upload}/image`,body)
    .then((res) => res.data);
}
export async function uploadMultiple(body:any) {
  return axios
    .post(`${config.api.upload}/images`,body)
    .then((res) => res.data);
}
