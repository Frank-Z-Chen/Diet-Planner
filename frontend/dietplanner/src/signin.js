import axios from "axios";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
const SignIn = props => {
    //const {register, handleSubmit } = useForm();
    const [userName, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [validUserInfo, setvalidUserInfo] = useState(true);
    const history = useHistory();

    const onSignInSubmit = async (e) =>{
        e.preventDefault();
        const data = {
          userName:userName, 
          password:pwd
        };
        console.log("sign In");
        console.log(data);
        //TODO: waiting for correct link from backend
        await axios.post('http://localhost:8000/auth/jwt/create/', data)
        .then(res=>{
            console.log(res);
            //if status = 403 then login failed
            if(res.status = 403){
              setvalidUserInfo(false);
            }
            else{
                //if login succss, go to home page and set up global user name
                window.userName = userName;
                //this should fetch token from data
                window.token = res.data.access;
                history.push("/home");
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }
    //Redirect to a different page
    const onSignUpSubmit = (e) =>{
        e.preventDefault();
        history.push("/createUser");
    }
    return (
    <div className="signIn">
        <h2>Welcome to DietPlanner</h2>
        <h2>Please enter your information to login</h2>
        {!validUserInfo && <h2>Either User Name or Password is Incorrect, try another time!</h2>}
        <form onSubmit = {onSignInSubmit}>
            <h1>User SignIn</h1>
            <label>User Name</label>
            <input 
            type='text' 
            name="userName" 
            required
            value = {userName}
            onChange={(e) => setUserName(e.target.value) } 
            />
            <label>Password</label>
            <input
            type='text' 
            name="password" 
            required
            value = {pwd}
            onChange={(e) => setPwd(e.target.value)} 
            />
            <button>Sign In</button>
            <button onClick={onSignUpSubmit}>Sign Up</button>
        </form>
    </div>
    );
}

export default SignIn;
