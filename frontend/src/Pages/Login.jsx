import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Spinner } from '@chakra-ui/react';
import "./Froms.css";

const initialCredentials={
    email:"",
    password:""
};

const Login=()=>{
    const [credentials,setCredentials]=React.useState(initialCredentials);
    const [type,setType]=React.useState("password");
    const handleLogin=(e)=>{
        e.preventDefault();
        console.log(credentials);
        return <Spinner
        thickness='7px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size="xl"
    />
    }
    // https://backend-task-organizer.vercel.app/
    return <div>
        <Navbar/>
        <form id="FormL" onSubmit={(e)=>handleLogin(e)}>
            <input value={credentials.email} type="email" placeholder="Email" onChange={(e)=>setCredentials({...credentials,email:e.target.value})}/>
            <div>
                <input value={credentials.password} type={type} placeholder="Password" onChange={(e)=>setCredentials({...credentials,password:e.target.value})}/>
                {type==="password" && <AiFillEye onClick={()=>setType("text")}/>}
                {type==="text" && <AiFillEyeInvisible onClick={()=>setType("password")}/>}
            </div>
            <button id="bTn" type="submit">LOGIN</button>
            <p>Don't have an account? <Link to="/signup">sign up</Link></p>
        </form>
    </div>
};

export default Login;