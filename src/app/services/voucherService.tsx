import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.voucher}`, { params })
    .then((response: any) => response.data);
}

export async function getVoucherById(id: string) {
  return axios
    .get(`${config.api.voucher}/${id}`)
    .then((response: any) => response.data);
}

export async function addVoucher(body:any) {
  return axios
    .post(`${config.api.voucher}`,body)
    .then((response: any) => response.data);
}

export async function editBrand( id: any, body:any) {
  return axios
    .put(`${config.api.voucher}/${id}`,body)
    .then((res)=> res.data)
}