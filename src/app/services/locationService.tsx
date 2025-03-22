import axios from "axios";

export async function getProvince() {
  return axios
    .get(`https://provinces.open-api.vn/api/?depth=1`)
    .then((response: any) => response.data);
}

export async function getDistrict(code: number) {
  return axios
    .get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
    .then((response: any) => response.data);
}

export async function getWard(code: number) {
  return axios
    .get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
    .then((response: any) => response.data);
}
