/* global  __dirname */
/* global  process */

"use strict";

import fs from "fs";
import https from "https";
import path from "path";
import express from "express";
import exphbs from "express-handlebars";
import handlebars from "handlebars";
import bodyParser from "body-parser";
import compression from "compression";
import session from "express-session";

// custom helpers
import { handleRender } from "./server/server";
import { requireHttps, requireWww } from "./server/helpers/routing.js";

// configuration
const config = {
  environment: process.env.NODE_ENV || "development",
  isHttps: process.env.isHttps === "true" || false
};

const app = express();
app.use(compression());

const viewsDir = "./templates";

// setup express to use handlebars as the templating engine
const hbs = exphbs.create({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, `${viewsDir}/layouts`),
  partialsDir: path.join(__dirname, `${viewsDir}/partials`),
  extname: ".hbs"
});

// allows partials to be organised in subfolders
hbs
  .getTemplates(path.join(__dirname, `${viewsDir}/partials`))
  .then(function(partials) {
    for (let partial in partials) {
      handlebars.registerPartial(partial, "{{" + partial + "}}");
    }
  })
  .catch(error => {
    console.log(`Unable to retrieve templates. Error: ${error}`);
  });

app.set("views", path.join(__dirname, `${viewsDir}`));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// setup server for static assets
app.use(
  "/",
  express.static(path.join(__dirname, "dist"), { maxAge: 604800000 })
);

// https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));

// require HTTPS
app.use(requireHttps);

// redirect to include www
app.use(requireWww);

// Setup body parser for parsing POST request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionExpiration = 20 * 60 * 1000; // 20 minutes

// Setup session middleware
app.use(
  session({
    secret: "test",
    cookie: { maxAge: sessionExpiration },
    unset: "destroy",
    resave: true,
    saveUninitialized: false,
    sameSite: true
  })
);

// React-Redux middleware
app.use(handleRender);

// use the environment's port or a random port
const port =
  process.env.port ||
  (process.env.isDev ? 3000 : Math.floor(Math.random() * 65535) + 1024);
app.listen(port, () => {
  console.log(`Running ${config.environment} on localhost:${port}`);
});

if (config.isHttps) {
  const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
    requestCert: false,
    rejectUnauthorized: false
  };

  // create a different random port for HTTPS
  let httpsPort = Math.floor(Math.random() * 65535) + 1024;
  while (httpsPort === port) {
    httpsPort = Math.floor(Math.random() * 65535) + 1024;
  }

  const server = https.createServer(options, app).listen(httpsPort, () => {
    console.log(`HTTPS server started at port ${httpsPort}`);
  });
}

module.exports = app;
