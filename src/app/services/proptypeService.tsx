import axios from "axios";
import config from "@/app/config";
import * as authServices from "./authService";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.proptype}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function getOne(id: string) {
  return axios
    .get(`${config.api.proptype}/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function addProptype(body: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` };
  return axios
    .post(`${config.api.proptype}`, body, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function editProptype(id: string, body: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` };
  return axios
    .put(`${config.api.proptype}/${id}`, body, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
