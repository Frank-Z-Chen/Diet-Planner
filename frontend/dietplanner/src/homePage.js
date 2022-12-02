import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBarFunc from "./navBar";
import axios from "axios";
const HomePage = () => {
    const history = useHistory();
/*
    useEffect(()=>{
        fetchRecCalorie();
        console.log('Data fetched: '+window.calorieRecommand);
    },[]);
*/
    const goFood = () =>{
        history.push("/food");
    }
    const goWeeklyPlan = () =>{
        history.push("/weeklyPlan");
    }
    const goRecipe = () =>{
        history.push("/recipe");
    }
    return (
        <div className="HomePage">
            <NavBarFunc />
            <h2>Manage Food</h2>
            <button onClick={goFood}>Go</button>
            <h2>Manage Weekly Plan</h2>
            <button onClick={goWeeklyPlan}>Go</button>
            <h2>Manage Recipe</h2>
            <button onClick={goRecipe}>Go</button>
        </div>
     );
}
 
export default HomePage;