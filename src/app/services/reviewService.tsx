import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.review}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function wish(review_id: string, user_id: string) {
  return axios
    .post(`${config.api.review}/like/${review_id}`, { user_id: user_id })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function create(review: any) {
  return axios
    .post(`${config.api.review}`, review)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
