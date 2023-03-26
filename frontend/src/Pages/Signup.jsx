import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Spinner } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import "./Froms.css";

const initialCredentials={
    name:"",
    email:"",
    mobile:"",
    password:""
};

const Signup=({setIsAuth})=>{
    const [credentials,setCredentials]=React.useState(initialCredentials);
    const [type,setType]=React.useState("password");
    const [isLoading,setIsLoading]=React.useState(false);
    const toast = useToast();
    const Navigate=useNavigate();

    const handleSignup=(e)=>{
        e.preventDefault();
        setIsLoading(true);
        axios.post("https://backend-task-organizer.vercel.app/users/signup",credentials).then((res)=>{
            let response=res.data;
            if(response.message==="Registered Successfully"){
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                setIsAuth(true);
                localStorage.setItem("isAuth",true);
                response.user.password="* * * * * *";
                localStorage.setItem("userTask",JSON.stringify(response.user));
                return Navigate("/");
            } else if(response.message==="Something went wrong"){
                toast({
                    title: 'Error.',
                    description: "Something went wrong, please try again",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            } else {
                toast({
                    title: 'Account already present',
                    description: response.message,
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            }
            setIsLoading(false);
            setCredentials(initialCredentials);
        }).catch(err=>{
            toast({
                title: 'Error.',
                description: "Something went wrong, please try again",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            setIsLoading(false);
            setCredentials(initialCredentials);
            console.log(err);
        });
    }

    return <div>
        {isLoading && <Spinner thickness='7px' speed='0.65s' emptyColor='gray.200' color='blue.500' size="xl" mt="25%"/>}
        {!isLoading && <form id="Form" onSubmit={(e)=>handleSignup(e)}>
            <input value={credentials.name} type="name" placeholder="Full Name" onChange={(e)=>setCredentials({...credentials,name:e.target.value})} required/>
            <input value={credentials.email} type="email" placeholder="Email" onChange={(e)=>setCredentials({...credentials,email:e.target.value})} required/>
            <input value={credentials.mobile} type='number' placeholder='Phone number' onChange={(e)=>setCredentials({...credentials,mobile:e.target.value})}/>
            <div>
                <input value={credentials.password} type={type} placeholder="Password" onChange={(e)=>setCredentials({...credentials,password:e.target.value})} required/>
                {type==="password" && <AiFillEye color="grey" onClick={()=>setType("text")}/>}
                {type==="text" && <AiFillEyeInvisible color="grey" onClick={()=>setType("password")}/>}
            </div>
            <button id="bTn" type="submit">REGISTER</button>
            <p>Have an account? <Link to="/login">login</Link></p>
        </form>}
    </div>
};

export default Signup;