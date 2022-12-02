import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBarFunc from "./navBar";
import axios from "axios";
const HomePage = () => {
    const history = useHistory();

    useEffect(()=>{
        fetchRecCalorie();
        console.log('Data fetched: '+window.calorieRecommand);
    },[]);

    const fetchRecCalorie = async () => {
        console.log("Calorie GET INIT");
        await axios.get('http://localhost:8000/planner/users/'+ window.userId +'/', {
            headers:{
                'Authorization': window.token
            }
        })
        .then(res=>{
            if(res.status === 403){
                //error happens back to home page
                console.log(res.status);
            }
            else{
                //set the local value
                console.log("Calorie GET DONE");
                window.calorieRecommand = res.data.recommend_cal;
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }
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