import * as tasks from "./actionTypes";

const initialState={
    isLoading:false,
    allTasks:[],
    isFailure:false,
}

const Reducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case tasks.TASKSREQUEST : return {...state,isLoading:true};
        case tasks.TASKSSUCCESS : return {...state,isLoading:false,allTasks:payload};
        case tasks.TASKSFAILURE : return {...state,isLoading:false,isFailure:true};
        default : return state;
    }
};

export {Reducer};