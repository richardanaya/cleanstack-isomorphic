require("babel-polyfill");
import React from "react";
import sessionState from "./sessionState";
import {component} from "./utils"
import AppComponent from "../components/App"

class App extends React.Component {
  constructor(){
    super()
    this.data = sessionState.get();
    this.data.on('swap',this.onNewData.bind(this))
  }

  onNewData(newData) {
    this.forceUpdate();
  }

  render() {
     //clone our elements with cursor as prop
     var rootChildren = React.Children.map(this.props.children, (element)=>{
       return React.cloneElement(element, {sessionState: this.data.cursor()});
     });
     return (
       <AppComponent sessionState={this.data.cursor()}>
         {rootChildren}
       </AppComponent>
     );
  }
}

export default App
