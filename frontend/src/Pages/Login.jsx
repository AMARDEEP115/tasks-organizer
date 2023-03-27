import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Spinner, useToast } from '@chakra-ui/react';
import "./Froms.css";

const initialCredentials={
    email:"",
    password:""
};

const Login=({setIsAuth})=>{
    const [credentials,setCredentials]=React.useState(initialCredentials);
    const [type,setType]=React.useState("password");
    const [isLoading,setIsLoading]=React.useState(false);
    const toast = useToast();
    const Navigate=useNavigate();

    const handleLogin=(e)=>{
        e.preventDefault();
        setIsLoading(true);
        axios.post("https://backend-task-organizer.vercel.app/users/signin",credentials).then((res)=>{
            let response=res.data;
            if(response.message==="Signin Successfully"){
                toast({
                    title: 'Login',
                    description: "Login Successfull",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
                setIsAuth(true);
                localStorage.setItem("isAuth",true);
                localStorage.setItem("userTask",JSON.stringify(response.user));
                return Navigate("/");
            } else if(response.message==="Wrong Password"){
                toast({
                    title: 'Error.',
                    description: "Password is incorrect, please try again",
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            } else if(response.message==="User not found"){
                toast({
                    title: 'Error.',
                    description: "User not found, please signup first",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            } else if(response.message==="Something went wrong"){
                toast({
                    title: 'Error.',
                    description: "Something went wrong, please try again",
                    status: 'error',
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
        {!isLoading && <form id="FormL" onSubmit={(e)=>handleLogin(e)}>
            <input value={credentials.email} type="email" placeholder="Email" onChange={(e)=>setCredentials({...credentials,email:e.target.value})}/>
            <div>
                <input value={credentials.password} type={type} placeholder="Password" onChange={(e)=>setCredentials({...credentials,password:e.target.value})}/>
                {type==="password" && <AiFillEye color="grey" onClick={()=>setType("text")}/>}
                {type==="text" && <AiFillEyeInvisible color="grey" onClick={()=>setType("password")}/>}
            </div>
            <button id="bTn" type="submit">LOGIN</button>
            <p>Don't have an account? <Link to="/signup">sign up</Link></p>
        </form>}
    </div>
};

export default Login;