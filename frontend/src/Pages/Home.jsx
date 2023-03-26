import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllAttris } from "../Redux/Attributes/action";
import { getAllSprints } from "../Redux/Sprints/action";
import { getAllTasks } from "../Redux/Tasks/action";
import { getAllUsers } from "../Redux/Users/action";
import "./Homee.css";


const Home=({isAuth})=>{
    const dispatch=useDispatch();

    useEffect(()=>{
        if(isAuth){
            dispatch(getAllUsers());
            dispatch(getAllSprints());
            dispatch(getAllTasks());
            dispatch(getAllAttris());
        }
    },[dispatch,isAuth]);
    return <div id="Home">
        <Heading>Welcome to <span>Task Organizer</span></Heading>
    </div>
};

export default Home;