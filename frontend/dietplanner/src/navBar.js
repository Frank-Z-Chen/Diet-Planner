import { useHistory } from "react-router-dom";
import { Navbar } from "reactstrap";
import axios from "axios";

const NavBarFunc = () => {
    const history = useHistory();
/*
    const fetchRecCalorie = async () => {
        console.log("Calorie GET INIT");
        await axios.get('http://localhost:8000/planner/users/'+ window.userId +'/', {
            headers:{
                'Authorization': window.token
            }
        })
        .then(res=>{
            if(res.status === 403){
                //error happens back to home page
                console.log(res.status);
            }
            else{
                //set the local value
                console.log("Calorie GET DONE");
                window.calorieRecommand = res.data[0].recommend_cal;
            }
        })
        .catch(err =>{
            console.log(err)
        });
    }
*/
    const goSignOut = () =>{
        window.userName = "";
        window.token = "";
        window.userId = -1;
        window.email = "";
        window.gender = "";
        window.age ="";
        window.calorieRecommand = -1;
        history.push("/");
    }
    const goProfile = () =>{
        history.push("/profile");
    }
    const goHomePage = () =>{
        history.push("/home");
    }
    return ( 
        <Navbar>
            <button onClick={goHomePage}>HomePage</button>
            <button onClick={goProfile}>Profile</button>
            <button onClick={goSignOut}>Sign Out</button>
        </Navbar>
     );
}
 
export default NavBarFunc;