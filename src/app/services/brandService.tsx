import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.brand}`, { params })
    .then((response: any) => response.data);
}
export async function getById(id: string) {
  return axios
    .get(`${config.api.brand}/${id}`)
    .then((response: any) => response.data);
}

export async function addBrand(body:any) {
  return axios
    .post(`${config.api.brand}`,body)
    .then((response: any) => response.data);
}

export async function editBrand( id: any,body:any) {
  return axios
    .put(`${config.api.brand}/${id}`,body)
    .then((res)=> res.data)
}


