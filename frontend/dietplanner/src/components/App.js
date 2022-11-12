import React from "react";
import AdvQuery from "./AdvQuery";
import AdvQuery2 from "./AdvQuery2";
import FoodForm from "./FoodForm";
import FoodFormUpdate from "./FoodFormUpdate";
import Home from "./Home";

class App extends React.Component {

  render(){
    return (
      <div>
        <Home />
        <FoodForm />
        <FoodFormUpdate />
        <AdvQuery />
        <AdvQuery2 />
      </div>
    );
  }

}
  
export default App;
