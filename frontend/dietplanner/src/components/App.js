import React from "react";
import AdvQuery from "./AdvQuery";
import AdvQuery2 from "./AdvQuery2";
import FoodForm from "./FoodForm";
import FoodFormUpdate from "./FoodFormUpdate";
import Home from "./Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from "../signin";
import NewUser from "../createUser";
import HomePage from "../homePage";
import Profile from "../profile";

window.userName = "";

class App extends React.Component {

  render(){
    return (
      <Router>
        <Switch>
          <Route exact path = '/'>
            <div>
              <SignIn />
            </div>
          </Route>
          <Route exact path = '/createUser'>
            <div>
              <NewUser />
            </div>
          </Route>
          <Route exact path = '/home'>
            <div>
              <HomePage />
            </div>
          </Route>
          <Route exact path = '/profile'>
            <div>
              <Profile />
            </div>
          </Route>
          <Route exact path = '/food'>
            <div>
              <Home />
              <FoodForm />
              <FoodFormUpdate />
              <AdvQuery />
              <AdvQuery2 />
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }

}
  
export default App;
