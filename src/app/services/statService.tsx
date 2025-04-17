import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";

export function getAccessTokenAdmin() {
  return Cookies.get("access_token_admin") || false;
}

export function getRefreshTokenAdmin() {
  return Cookies.get("refresh_token_admin") || false;
}

export async function getQuery(params: any) {
  const headers = { Authorization: `Bearer ${getAccessTokenAdmin()}` };
  return axios
    .get(`${config.api.stats}`, { params, headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
