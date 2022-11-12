import React from "react";
import AvgCalories from "./AvgCalories";
import Home from "./Home";

class App extends React.Component {

  render(){
    return (
      <div>
        <Home />
        <AvgCalories
          //resetState = { }
          //toggle= {true}
          //foods = {[]}
        />
      </div>
    );
  }

}
  
export default App;
