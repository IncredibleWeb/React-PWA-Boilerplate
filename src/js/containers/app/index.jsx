/*
 * Root component
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import OfflineManager from "../../util/offlineManager";
import { configureStore } from "../../util/store";
import { getRoutesState } from "../routes/reducer";
import { setDeferredPrompt } from "./actions";
import Routes from "../routes/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // grab the state from a global variable injected into the server-generated HTML
    const preloadedState = window.__PRELOADED_STATE__;

    // allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__;

    this.store = configureStore(preloadedState);
  }

  componentDidMount() {
    // install service worker
    initServiceWorker();
    initOffline();

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      // store the event so it can be triggered later.
      this.store.dispatch(setDeferredPrompt(e));

      return false;
    });
  }

  render() {
    const { routes } = getRoutesState(this.store.getState()).toJS();
    return (
      <Provider store={this.store}>
        <div id="app">
          <BrowserRouter>
            <Routes routes={routes} />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

const initServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => {
        console.log("Successfully registered service worker", reg);
      })
      .catch(err => {
        console.warn("Error whilst registering service worker", err);
      });
  }
};

const initOffline = () => {
  window.addEventListener(
    "online",
    e => {
      OfflineManager.setOffline(false);
    },
    false
  );

  window.addEventListener(
    "offline",
    e => {
      OfflineManager.setOffline(true);
    },
    false
  );

  if (!navigator.onLine) {
    OfflineManager.setOffline(true);
  }
};
