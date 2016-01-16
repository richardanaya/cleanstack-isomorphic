import React from "react";
import ReactDOM from "react-dom";
import * as ReactRouter from "react-router";
import * as history from "history";
import sessionState from "core/sessionState"
import routesContainer from "routes";
import Immutable from "immutable"
require("../static/lib/react-mdl/material.js")
import {publish} from "core/utils"
var immstruct = require('immstruct');

//Deydrate state from json
sessionState.set(immstruct(window.__SESSION_STATE__));

/**
 * Fire-up React Router.
 */
const reactRoot = window.document.getElementById("react-root");
ReactDOM.render(React.createElement(ReactRouter.Router, {routes: routesContainer, history: history.createHistory()}), reactRoot);

document.addEventListener("DOMContentLoaded", function(event) {
	sessionState.get().cursor().set("pageLoaded",true)
})


/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (process.env.NODE_ENV !== "production") {
	if (!reactRoot.firstChild || !reactRoot.firstChild.attributes ||
	    !reactRoot.firstChild.attributes["data-react-checksum"]) {
		console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
	}
}
