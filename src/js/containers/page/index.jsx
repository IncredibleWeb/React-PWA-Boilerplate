import React from "react";
import { connect } from "react-redux";

import Card from "../../components/card/card";
import reducerInjector from "../../util/reducerInjector";
import { REDUCER_NAME } from "./constants";
import { fetchPage } from "./actions";
import { pageReducer, getPageState } from "./reducer";
import { getAppState } from "../app/reducer";

class Page extends React.PureComponent {
  componentDidMount() {
    const { onLoadPage, match, path, app } = this.props;

    if (app.url !== (path || match.url)) {
      onLoadPage(path || match.path);
    }
  }

  render() {
    const { page } = this.props;

    return (
      <section className="content">
        <Card title={page.title} html={page.html} buttons={page.buttons} />
      </section>
    );
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchPage(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: pageReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return { page: getPageState(state).toJS(), app: getAppState(state).toJS() };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onLoadPage: data => dispatch(fetchPage(data))
  };
};

const withReducer = reducerInjector(REDUCER_NAME, pageReducer)(Page);
export default connect(mapStateToProps, mapDispatchToProps)(withReducer);
