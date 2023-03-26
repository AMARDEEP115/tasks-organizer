import { Link } from "react-router-dom";
import "./Navbarr.css";

const Navbar=({isAuth,setIsAuth})=>{
    return <div id="Navbar">
        <Link to="/">HOME</Link>
        {!isAuth && <Link to="/login">LOGIN</Link>}
        {!isAuth && <Link to="/signup">SIGNUP</Link>}
        {isAuth && <Link to="/dashboard">DASHBOARD</Link>}
        {isAuth && <Link to="/users">USERS</Link>}
        {isAuth && <Link to="/" onClick={()=>{
            setIsAuth(false);
            localStorage.setItem("isAuth",false);
            localStorage.removeItem("userTask");
        }}>LOGOUT</Link>}
    </div>
}

export default Navbar;