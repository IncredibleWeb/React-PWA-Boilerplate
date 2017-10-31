import { SET_NAV_ITEM_ACTIVE, SET_HEADER } from "./constants";
import { getHeaderData } from "../../../../service/service";

export const setNavItemActive = data => {
  return {
    type: SET_NAV_ITEM_ACTIVE,
    data
  };
};

const loadHeader = data => {
  return {
    type: SET_HEADER,
    data
  };
};

export const fetchHeader = data => {
  return dispatch => {
    return getHeaderData(data)
      .then(response => {
        dispatch(loadHeader(response));
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  };
};
