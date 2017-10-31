import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getRoutesState } from "./reducer";
import { fetchRoutes } from "./actions";
import ScrollToTop from "../../components/routes/scrollToTop";
import Layout from "../layout/index";
import Home from "../home/index";
import Settings from "../settings/index";
import Page from "../page/index";

class Routes extends React.PureComponent {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { routes } = this.props;

    return (
      <Layout>
        <ScrollToTop>
          <Switch>
            {routes.map(route => {
              return (
                <Route
                  key={route.url}
                  exact
                  path={route.url}
                  component={getRouteComponent(route.name).component}
                />
              );
            })}
            <Route
              render={props => <Page {...props} path={"/page-not-found"} />}
            />
            />
          </Switch>
        </ScrollToTop>
      </Layout>
    );
  }

  static fetchData(store) {
    return store.dispatch(fetchRoutes());
  }
}

export const getRouteComponent = name => {
  switch (name) {
    case "Home":
      return {
        component: Home,
        getReducer: Home.getReducer,
        fetchData: Home.fetchData
      };
    case "Settings":
      return {
        component: Settings,
        getReducer: Settings.getReducer,
        fetchData: Settings.fetchData
      };
    case "Page":
      return {
        component: Page,
        getReducer: Page.getReducer,
        fetchData: Page.fetchData
      };
    default:
      return undefined;
  }
};

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return getRoutesState(state).toJS();
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    fetchData: data => dispatch(fetchRoutes(data))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
