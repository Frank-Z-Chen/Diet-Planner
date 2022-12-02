import React from "react";
import FoodHome from "./FoodHome";
import RecipeHome from "./RecipeHome";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from "../signin";
import NewUser from "../createUser";
import HomePage from "../homePage";
import Profile from "../profile";
import NavBarFunc from "../navBar";
import RecipeUpdate from "./RecipeUpdate";

//Global variable to store user info
window.userName = "";
window.token = "";
window.userId = -1;
window.email = "";
window.gender = "";
window.age ="";
window.calorieRecommand = 0;

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
              <NavBarFunc />
              <HomePage />
            </div>
          </Route>
          <Route exact path = '/profile'>
            <div>
              <NavBarFunc />
              <Profile />
            </div>
          </Route>
          <Route exact path = '/food'>
            <div>
              <NavBarFunc />
              <FoodHome />
            </div>
          </Route>
          <Route exact path = '/recipe'>
            <div>
              <NavBarFunc />
              <RecipeHome/>
            </div>
          </Route>
          <Route exact path = '/create_recipe'>
            <div>
              <NavBarFunc />
              <RecipeUpdate />
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }

}
  
export default App;
