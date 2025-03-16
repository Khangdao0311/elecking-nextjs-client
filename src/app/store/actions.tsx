import { SET } from "./constants";

export const set = (payload: string) => ({
  type: SET,
  payload,
});
