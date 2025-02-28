import axios from "axios";
import config from "../config";

export async function getpayment(params: any) {
    return axios
      .get(`${config.api.payment}`, { params })
      .then((response: any) => response.data);
  }