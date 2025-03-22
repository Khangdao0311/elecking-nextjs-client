import axios from "axios";
import config from "@/app/config";

export async function createPaymentUrl(order_id: string, total: number) {
  return axios
    .post(`${config.api.vnpay}/create_payment_url`, {
      order_id: order_id,
      total: total,
      bankCode: "",
    })
    .then((response: any) => response.data);
}
