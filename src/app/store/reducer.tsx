import { LOAD, SET_WISH, SET } from "./constants";

const initState: any = {
  load: true,
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
        load: !state.load,
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
