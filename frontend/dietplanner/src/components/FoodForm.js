import axios from "axios";
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import '../style/FoodForm.css';

const FoodForm = props => {
 const {register, handleSubmit } = useForm();
 const [food_id, setFoodid] = useState(null);
 const [_name, setName] = useState(null);
 const [_carb, setCarb] = useState(null);
 const [_fat, setFat] = useState(null);
 const [_protein, setProtein] = useState(null);
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

  const createStudent = e => {
    e.preventDefault();
    //this.props.resetState();
    //this.props.toggle();
    /*axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });*/
    console.log("create request send");
  };

  const editStudent = e => {
    e.preventDefault();
    //this.props.resetState();
    //this.props.toggle();
    /*axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });*/
    console.log("edit request send");
  };

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

    await axios.post('http://localhost:8000/planner/foods/', data)
    .then(res =>{
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    });

  };

 return (
    /*<form onSubmit={this.props.student ? 
      handleSubmit(data => {this.editStudent(data)} )
      :handleSubmit(data => {this.createStudent(data)}) 
    }>*/
    <form onSubmit = {onFormSubmit}>

     <h1>New Food</h1>

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

export default FoodForm;