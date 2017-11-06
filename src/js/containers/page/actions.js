import { SET_PAGE } from "./constants";
import { isLoading, setMeta, setTitle, setUrl } from "../app/actions";
import { getPageData } from "../../../../service/service";

const loadPage = data => {
  return {
    type: SET_PAGE,
    data
  };
};

export const fetchPage = data => {
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
        dispatch(loadPage(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
