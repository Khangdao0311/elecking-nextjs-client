import { LOAD, SET_WISH, SET, RE_RENDER, SET_SEARCH,SET_ROUTING } from "./constants";

const initState: any = {
  load: true,
  routing: false,
  re_render: false,
  user: null,
  search: "",
  wish: [],
  cart: [],
  show: {
    login: false,
  },
};

function reduce(state: any, action: any) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        ...action.payload,
      };
    case LOAD:
      return {
        ...state,
        load: false,
      };
    case RE_RENDER:
      return {
        ...state,
        re_render: !state.re_render,
      };
    case SET_ROUTING:
      return {
        ...state,
        routing: action.payload,
      };
    case SET_WISH:
      return {
        ...state,
        wish: action.payload,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}

export { initState };
export default reduce;
