/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from "redux-immutable";

// global reducers
import { routesReducer } from "../containers/routes/reducer";
import { appReducer } from "../containers/app/reducer";
import { headerReducer } from "../containers/header/reducer";
import { homeReducer } from "../containers/home/reducer";
import { pageReducer } from "../containers/page/reducer";
import { settingsReducer } from "../containers/settings/reducer";

export default function createReducer(injectedReducers) {
  return combineReducers({
    routes: routesReducer,
    app: appReducer,
    page: pageReducer,
    home: homeReducer,
    settings: settingsReducer,
    header: headerReducer,
    ...injectedReducers
  });
}
