/*
 * Root component on the server-side
 */
import React from "react";
import { StaticRouter, matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";

import { injectReducer } from "../src/js/util/store";
import Routes, { getRouteComponent } from "../src/js/containers/routes/index";
import { configureStore } from "../src/js/util/store";
import { defaultPathConfig } from "./helpers/pathConfig";
import Header from "../src/js/containers/header/index";
import Page from "../src/js/containers/page/index";

export function handleRender(req, res) {
  // Create a new Redux store instance
  const store = configureStore();
  const { params, path, url, query } = req;

  Routes.fetchData(store)
    .then(routes => {
      // retrieve data for all components on the current route
      const promises = [];

      const match = routes.some(route => {
        if (
          matchPath(req.path, {
            path: route.url,
            exact: true
          })
        ) {
          // GET routes
          const component = getRouteComponent(route.name);
          // inject the reducer for the route
          const { key, reducer } = component.getReducer();
          injectReducer(store, key, reducer);
          // add the promise to fetch the route data
          promises.push(
            component.fetchData(store, { params, path, url, query })
          );
          return true;
        }
      });

      // handle 404
      if (!match) {
        const { key, reducer } = Page.getReducer();
        injectReducer(store, key, reducer);
        promises.push(Page.fetchData(store, { path: "/page-not-found" }));
        req.show404 = true;
      }

      if (Header) {
        const { key, reducer } = Header.getReducer();
        injectReducer(store, key, reducer);
        promises.push(Header.fetchData(store, { path }));
      }

      Promise.all(promises)
        .then(response => {
          const staticContext = {};

          // render the component to a string
          const html = renderToString(
            <Provider store={store}>
              <div id="app">
                <StaticRouter context={staticContext} location={req.url}>
                  <Routes routes={routes} />
                </StaticRouter>
              </div>
            </Provider>
          );

          // Grab the initial state from our Redux store
          const preloadedState = store.getState();

          const data = Object.assign(defaultPathConfig, {
            html: html,
            preloadedState: JSON.stringify(preloadedState.toJS()).replace(
              /</g,
              "\\u003c"
            )
          });

          // Send the rendered page back to the client using the server's view engine
          if (req.show500) {
            res.status(500);
            res.render("500", { layout: false });
          } else {
            if (req.show404) {
              res.status(404);
            }
            res.render("index", { data });
          }
        })
        .catch(error => {
          console.error(error);
          throw error;
        });
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}
