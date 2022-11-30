import axios from "axios";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import '../style/FoodForm.css';

const AvgCalories = props => {
  const {register, handleSubmit } = useForm();
 const [_ageUB, setAgeUB] = useState(null);
 const [_ageLB, setAgeLB] = useState(null);
 const [_gender, setGender] = useState(null);
 
 /* 
 useEffect(() => {
    if (this.props.food) {
      const { name, carb, fat, protein } = this.props.food;
      setName(name);
      setCarb(carb);
      setFat(fat);
      setProtein(protein);
  };
  */



  const getAvgCalories = async(e) => {
    e.preventDefault();
    const data = {
      gender: _gender,
      
      ageUB: parseInt(_ageUB),
      ageLB: parseInt(_ageLB),
      
    };
    console.log(data)
    await axios.get('http://localhost:8000/planner/caloriecal/', 
      data
    )
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    });

    
  }
  

 return (
    /*<form onSubmit={this.props.student ? 
      handleSubmit(data => {this.editStudent(data)} )
      :handleSubmit(data => {this.createStudent(data)}) 
    }>*/
    <form onSubmit = {getAvgCalories}>

     <h1>AvgCalories</h1>

     <label>Gender</label>
     <input gender="gender" {...register("gender", {required: "Required",})} onChange={(e) => setGender(e.target.value) } />

     <label>AgeUpperBound</label>
     <input type="number" name = "ageUB" {...register("ageUB", {required: "Required",})} onChange={(e) => setAgeUB(e.target.value) } />
     
     <label>AgeLowerBound</label>
     <input type='number' name="ageLB" {...register("ageLB", {required: "Required",})} onChange={(e) => setAgeLB(e.target.value) } />

     
     
     <input type="submit" />

     {/*
     <label>Total Weight</label>
     <input name="weight" {...register("weight", {required: "Required",})}/>
     */}
   </form>
 );
}

export default AvgCalories;