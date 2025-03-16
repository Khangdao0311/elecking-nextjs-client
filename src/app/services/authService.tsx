import axios from "axios";
import config from "../config";

export async function login(account: string, password: string) {
  return axios
    .post(`${config.api.auth}/login`, { account, password })
    .then((response: any) => response.data);
}

export async function register(
  fullname: string,
  email: string,
  username: string,
  password: string
) {
  return axios
    .post(`${config.api.auth}/register`, {
      fullname,
      email,
      username,
      password,
    })
    .then((response: any) => response.data);
}

export async function cart(id: string, cart: any) {
  return axios
    .post(`${config.api.auth}/cart/${id}`, { cart: JSON.stringify(cart) })
    .then((response: any) => response.data);
}

export async function wish(id: string, product_id: string) {
  return axios
    .post(`${config.api.auth}/wish/${id}`, { product_id: product_id })
    .then((response: any) => response.data);
}
