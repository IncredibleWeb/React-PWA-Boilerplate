/**
 * Create the store with dynamic reducers
 * Based on: https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application
 */

import { createStore, applyMiddleware } from "redux";
import { fromJS } from "immutable";
import thunk from "redux-thunk";

import createReducer from "./reducers";

export function configureStore(initialState = {}) {
  let store = createStore(
    createReducer(),
    fromJS(initialState),
    applyMiddleware(thunk)
  );

  store.injectedReducers = {}; // Reducer registry

  return store;
}

export function injectReducer(store, name, asyncReducer) {
  store.injectedReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.injectedReducers));
}
