import axios from "axios";
import config from "@/app/config";

export async function uploadSingle() {
  return axios.post(`${config.api.upload}/image`).then(res => res.data)
}
export async function uploadMultiple() {
  return axios.post(`${config.api.upload}/images`).then(res => res.data)
}