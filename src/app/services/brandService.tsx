import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.brand}`, { params })
    .then((response: any) => response.data);
}

export async function addBrand(body) {
  return axios
    .post(`${config.api.brand},${body}`)
    .then((response: any) => response.data);
}


