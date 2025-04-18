import axios from "axios";
import config from "@/app/config";
import * as authServices from "./authService";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.property}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function getOne(id: string) {
  return axios
    .get(`${config.api.property}/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function addProperty(body: any) {
  const headers = {
    Authorization: `Bearer ${authServices.getAccessTokenAdmin()}`,
  };
  return axios
    .post(`${config.api.property}`, body, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function editProperty(id: string, body: any) {
  const headers = {
    Authorization: `Bearer ${authServices.getAccessTokenAdmin()}`,
  };
  return axios
    .put(`${config.api.property}/${id}`, body, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
