import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.user}`, { params })
    .then((response: any) => response.data);
}

export async function getById(id: string) {
  return axios 
  .get(`${config.api.user}/${id}`)
  .then((response: any) => response.data);
}