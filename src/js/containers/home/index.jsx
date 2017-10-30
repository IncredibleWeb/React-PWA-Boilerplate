import React from "react";
import { connect } from "react-redux";

import Card from "../../components/card/card";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchHome } from "./actions";
import { homeReducer, getHomeState } from "./reducer";
import { getAppState } from "../app/reducer";

class Home extends React.PureComponent {
  componentDidMount() {
    const { onLoadHome, match, app } = this.props;

    if (app.url !== match.url) {
      onLoadHome(match.path);
    }
  }

  // returns the JSX that will be rendered for this component
  render() {
    const { title, html, buttons } = this.props.home;
    return (
      <section className="home content">
        <Card title={title} html={html} buttons={buttons} />
      </section>
    );
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchHome(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: homeReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return {
    home: getHomeState(state).toJS(),
    app: getAppState(state).toJS()
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadHome: data => dispatch(fetchHome(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, homeReducer)(Home);
export default connect(mapStateToProps, mapDispatchToProps)(withReducer);
