import axios from "axios";
import config from "@/app/config";
import { getAccessTokenAdmin } from "./authService";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.brand}`, { params})
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
export async function getById(id: string) {
  return axios
    .get(`${config.api.brand}/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function addBrand(body:any) {
  const headers = { Authorization: `Bearer ${getAccessTokenAdmin()}` };
  return axios
    .post(`${config.api.brand}`,body, {headers})
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function editBrand( id: any,body:any) {
  const headers = { Authorization: `Bearer ${getAccessTokenAdmin()}` };
  return axios
    .put(`${config.api.brand}/${id}`,body, {headers})
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}


