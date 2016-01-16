import React from "react";
import {listen,publish,component} from "../core/utils"
import {Button} from "react-mdl";
import fetch from "isomorphic-fetch"

listen("highFiveIncrement",function *(sessionState){
  sessionState.update("highfivecount",c=>c+1);
  var result = yield fetch('/data')
  var text = yield result.text();
  console.log(text);
});

export default component((props) => {
  return <div>
      {props.sessionState.get("message")} <Button raised colored onClick={()=>publish("highFiveIncrement",props.sessionState)}>High Five {props.sessionState.get("highfivecount")}</Button>
    </div>;
});
