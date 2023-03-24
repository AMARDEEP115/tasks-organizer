import { Routes, Route } from "react-router-dom";
import Allusers from "../Pages/Allusers";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateRoute from "./PrivateRoute";

const AllRoute=()=>{
    return <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<PrivateRoute>
            <Dashboard/>
        </PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute>
            <Allusers/>
        </PrivateRoute>} />
    </Routes>
}

export default AllRoute;