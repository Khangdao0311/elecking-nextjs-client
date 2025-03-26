import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.user}`, { params })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function getById(id: string) {
  return axios
    .get(`${config.api.user}/${id}`)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function updateStatus(user_id: string, body: any) {
  return axios
    .put(`${config.api.user}/status/${user_id}`, body)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function updateProfile(user_id: string, profile: any) {
  return axios
    .put(`${config.api.user}/profile/${user_id}`, profile)
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
