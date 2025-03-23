import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.property}`, { params })
    .then((response: any) => response.data);
}