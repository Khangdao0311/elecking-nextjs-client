import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.payment_method}`, { params })
    .then((response: any) => response.data);
}
export async function getById(id: string) {
  return axios.get(`${config.api.payment_method}/${id}`).then((response: any) => response.data);
}
