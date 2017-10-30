import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fromJS } from "immutable";

import reducerInjector from "../../util/reducerInjector";
import Nav from "../../components/nav/nav";
import { fetchHeader, setNavItemActive } from "./actions";
import { REDUCER_NAME } from "./constants";
import { getAppState } from "../app/reducer";
import { headerReducer, getHeaderState } from "./reducer";

class Header extends React.PureComponent {
  componentDidMount() {
    const { onLoadHeader, onSetNavItemActive } = this.props;

    // set initial navigation item
    onSetNavItemActive({
      href: location.pathname
    });
  }

  render() {
    const { header, title, onSetNavItemActive } = this.props;
    return (
      <div>
        <header>
          <div className="header-wrapper">{title}</div>
        </header>
        <Nav nav={header.nav} onSetNavItemActive={onSetNavItemActive} />
      </div>
    );
  }

  static fetchData(store, { path }) {
    return store.dispatch(fetchHeader(path));
  }

  static getReducer() {
    return { key: REDUCER_NAME, reducer: headerReducer };
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  const header = getHeaderState(state).toJS();
  const { title } = getAppState(state).toJS();
  return {
    header,
    title
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onSetNavItemActive: data => dispatch(setNavItemActive(data))
  };
};

// inject a new reducer for this component
let withReducer = reducerInjector(REDUCER_NAME, headerReducer)(Header);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withReducer)
);
