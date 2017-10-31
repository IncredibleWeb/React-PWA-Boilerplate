import { fromJS } from "immutable";

import { SET_ROUTES, REDUCER_NAME } from "./constants";

const initialState = fromJS({
  routes: [],
  isLoading: false,
  isError: false
});

export const routesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROUTES:
      return state.set("routes", action.data);
    default:
      return state;
  }
};

export const getRoutesState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
