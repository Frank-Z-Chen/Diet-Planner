import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const NewUser = () => {
    const [UserName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [pwd, setPwd] = useState("");
    const [validUsername, setvalidUsername] = useState(true);
    const history = useHistory();

    const onFormSubmit = async (e) =>{
        e.preventDefault();
        //This will be the actual data pass to backend using URL provided
        const data = {
            userName:UserName, 
            password:pwd, 
            userEmail:email,
            age:age,
            gender:gender};
        console.log(data);

        //vlidate user update
        //TODO: API Pending
        await axios.post('http://localhost:8000/planner/foods/', data)
        .then(res=>{
            console.log(res);
            setvalidUsername(res.data);
            if(validUsername){
                //if update succss, go to home page
                history.push("/home");
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }

    return ( 
        <div>
            {!validUsername && <h2>User Name already exist, try other User name!</h2>}
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
        </div>
     );
}
 
export default NewUser;