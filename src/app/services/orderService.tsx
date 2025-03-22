import axios from "axios";
import config from "@/app/config";

export async function getQuery(params: any) {
  return axios.get(`${config.api.order}`, { params }).then((response: any) => response.data);
}

export async function getById(id: string) {
  return axios.get(`${config.api.order}/${id}`).then((response: any) => response.data);
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
  return axios
    .post(`${config.api.order}/create`, {
      total,
      price_ship,
      note,
      products,
      user_id,
      voucher_id,
      payment_method_id,
      address_id,
    })
    .then((response: any) => response.data);
}

export async function updateTransactionCode(id: string, transaction_code: string) {
  return axios
    .put(`${config.api.order}/update_transaction_code/${id}`, {
      transaction_code: transaction_code,
    })
    .then((response: any) => response.data);
}

export async function updateStatus(id: string, status: number) {
  return axios
    .put(`${config.api.order}/update_status/${id}`, {
      status: status,
    })
    .then((response: any) => response.data);
}
  