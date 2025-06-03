import axios from "axios";
import config from "@/config";
import * as authServices from "./authService";

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

export async function viewUp(id: string) {
  return axios
    .get(`${config.api.product}/view_up/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function addProduct(body: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` };
  return axios
    .post(`${config.api.product}`, body, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function editProduct(id: any, body: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` };
  return axios
    .put(`${config.api.product}/${id}`, body, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
