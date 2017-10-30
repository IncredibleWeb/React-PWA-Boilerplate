import { SET_ROUTES, ROUTES_LOADING, ROUTES_ERROR } from "./constants";
import { getRoutes } from "../../routes";

const isLoading = data => {
  return {
    type: ROUTES_LOADING,
    data
  };
};

const isError = data => {
  return {
    type: ROUTES_ERROR
  };
};

const loadRoutes = data => {
  return {
    type: SET_ROUTES,
    data
  };
};

export const fetchRoutes = data => {
  return dispatch => {
    dispatch(isLoading(true));

    return getRoutes(data)
      .then(response => {
        dispatch(isLoading(false));
        return response;
      })
      .then(response => {
        dispatch(loadRoutes(response));
        return response;
      })
      .catch(() => dispatch(isError()));
  };
};
