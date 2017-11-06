import { SET_PUSH_ENABLED } from "./constants";
import { isLoading, setMeta, setTitle, setUrl } from "../app/actions";
import { getPageData } from "../../../../service/service";

export const setPushEnabled = data => {
  return {
    type: SET_PUSH_ENABLED,
    data
  };
};

export const fetchSettings = data => {
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
        dispatch(setPushEnabled(false));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
