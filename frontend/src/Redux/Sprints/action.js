import axios from "axios";
import * as sprint from "./actionTypes";

const SprintRequest=()=>{
    return {type:sprint.SPRINTSREQUEST};
}

const SprintSucces=(data)=>{
    return {type:sprint.SPRINTSSUCCESS,payload:data};
}

const SprintFailure=()=>{
    return {type:sprint.SPRINTSFAILURE};
}


const getAllSprints=()=>{
    return (dispatch)=>{
        dispatch(SprintRequest());
        axios.get("https://backend-task-organizer.vercel.app/sprints/").then((res)=>dispatch(SprintSucces(res.data.Sprints))).catch(err=>dispatch(SprintFailure()));
    }
}

export {getAllSprints};