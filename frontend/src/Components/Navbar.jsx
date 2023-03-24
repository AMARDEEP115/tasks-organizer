import { Link } from "react-router-dom";
import "./Navbarr.css";

const Navbar=()=>{
    return <div id="Navbar">
        <Link to="/">HOME</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/signup">SIGNUP</Link>
        <Link to="/dashboard">DASHBOARD</Link>
        <Link to="/users">USERS</Link>
    </div>
}

export default Navbar;