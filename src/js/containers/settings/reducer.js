import { fromJS } from "immutable";

import { SET_PUSH_ENABLED, REDUCER_NAME } from "./constants";

const initialState = fromJS({
  isPushEnabled: false
});

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PUSH_ENABLED:
      return state.set("isPushEnabled", action.data);
    default:
      return state;
  }
};

export const getSettingsState = state => {
  if (state.get(REDUCER_NAME)) {
    return state.get(REDUCER_NAME);
  } else {
    return initialState;
  }
};
