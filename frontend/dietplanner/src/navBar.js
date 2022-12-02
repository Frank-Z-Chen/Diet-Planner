import { useHistory } from "react-router-dom";
import { Navbar } from "reactstrap";

const NavBarFunc = () => {
    const history = useHistory();
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