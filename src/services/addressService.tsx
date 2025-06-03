import axios from "axios";
import config from "@/config";
import * as authServices from "@/services/authService";

export async function getQuery(params: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessToken()}` };
  return axios
    .get(`${config.api.address}`, { params, headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function create(addressNew: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessToken()}` };
  return axios
    .post(`${config.api.address}`, addressNew, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function update(address_id: string, addressEdit: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessToken()}` };
  return axios
    .put(`${config.api.address}/update/${address_id}`, addressEdit, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

