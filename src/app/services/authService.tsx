import axios from "axios";
import config from "@/app/config";
import Cookies from "js-cookie";

export async function login(account: string, password: string) {
  return axios
    .post(`${config.api.auth}/login`, { account, password })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function loginAmin(account: string, password: string) {
  return axios
    .post(`${config.api.auth}/login-admin`, { account, password })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function changePassword(user_id: string, passwordOld: string, passwordNew: string) {
  return axios
    .put(`${config.api.auth}/change-password/${user_id}`, { passwordOld, passwordNew })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
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
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function cart(id: string, cart: any) {
  return axios
    .post(`${config.api.auth}/cart/${id}`, { cart: JSON.stringify(cart) })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function wish(id: string, product_id: string) {
  return axios
    .post(`${config.api.auth}/wish/${id}`, { product_id: product_id })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export function getAccessToken() {
  return Cookies.get("access_token") || false;
}

export function getRefreshToken() {
  return Cookies.get("refresh_token") || false;
}

export async function getToken(refresh_token: string) {
  return axios
    .post(`${config.api.auth}/get_token`, { refresh_token: refresh_token })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function forgotPassword(email: string) {
  return axios
    .post(`${config.api.auth}/forgot-password`, { email: email })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function resetPassword(token: string, passwordNew: string) {
  return axios
    .post(`${config.api.auth}/reset-password`, { token: token, passwordNew: passwordNew })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
