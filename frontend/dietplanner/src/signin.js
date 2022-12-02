import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const SignIn = () => {
    //const {register, handleSubmit } = useForm();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [validUserInfo, setvalidUserInfo] = useState(true);
    const history = useHistory();

    const onSignInSubmit = async (e) =>{
        e.preventDefault();
        //construct data post to backend
        const data = {
          email:email, 
          password:pwd
        };
        
        //TODO: waiting for correct link from backend and set up global value
        await axios.post('http://localhost:8000/auth/jwt/create/', data)
        .then(res=>{
            //if status = 403 then login failed
            if(res.status === 403){
              setvalidUserInfo(false);
            }
            else{
                //if login succss, go to home page and set up global token
                window.token = 'JWT '+res.data.access;
                //call helper function to set global value
                fetchUserDataWithToken();
                //after setting up user data, go home page
                history.push("/home");
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }
    //helper function for setting up global value after user successfully login
    const fetchUserDataWithToken = async()=>{
        //use the accepted token to fetch user Data
        //TODO: validate use of API
        await axios.get('http://localhost:8000/auth/users/me/',{
            headers:{
                'Authorization': window.token
            }
        }).then(res=>{
            window.userName = res.data.username;
            window.userId = res.data.userid;
            window.email = res.data.email;
            window.gender = res.data.gender;
            window.age =res.data.age;
            console.log(res);
        })
        .catch(err =>{
            console.log(window.token)
            console.log(err)
        });
    }

    //Redirect to a sign up page
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
            <label>Email Address</label>
            <input 
            type='text' 
            name="email" 
            required
            value = {email}
            onChange={(e) => setEmail(e.target.value) } 
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
