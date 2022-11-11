import React, {useState } from "react";
import { useForm } from "react-hook-form";
import '../style/FoodForm.css';

const FoodForm = props => {
 const {register, handleSubmit } = useForm();
 const [name, setName] = useState(null);
 const [carb, setCarb] = useState(null);
 const [fat, setFat] = useState(null);
 const [protein, setProtein] = useState(null);
 
  useEffect(() => {
    if (this.props.food) {
      const { name, carb, fat, protein } = this.props.food;
      setName(name);
      setCarb(carb);
      setFat(fat);
      setProtein(protein);
  };


  createStudent = e => {
    e.preventDefault();
    this.props.resetState();
    this.props.toggle();
    /*axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });*/
    console.log("create request send");
  };

  editStudent = e => {
    e.preventDefault();
    this.props.resetState();
    this.props.toggle();
    /*axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });*/
    console.log("edit request send");
  };


});

 return (
    <form onSubmit={this.props.student ? 
      handleSubmit(data => editStudent(data))
      :handleSubmit(data => createStudent(data)) 
    }>

     <h1>New Food</h1>
     <label>Name</label>
     <input name="name" {...register("name", {required: "Required",})}/>
     
     <label>Carb</label>
     <input name="carb" {...register("carb", {required: "Required",})}/>

     <label>Fat</label>
     <input name="fat" {...register("carb", {required: "Required",})}/>
    
     <label>Protein</label>
     <input name="protein" {...register("protein", {required: "Required",})}/>

     {/*
     <label>Total Weight</label>
     <input name="weight" {...register("weight", {required: "Required",})}/>
     */}

     <input type="submit" />
   </form>
 );
}