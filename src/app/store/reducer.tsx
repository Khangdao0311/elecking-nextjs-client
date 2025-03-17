import { LOAD, SET_WISH } from "./constants";

const initState: any = {
  load: true,
  wish: [],
};

function reduce(state: any, action: any) {
  switch (action.type) {
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
