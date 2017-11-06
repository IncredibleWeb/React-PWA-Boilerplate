import { SET_HOME } from "./constants";
import { isLoading, setMeta, setTitle, setUrl } from "../app/actions";
import { getPageData } from "../../../../service/service";

const loadHome = data => {
  return {
    type: SET_HOME,
    data
  };
};

export const fetchHome = data => {
  return dispatch => {
    dispatch(isLoading(true));

    return getPageData(data)
      .then(response => {
        dispatch(setMeta(response.meta));
        dispatch(setUrl(response.url));
        dispatch(setTitle(response.title));
        return response;
      })
      .then(response => {
        dispatch(isLoading(false));
        dispatch(loadHome(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
