import axios from "axios";
import config from "../config";

export async function login(account: string, password: string) {
  return axios
    .post(`${config.api.auth}/login`, { account, password })
    .then((response: any) => response.data);
}

export async function cart(id: string, cart: any) {
  return axios
    .post(`${config.api.auth}/cart/${id}`, { cart: JSON.stringify(cart) })
    .then((response: any) => response.data);
}
