import { CHANGE_FILTER } from "../actions/filter";

export const initialState = {
  filter: "all",
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};
