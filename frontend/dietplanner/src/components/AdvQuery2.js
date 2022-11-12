import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import '../style/FoodForm.css';

const AdvQuery2 = () => {
    const {register, handleSubmit } = useForm();
    const [_recipename, setRecipename] = useState("");
    const [_result, setResult] = useState([]);

    const listItems = _result.map( (item) => (
        <li> ReName: {item.Recipe_Name} TotalKcal: {item.Total_Calories}</li>
    ));
    
    const onFormSubmit = async(e) =>{
        e.preventDefault();
        const data = {
            recipename: _recipename,
        };
        console.log(data);

        const response = await axios.patch('http://localhost:8000/planner/totalcal/',data);
        console.log(response.data);
        setResult(response.data);
    };

    return(
        <div>
            <form onSubmit={onFormSubmit}>
                <h1>Total Calorie for Recipe</h1>

                <label>Recipe Name</label>
                <input name="recipename" {...register("recipename", {required: "Required",})} onChange={(e) => setRecipename(e.target.value) } />

                <input type="submit" />

                {listItems}
            </form>
        </div>    
    );
};

export default AdvQuery2;