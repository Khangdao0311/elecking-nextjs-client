import axios from "axios";
import config from "@/config";
import * as authServices from "./authService";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.voucher}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function getVoucherById(id: string) {
  return axios
    .get(`${config.api.voucher}/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function addVoucher(body: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` };
  return axios
    .post(`${config.api.voucher}`, body, {headers})
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function editVoucher(id: any, body: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` }
  return axios
    .put(`${config.api.voucher}/${id}`, body, {headers})
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}