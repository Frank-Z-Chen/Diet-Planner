import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBarFunc from "./navBar";

const Profile = () => {
    const [UserName, setUserName] = useState(window.UserName);
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [pwd, setPwd] = useState("");
    const [validUsername, setvalidUsername] = useState(true);
    const history = useHistory();

    const onFormSubmit = (e) =>{
        e.preventDefault();
        const data = {UserName, pwd, email,age,gender,pwd};
        console.log("profile Update");
        console.log(data);

        //vlidate user update
        setvalidUsername(false);
        //if update succss, go to home page
        history.push("/home");
    }

    useEffect(()=>{
        //we will fetch data from DB for the first time
    },[]);
    
    return ( 
        <div>
            <NavBarFunc />
            {!validUsername && <h2>User Name already exist, try other User name!</h2>}
            <form onSubmit={onFormSubmit}>
                <label>Password</label>
                <input 
                type='text' 
                name="password" 
                required
                value = {pwd}
                onChange={(e) => setPwd(e.target.value) } 
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
                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default Profile;