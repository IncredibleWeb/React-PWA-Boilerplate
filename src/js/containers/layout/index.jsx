import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "../header/index";
import Footer from "../footer/index";
import Meta from "../../components/meta/meta";
import FadeTransition from "../../components/transitions/fade";
import { getAppState } from "../app/reducer";

class Layout extends React.PureComponent {
  // returns the JSX that will be rendered for this component
  render() {
    const { children, app } = this.props;
    return (
      <div className={(app.isLoading ? "is-loading" : "") + " layout"}>
        <Meta meta={app.meta} url={app.url} />
        <Header />
        <FadeTransition in={!app.isLoading}>
          <main id="main" className="main">
            {children}
          </main>
        </FadeTransition>
        <Footer />
      </div>
    );
  }
}

// maps the redux store state to the props related to the data from the store
const mapStateToProps = state => {
  return { app: getAppState(state).toJS() };
};

export default withRouter(connect(mapStateToProps, null)(Layout));
