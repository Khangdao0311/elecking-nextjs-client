import axios from "axios";
import config from "@/config";
import * as authServices from "./authService";

export async function getQuery(params: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` };
  return axios
    .get(`${config.api.order}`, { params, headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function getById(id: string) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` };
  return axios
    .get(`${config.api.order}/${id}`, { headers })
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function inset({
  total,
  price_ship,
  note,
  products,
  user_id,
  voucher_id,
  payment_method_id,
  address_id,
}: any) {
  const headers = { Authorization: `Bearer ${authServices.getAccessToken()}` };
  return axios
    .post(
      `${config.api.order}/create`,
      {
        total,
        price_ship,
        note,
        products,
        user_id,
        voucher_id,
        payment_method_id,
        address_id,
      },
      { headers }
    )
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function updateTransactionCode(id: string, transaction_code: string) {
  const headers = { Authorization: `Bearer ${authServices.getAccessToken()}` };
  return axios
    .put(
      `${config.api.order}/update_transaction_code/${id}`,
      {
        transaction_code: transaction_code,
      },
      { headers }
    )
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}

export async function updateStatus(order_id: string, status: number) {
  const headers = { Authorization: `Bearer ${authServices.getAccessTokenAdmin()}` };
  return axios
    .put(
      `${config.api.order}/update_status/${order_id}`,
      {
        status: status,
      },
      { headers }
    )
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
