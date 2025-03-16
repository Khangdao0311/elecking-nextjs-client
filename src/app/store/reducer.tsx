import { SET } from "./constants";

const initState: IState = {
  search: "",
};

function reduce(state: IState, action: IAction) {
  switch (action.type) {
    case SET:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export { initState };
export default reduce;
