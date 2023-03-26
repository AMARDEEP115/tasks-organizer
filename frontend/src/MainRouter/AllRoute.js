import { Routes, Route } from "react-router-dom";
import Allusers from "../Pages/Allusers";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateRoute from "./PrivateRoute";

const AllRoute=({isAuth,setIsAuth})=>{
    return <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/signup" element={<Signup setIsAuth={setIsAuth}/>} />
        <Route path="/dashboard" element={<PrivateRoute isAuth={isAuth}>
            <Dashboard isAuth={isAuth}/>
        </PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute isAuth={isAuth}>
            <Allusers isAuth={isAuth}/>
        </PrivateRoute>} />
    </Routes>
}

export default AllRoute;