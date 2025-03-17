import { LOAD, SET_WISH } from "./constants";

export const load = () => ({
  type: LOAD,
  payload: null,
});
export const setWish = (payload: any) => ({
  type: SET_WISH,
  payload: payload,
});
