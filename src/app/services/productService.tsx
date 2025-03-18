import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.product}`, { params })
    .then((response: any) => response.data);
}

export function getProById(id: string) {
  return axios
    .get(`${config.api.product}/${id}`)
    .then((response: any) => response.data);
}

export async function getSame(params: any) {
  return axios
    .get(`${config.api.product}/same`, { params })
    .then((response: any) => response.data);
}
