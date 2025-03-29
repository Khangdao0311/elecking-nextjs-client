import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.product}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export function getProById(id: string) {
  return axios
    .get(`${config.api.product}/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function getSame(params: any) {
  return axios
    .get(`${config.api.product}/same`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function addProduct(body: any) {
  return axios
    .post(`${config.api.product}`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
export async function editProduct(id: any,body: any) {
  return axios
    .put(`${config.api.product}/${id}`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
