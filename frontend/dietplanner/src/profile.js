import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const [userName, setuserName] = useState("No data yet");
    const [email, setEmail] = useState("No data yet");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("No data yet");
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
                updateValue(res);
                console.log('username(state)'+userName);
                
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }
    const updateValue = (res) =>{
        setuserName(res.data.username);
        setEmail(res.data.email);
        setAge(res.data.age);
        setGender(res.data.gender);
        setCalorieRecommand(res.data.recommend_cal);
    }
    
    return ( 
        <div>
            <h2>userName:</h2>
            <p>{userName}</p>
            <h2>email:</h2>
            <p>{email}</p>
            <h2>age:</h2>
            <p>{age}</p>
            <h2>gender:</h2>
            <p>{gender}</p>
            <h2>calorieRecommand,if saw -1, then get data failed:</h2>
            <p>{calorieRecommand}</p>
            <button onClick={getProfile}>Get Profile Data</button>
            <button onClick={returnHome}>Back to Home</button>
        </div>
     );
}
 
export default Profile;