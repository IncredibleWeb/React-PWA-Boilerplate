import { fromJS } from "immutable";

import { SET_HOME, REDUCER_NAME } from "./constants";

const initialState = fromJS({
  title: "",
  html: "",
  buttons: []
});

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME:
      return state
        .set("title", action.data.title)
        .set("html", action.data.html)
        .set("buttons", action.data.buttons);
    default:
      return state;
  }
};

export const getHomeState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
