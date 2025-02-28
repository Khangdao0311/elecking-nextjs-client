import axios from "axios";
import config from "../config";

export async function getAll() {
    return axios
      .get(`${config.api.address}`)
      .then((response: any) => response.data.data);
  }