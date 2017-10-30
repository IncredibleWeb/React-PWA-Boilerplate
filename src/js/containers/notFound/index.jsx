import React from "react";
import { connect } from "react-redux";

import Meta from "../../components/meta/meta";

class NotFound extends React.PureComponent {
  // returns the JSX that will be rendered for this component
  render() {
    const { page } = this.props;
    return (
      <section className="main content">
        <section className="richtext card">
          <div className="card-title">
            <h1>Page not Found</h1>
          </div>
          <div className="card-content">
            The page you were looking for could not be found. Please contact an
            administrator.
          </div>
          <div className="card-buttons">
            <a href="/settings" className="button" title="settings">
              Settings
            </a>
          </div>
        </section>
      </section>
    );
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return {
    page: {}
  };
};

// specifies the behaviour, which callback prop dispatches which action
const mapDispatchToProps = dispatch => {};

export default connect(null, null)(NotFound);
