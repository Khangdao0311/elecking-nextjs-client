import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
    return axios
      .get(`${config.api.voucher}`, { params })
      .then((response: any) => response.data);
}