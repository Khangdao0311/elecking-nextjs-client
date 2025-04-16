import axios from "axios";
import Cookies from "js-cookie";
import config from "@/app/config";

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
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  return axios
    .put(`${config.api.auth}/change-password/${user_id}`, { passwordOld, passwordNew }, { headers })
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

export async function cart(id: string, cartData: any) {
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  return axios
    .post(`${config.api.auth}/cart/${id}`, { cart: JSON.stringify(cartData) }, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function wish(id: string, product_id: string) {
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  return axios
    .post(`${config.api.auth}/wish/${id}`, { product_id: product_id }, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export function getAccessToken() {
  return Cookies.get("access_token") || false;
}

export function getRefreshToken() {
  return Cookies.get("refresh_token") || false;
}

export function clearUser() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  localStorage.removeItem("user");
}

export function getAccessTokenAdmin() {
  return Cookies.get("access_token_admin") || false;
}

export function getRefreshTokenAdmin() {
  return Cookies.get("refresh_token_admin") || false;
}

export function clearAdmin() {
  Cookies.remove("access_token_admin");
  Cookies.remove("refresh_token_admin");
  localStorage.removeItem("admin");
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

export async function updateProfile(user_id: string, profile: any) {
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  return axios
    .put(`${config.api.auth}/profile/${user_id}`, profile, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function cancelOrder(order_id: string) {
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  return axios
    .get(`${config.api.auth}/cancel_order/${order_id}`, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function removeAddress(address_id: string) {
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  return axios
    .get(`${config.api.auth}/remove_address/${address_id}`, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
