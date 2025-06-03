import axios from "axios";
import config from "@/config";
import * as authServices from "./authService";

export async function createPaymentUrl(order_id: string, total: number) {
  const headers = { Authorization: `Bearer ${authServices.getAccessToken()}` };
  return axios
    .post(
      `${config.api.vnpay}/create_payment_url`,
      {
        order_id: order_id,
        total: total,
        bankCode: "",
      },
      { headers }
    )
    .then((response: any) => response.data)
    .catch((error: any) => error.response.data);
}
