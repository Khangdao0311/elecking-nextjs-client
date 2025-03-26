import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios.get(`${config.api.address}`, { params }).then((response: any) => response.data);
}

export async function create(addressNew: any) {
  return axios.post(`${config.api.address}`, addressNew).then((response: any) => response.data);
}

export async function update(address_id: string, addressEdit: any) {
  return axios
    .put(`${config.api.address}/update/${address_id}`, addressEdit)
    .then((response: any) => response.data);
}

export async function edit(address_id: string, addressEdit: any) {
  return axios
    .put(`${config.api.address}/edit/${address_id}`, addressEdit)
    .then((response: any) => response.data);
}
