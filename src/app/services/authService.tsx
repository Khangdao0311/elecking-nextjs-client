import axios from "axios";
import config from "../config";

export async function login(account: string, password: string) {
  console.log(`${config.api.auth}/login`);
  
  return axios
    .post(`${config.api.auth}/login`, { account, password })
    .then((response: any) => response.data);
}
