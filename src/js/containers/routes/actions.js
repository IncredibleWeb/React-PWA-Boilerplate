import { SET_ROUTES } from "./constants";
import { getRouteData } from "../../../../service/service";

const loadRoutes = data => {
  return {
    type: SET_ROUTES,
    data
  };
};

export const fetchRoutes = data => {
  return dispatch => {
    return getRouteData(data)
      .then(response => {
        dispatch(loadRoutes(response));
        return response;
      })
      .catch(() => {
        console.error(error);
        throw error;
      });
  };
};
