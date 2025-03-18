import axios from "axios";
import config from "@/app/config";

export async function getpayment(params: any) {
  return axios
    .get(`${config.api.payment}`, { params })
    .then((response: any) => response.data);
}
export async function getById(id: string) {
  return axios
    .get(`${config.api.payment_method}/${id}`)
    .then((response: any) => response.data);
}
export async function getQuery() {
  return axios
    .get(`${config.api.payment_method}`)
    .then((response: any) => response.data);
}
