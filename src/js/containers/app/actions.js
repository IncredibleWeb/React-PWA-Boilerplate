import {
  APP_LOADING,
  APP_ERROR,
  SET_DEFERRED_PROMPT,
  SET_META,
  SET_TITLE,
  SET_URL
} from "./constants";

export const isLoading = data => {
  return {
    type: APP_LOADING,
    data
  };
};

export const isError = data => {
  return {
    type: APP_ERROR
  };
};

export const setDeferredPrompt = data => {
  return {
    type: SET_DEFERRED_PROMPT,
    data
  };
};

export const setTitle = data => {
  return {
    type: SET_TITLE,
    data
  };
};

export const setUrl = data => {
  return {
    type: SET_URL,
    data
  };
};

export const setMeta = data => {
  return {
    type: SET_META,
    data
  };
};
