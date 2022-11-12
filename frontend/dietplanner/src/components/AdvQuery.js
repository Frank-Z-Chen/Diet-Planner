import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import '../style/FoodForm.css';
import { Label } from "reactstrap";

const AdvQuery = e => {
    const {register, handleSubmit } = useForm();
    const [_gender, setGender] = useState("M");
    const [_maxage, setMaxage] = useState(0);
    const [_minage, setMinage] = useState(0);
    const [_result, setResult] = useState([]);
    
    useEffect(() => {
        _result
    });

    const onFormSubmit = async(e) =>{
        e.preventDefault();
        const data = {
            gender: _gender,
            age_upperbound: parseInt(_maxage),
            age_lowerbound: parseInt(_minage)
        };
        console.log(data);

        const response = await axios.patch('http://localhost:8000/planner/caloriecal/',data);
        //console.log(response.data);
        setResult(response.data);
        console.log(_result+"asd")
        {/*const result_data = response.data.map(apiData => ({
            age: apiData.age,
            avg: apiData.Average_Kal,
          }));
        */}

        //setResult(result_data);
        //console.log(_result);
    };

    return(
        <form onSubmit={onFormSubmit}>
            <h1>caloriecal</h1>

            <label>Gender</label>
            <input name="gender" {...register("gender", {required: "Required",})} onChange={(e) => setGender(e.target.value) } />

            <label>Max Age</label>
            <input type='number' name="maxage" {...register("maxage", {required: "Required",})} onChange={(e) => setMaxage(e.target.value) } />

            <label>Min. Age</label>
            <input type='number' name="minage" {...register("minage", {required: "Required",})} onChange={(e) => setMinage(e.target.value) } />

            <input type="submit" />
            <ul>
                {
                    _result.
                }
            </ul>
        </form>

    );
};

export default AdvQuery;