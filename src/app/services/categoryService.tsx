import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.category}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
export async function getOne(id: string) {
  return axios
    .get(`${config.api.category}/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function addCategory(body: any) {
  return axios
    .post(`${config.api.category}`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function editCategory(id: string, body: any) {
  return axios
    .put(`${config.api.category}/${id}`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
