import React from "react";
import FoodForm from "./FoodForm";
import Home from "./Home";

class App extends React.Component {

  render(){
    return (
      <div>
        <Home />
        <FoodForm
          //resetState = { }
          //toggle= {true}
          //foods = {[]}
        />
      </div>
    );
  }

}
  
export default App;
