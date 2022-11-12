import React from "react";
import FoodForm from "./FoodForm";
import FoodFormUpdate from "./FoodFormUpdate";
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
        <FoodFormUpdate
        />
      </div>
    );
  }

}
  
export default App;
