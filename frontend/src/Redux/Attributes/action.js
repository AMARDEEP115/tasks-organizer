import axios from "axios";
import * as attri from "./actionTypes";

const AttrisRequest=()=>{
    return {type:attri.ATTRIBUTESREQUEST};
}

const AttrisSucces=(data)=>{
    return {type:attri.ATTRIBUTESSUCCESS,payload:data};
}

const AttrisFailure=()=>{
    return {type:attri.ATTRIBUTESFAILURE};
}


const getAllAttris=()=>{
    return (dispatch)=>{
        dispatch(AttrisRequest());
        axios.get("https://backend-task-organizer.vercel.app/attributes/").then((res)=>dispatch(AttrisSucces(res.data.attributes))).catch(err=>dispatch(AttrisFailure()));
    }
}

export {getAllAttris};