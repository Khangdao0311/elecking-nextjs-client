import { LOAD, RE_RENDER, SET, SET_WISH, SET_SEARCH, SET_ROUTING } from "./constants";

export const load = () => ({
  type: LOAD,
  payload: null,
});

export const re_render = () => ({
  type: RE_RENDER,
  payload: null,
});

export const set_routing = (payload: any) => ({
  type: SET_ROUTING,
  payload: payload,
});

export const setWish = (payload: any) => ({
  type: SET_WISH,
  payload: payload,
});

export const set = (payload: any) => ({
  type: SET,
  payload: payload,
});

export const set_search = (payload: any) => ({
  type: SET_SEARCH,
  payload: payload,
});
