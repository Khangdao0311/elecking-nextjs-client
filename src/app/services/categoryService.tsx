import axios from "axios";
import config from "@/app/config";
import * as authServices from "./authService";

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
  const headers = {
    Authorization: `Bearer ${authServices.getAccessTokenAdmin()}`,
  };
  return axios
    .post(`${config.api.category}`, body, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function editCategory(id: string, body: any) {
  const headers = {
    Authorization: `Bearer ${authServices.getAccessTokenAdmin()}`,
  };
  return axios
    .put(`${config.api.category}/${id}`,  body , { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
