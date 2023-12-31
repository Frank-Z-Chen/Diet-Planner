import axios from "axios";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import '../style/FoodForm.css';

const FoodFormUpdate = props => {
 const {register, handleSubmit } = useForm();
 const [food_id, setFoodid] = useState(null);
 const [_name, setName] = useState(null);
 const [_carb, setCarb] = useState(null);
 const [_fat, setFat] = useState(null);
 const [_protein, setProtein] = useState(null);
  const onFormSubmit = async (e) =>{
    e.preventDefault();
    const data = {
      foodid: parseInt(food_id),
      foodname: _name,
      fat: parseFloat(_fat),
      protein: parseFloat(_protein),
      carb: parseFloat(_carb)
    };
    console.log(data)

    await axios.patch('http://localhost:8000/planner/foods/'+food_id+"/", 
      data,
      {headers:{"Content-Type" : "application/json"}}
    )

    .then(res =>{
      console.log(res);
    })
    .catch(err =>{
      console.log(err)
    });

  };

 return (
    <form onSubmit = {onFormSubmit}>

     <h1>Update Food</h1>

     <label>ID</label>
     <input type='number' name="foodid" {...register("foodid", {required: "Required",})} onChange={(e) => setFoodid(e.target.value) } />

     <label>Name</label>
     <input name="name" {...register("name", {required: "Required",})} onChange={(e) => setName(e.target.value) } />
     
     <label>Carb</label>
     <input type='number' name="carb" {...register("carb", {required: "Required",})} onChange={(e) => setCarb(e.target.value) } />

     <label>Fat</label>
     <input type='number' name="fat" {...register("fat", {required: "Required",})} onChange={(e) => setFat(e.target.value) }/>
    
     <label>Protein</label>
     <input type='number' name="protein" {...register("protein", {required: "Required",})} onChange={(e) => setProtein(e.target.value) }/>
     
     <input type="submit" />

     {/*
     <label>Total Weight</label>
     <input name="weight" {...register("weight", {required: "Required",})}/>
     */}
   </form>
 );
}

export default FoodFormUpdate;