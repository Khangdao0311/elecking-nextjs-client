import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.category}`, { params })
    .then((response: any) => response.data);
}


export async function addCategory(body) {
  return axios
    .post(`${config.api.category},${body}`)
    .then((response: any) => response.data);
}