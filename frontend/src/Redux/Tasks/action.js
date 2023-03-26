import axios from "axios";
import * as tasks from "./actionTypes";

const TasksRequest=()=>{
    return {type:tasks.TASKSREQUEST};
}

const TasksSucces=(data)=>{
    return {type:tasks.TASKSSUCCESS,payload:data};
}

const TasksFailure=()=>{
    return {type:tasks.TASKSFAILURE};
}


const getAllTasks=()=>{
    return (dispatch)=>{
        dispatch(TasksRequest());
        axios.get("https://backend-task-organizer.vercel.app/tasks/").then((res)=>dispatch(TasksSucces(res.data.tasks))).catch(err=>dispatch(TasksFailure()));
    }
}

export {getAllTasks};