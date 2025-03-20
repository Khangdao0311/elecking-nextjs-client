import { LOAD, SET_WISH, SET, RE_RENDER } from "./constants";

const initState: any = {
  load: true,
  re_render: false,
  user: null,
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
    case SET_WISH:
      return {
        ...state,
        wish: action.payload,
      };
    default:
      return state;
  }
}

export { initState };
export default reduce;
