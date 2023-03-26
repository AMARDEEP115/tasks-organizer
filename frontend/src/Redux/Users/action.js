import axios from "axios";
import * as users from "./actionTypes";

const UsersRequest=()=>{
    return {type:users.USERSREQUEST};
}

const UsersSucces=(data)=>{
    return {type:users.USERSSUCCESS,payload:data};
}

const UsersFailure=()=>{
    return {type:users.USERSFAILURE};
}


const getAllUsers=()=>{
    return (dispatch)=>{
        dispatch(UsersRequest());
        axios.get("https://backend-task-organizer.vercel.app/users/").then((res)=>dispatch(UsersSucces(res.data.Users))).catch(err=>dispatch(UsersFailure()));
    }
}

export {getAllUsers};