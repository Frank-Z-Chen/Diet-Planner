import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NewUser = () => {
    const [UserName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [pwd, setPwd] = useState("");
    const [validUserInput, setvalidvalidUserInput] = useState(true);
    const history = useHistory();

    const onFormSubmit = async (e) =>{
        e.preventDefault();
        //This will be the actual data pass to backend using URL provided
        const data = {
            username:UserName, 
            password:pwd,
            age:age,
            gender:gender, 
            email:email
            };
        console.log("data sent to backend");
        console.log(data);

        //Process user create  
        await axios.post('http://localhost:8000/auth/users/', data)
        .then(res=>{
            console.log(res);
            if(res.status === 403){ 
                setvalidvalidUserInput(false);
            }
            else{
                //if update succss, go back to sign in page
                history.push("/");
            }
        })
        .catch(err =>{
            console.log(err);
            setvalidvalidUserInput(false);
        });
    }

    //For back to sign in page
    const ClickSignInButton = ()=>{
        history.push("/");
    }

    return ( 
        <div>
            {!validUserInput && <h2>User Name already exist, try other User name!</h2>}
            <form onSubmit={onFormSubmit}>
                <label>User Name</label>
                <input 
                type='text' 
                name="UserName" 
                required
                value = {UserName}
                onChange={(e) => setUserName(e.target.value) } 
                />
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
            <button onClick={ClickSignInButton}>Back to Sign In</button>
        </div>
     );
}
 
export default NewUser;