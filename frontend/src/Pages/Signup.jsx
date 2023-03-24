import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Froms.css";

const initialCredentials={
    name:"",
    email:"",
    mobile:"",
    password:""
};

const Signup=()=>{
    const [credentials,setCredentials]=React.useState(initialCredentials);
    const [type,setType]=React.useState("password");
    const handleSignup=(e)=>{
        e.preventDefault();
        console.log(credentials);
    }
    // https://backend-task-organizer.vercel.app/
    return <div>
        <Navbar/>
        <form id="Form" onSubmit={(e)=>handleSignup(e)}>
            <input value={credentials.name} type="name" placeholder="Full Name" onChange={(e)=>setCredentials({...credentials,name:e.target.value})}/>
            <input value={credentials.email} type="email" placeholder="Email" onChange={(e)=>setCredentials({...credentials,email:e.target.value})}/>
            <input value={credentials.mobile} type='number' placeholder='Phone number' onChange={(e)=>setCredentials({...credentials,mobile:e.target.value})}/>
            <div>
                <input value={credentials.password} type={type} placeholder="Password" onChange={(e)=>setCredentials({...credentials,password:e.target.value})}/>
                {type==="password" && <AiFillEye onClick={()=>setType("text")}/>}
                {type==="text" && <AiFillEyeInvisible onClick={()=>setType("password")}/>}
            </div>
            <button id="bTn" type="submit">REGISTER</button>
            <p>Have an account? <Link to="/login">login</Link></p>
        </form>
    </div>
};

export default Signup;