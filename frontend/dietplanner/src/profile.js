import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const [userName, setuserName] = useState(window.userName);
    const [pwd, setPwd] = useState("");
    //const [email, setEmail] = useState(window.email);
    const [age, setAge] = useState(window.age);
    const [gender, setGender] = useState(window.gender);
    const [calorieRecommand, setCalorieRecommand] = useState(window.calorieRecommand);
    //const [userId, setUserId] = useState(window.userId);
    const [processing, setProcessing] = useState(false);
    const history = useHistory();

    const returnHome = (e) =>{
        e.preventDefault();
        history.push("/home");
    }
    const onFormSubmit = async (e)=>{
        e.preventDefault();
        setProcessing(true);
        const data = {
            userName:userName, 
            password:pwd, 
            age:age,
            gender:gender};
        console.log(data);

        //vlidate user update
        await axios.patch('http://localhost:8000/planner/users/'+ window.userId +'/', data,{
            headers:{
                'Authorization': window.token
            }
        })
        .then(res=>{
            console.log(res);
            console.log("Update finished");
            //history.push("/profile");
            getProfile();
            //console.log("recCal calculate finished");
            setProcessing(false);
        })
        .catch(err =>{
            console.log(err);
            setProcessing(false);
        });
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
                setCalorieRecommand(res.data[0].recommend_cal);
                window.calorieRecommand = res.data[0].recommend_cal;
                window.userName = res.data[0].userName;
                window.email = res.data[0].email;
                window.gender = res.data[0].gender;
                window.age =res.data[0].age;
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }

    useEffect(()=>{
        getProfile();
    },[])
    
    return ( 
        <div>
            {processing && <h2>Processing data, please wait</h2>}
            <form onSubmit={onFormSubmit}>
                <label>userName</label>
                <input 
                type='text' 
                name="userName" 
                required
                value = {userName}
                onChange={(e) => setuserName(e.target.value) } 
                />
                <label>password</label>
                <input 
                type='text' 
                name="password" 
                required
                value = {pwd}
                onChange={(e) => setPwd(e.target.value) } 
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
                <button>Submit Change</button>
            </form>
            <h2>calorieRecommand:</h2>
            <p>{calorieRecommand}</p>
            <button onClick={returnHome}>Back to Home</button>
        </div>
     );
}
 
export default Profile;