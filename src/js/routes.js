import Home from "./containers/home/index";
import Settings from "./containers/settings/index";

export const routes = [
  {
    path: "/",
    component: "Home",
    exact: true,
    getReducer: Home.getReducer,
    fetchData: Home.fetchData
  },
  {
    path: "/settings",
    component: "Settings",
    exact: true,
    getReducer: Settings.getReducer,
    fetchData: Settings.fetchData
  }
];

export const getRoutes = () => {
  return Promise.resolve(routes);
};
