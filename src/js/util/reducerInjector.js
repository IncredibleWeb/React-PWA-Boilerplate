import React from "react";
import PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";

import { injectReducer } from "./store";

export default (key, reducer) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    componentWillMount() {
      injectReducer(this.context.store, key, reducer);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  ReducerInjector.contextTypes = {
    store: PropTypes.object.isRequired
  };

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
