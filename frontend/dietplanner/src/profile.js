import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const [userName, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [calorieRecommand, setCalorieRecommand] = useState(0);
    const history = useHistory();

    const returnHome = (e) =>{
        e.preventDefault();
        history.push("/home");
    }
    //we will fetch data from DB for the first time render this page
    const getProfile = async () => {
        console.log("Profile GET INIT");
        await axios.get('http://localhost:8000/planner/users/'+ window.userId +'/', {
            headers:{
                'Authorization': window.token
            }
        })
        .then(res=>{
            console.log(res);
            if(res.status === 403){
                //error happens back to home page
                console.log(res.status);
                setCalorieRecommand(-1);
            }
            else{
                //set the local value
                console.log("Profile GET DONE");
                console.log('username(state)'+userName);
                
                setuserName(res.data.username);
                setEmail(res.data.email);
                setAge(res.data.age);
                setGender(res.data.gender);
                setCalorieRecommand(res.data.recommend_cal);
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }
    
    return ( 
        <div>
            <form onSubmit={getProfile}>
            <label>userName: </label>
                <input 
                type='text' 
                name="userName" 
                required
                value = {userName}
                onChange={(e) => setuserName(e.target.value) } 
                />
                <label>Email</label>
                <input 
                type='text' 
                name="email" 
                required
                value = {email}
                onChange={(e) => setEmail(e.target.value) } 
                />
                <label>Age</label>
                <input 
                type='number' 
                name="age" 
                required
                value = {age}
                onChange={(e) => setAge(e.target.value) } 
                />
                <label>Gender</label>
                <input 
                type='text' 
                name="gender" 
                required
                value = {gender}
                onChange={(e) => setGender(e.target.value) } 
                />
                <label>calorieRecommand(-1 means fetching failed)</label>
                <input 
                type='number' 
                name="calorieRecommand" 
                required
                value = {calorieRecommand}
                onChange={(e) => setCalorieRecommand(e.target.value) } 
                />
                <button>Get Profile Data</button>
            </form>
            <button onClick={returnHome}>Back to Home</button>
        </div>
     );
}
 
export default Profile;