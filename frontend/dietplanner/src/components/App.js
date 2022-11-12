import React from "react";
import AdvQuery from "./AdvQuery";
import FoodForm from "./FoodForm";
import FoodFormUpdate from "./FoodFormUpdate";
import Home from "./Home";

class App extends React.Component {

  render(){
    return (
      <div>
        <Home />
        {/*
        <FoodForm />
         <FoodFormUpdate />
        */}
        <AdvQuery />
        
      </div>
    );
  }

}
  
export default App;
