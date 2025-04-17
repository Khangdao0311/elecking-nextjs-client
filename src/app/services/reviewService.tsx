import axios from "axios";
import config from "@/app/config";
import * as authServices from "./authService";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.review}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function wish(review_id: string, user_id: string) {
  const headers = { Authorization: `Bearer ${authServices.getAccessToken()}` };
  return axios
    .post(`${config.api.review}/like/${review_id}`, { user_id: user_id }, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function create(review: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessToken()}` };
  return axios
    .post(`${config.api.review}`, review, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
