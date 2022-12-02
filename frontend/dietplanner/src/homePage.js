import React from "react";
import { useHistory } from "react-router-dom";
const HomePage = () => {
    const history = useHistory();

    const goFood = () =>{
        history.push("/food");
    }
    const goPlan = () =>{
        history.push("/plan");
    }
    const goWeeklyPlan = () =>{
        history.push("/weekly_plan");
    }
    const goRecipe = () =>{
        history.push("/recipe");
    }
    return (
        <div className="HomePage">
            <h2>Manage Food</h2>
            <button onClick={goFood}>Go</button>
            <h2>Manage Plan</h2>
            <button onClick={goPlan}>Go</button>
            <h2>Manage Weekly Plan</h2>
            <button onClick={goWeeklyPlan}>Go</button>
            <h2>Manage Recipe</h2>
            <button onClick={goRecipe}>Go</button>
        </div>
     );
}
 
export default HomePage;