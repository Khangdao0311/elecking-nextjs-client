import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios
    .get(`${config.api.proptype}`, { params })
    .then((response: any) => response.data);
}