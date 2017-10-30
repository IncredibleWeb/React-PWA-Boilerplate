import React from "react";
import { connect } from "react-redux";

import { setDeferredPrompt } from "../app/actions";
import { getAppState } from "../app/reducer";

class AddToHomeScreen extends React.PureComponent {
  render() {
    const {
      children,
      deferredPrompt,
      onSetDeferredPrompt,
      className,
      ...props
    } = this.props;

    return (
      <a
        {...props}
        className={(className || "") + (!deferredPrompt ? " disabled" : "")}
        onClick={e => {
          e.preventDefault();

          // if the prompt has been deferred, we are able to show it
          deferredPrompt.prompt();

          // follow what the user has done with the prompt.
          deferredPrompt.userChoice.then(choiceResult => {
            // dispose the prompt
            onSetDeferredPrompt(null);
          });
        }}
      >
        {children}
      </a>
    );
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return { deferredPrompt: getAppState(state).toJS().deferredPrompt };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {
  return {
    onSetDeferredPrompt: data => dispatch(setDeferredPrompt(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToHomeScreen);
