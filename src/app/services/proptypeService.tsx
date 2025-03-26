import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.proptype}`, { params })
    .then((response: any) => response.data);
}

export async function addProptype(body:any) {
  return axios
    .post(`${config.api.proptype}`, body)
    .then((response: any) => response.data);
}

export async function editProptype(id:string, body:any) {
  return axios
    .put(`${config.api.proptype}/${id}`, body)
    .then((response: any) => response.data);
}

export async function getOne(id:string) {
  return axios
    .get(`${config.api.proptype}/${id}`)
    .then((response: any) => response.data);
}

