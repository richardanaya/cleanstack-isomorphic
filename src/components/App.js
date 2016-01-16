require("babel-polyfill");
import React from "react";
import {listen,publish,component} from "../core/utils"

export default component((props) => {
  return <div>
      <h1>App</h1>{props.sessionState.get("pageLoaded")?"true":"false"}
      {props.children}
    </div>;
});
