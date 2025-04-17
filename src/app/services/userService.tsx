import axios from "axios";
import config from "@/app/config";
import * as authServices from "./authService";

export async function getQuery(params: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` };
  return axios
    .get(`${config.api.user}`, { params, headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
export async function getById(id: string) {
  const headers = { Authorization: `Bearer ${authServices.getAccessToken()}` };
  return axios
    .get(`${config.api.user}/${id}`, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
export async function updateStatus(user_id: string, body: any) {
  return axios
    .put(`${config.api.user}/status/${user_id}`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
