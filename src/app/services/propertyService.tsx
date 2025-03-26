import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.property}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function addProperty(body: any) {
  return axios
    .post(`${config.api.property}`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function editProperty(id: string, body: any) {
  return axios
    .put(`${config.api.property}/${id}`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function getOne(id: string) {
  return axios
    .get(`${config.api.property}/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
