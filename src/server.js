import babelPolyfill from "babel-polyfill";
import koa from "koa";
import koaProxy from "koa-proxy";
import koaStatic from "koa-static";
import React from "react";
import ReactDOM from "react-dom/server";
import * as ReactRouter from "react-router";
import * as history from "history";
var router = require('koa-router')();
var Immutable = require('immutable');
import routesContainer from "routes";
import sessionStateContainer from "core/sessionState";
var immstruct = require('immstruct');

try {
	const app      = koa();
	const hostname = process.env.HOSTNAME || "localhost";
	const port     = process.env.PORT || 8000;
	let   routes   = routesContainer;
	let   sessionState   = sessionStateContainer;

	app.use(koaStatic("static", {defer: true}));

	//http handlers for data/server access go here
	router.get('/data', function *(next) {
		this.type = "text/html";
		this.body = "This is a test!"
	});

	//get koa-router routes running
	app
	  .use(router.routes())
	  .use(router.allowedMethods());

	//default web handler
	app.use(function *(next) {
		yield ((callback) => {
			const webserver = __PRODUCTION__ ? "" : `//${this.hostname}:8080`;
			const location  = history.createLocation(this.path);

			ReactRouter.match({routes, location}, (error, redirectLocation, renderProps) => {
				if (redirectLocation) {
					this.redirect(redirectLocation.pathname + redirectLocation.search, "/");
					return;
				}

				if (error || !renderProps) {
					callback(error);
					return;
				}


				//formulate initial session state based on call
				var data = {
					pageLoaded: false,
					message: "Hello World!",
					highfivecount: 0
				}
				sessionState.set(immstruct(data))

				var reactString = ReactDOM.renderToString(React.createElement(ReactRouter.RoutingContext, renderProps));

				this.type = "text/html";
				this.body = (
					`<!doctype html>
					<html lang="en-us">
						<head>
							<meta charset="utf-8">
							<title>Isomorphic React</title>
							<link rel="stylesheet" href="css/app.min.css">
							<link rel="shortcut icon" href="/favicon.ico">
							<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
						</head>
						<body>
							<div id="react-root">${reactString}</div>
						</body>
						<script>
							window.__SESSION_STATE__ = ${sessionState.toString()}
						</script>
						<script src="${webserver}/dist/client.js"></script>
					</html>`
				);

				callback(null);
			});
		});
	});

	app.listen(port, () => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to http://%s:%s", hostname, port);
	});

	if (__DEV__) {
		if (module.hot) {
			console.log("[HMR] Server listening");
			//whenever routes or stores change refresh these modules
			module.hot.accept("./routes", () => {
				routes = require("./routes");
			});

			module.hot.accept("./core/sessionState", () => {
				sessionState = require("./core/sessionState");
			});
		}
	}
}
catch (error) {
	console.error(error.stack || error);
}
