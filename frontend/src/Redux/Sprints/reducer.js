import * as sprint from "./actionTypes";

const initialState={
    isLoading:false,
    sprints:[],
    isFailure:false,
}

const Reducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case sprint.SPRINTSREQUEST : return {...state,isLoading:true};
        case sprint.SPRINTSSUCCESS : return {...state,isLoading:false,sprints:payload};
        case sprint.SPRINTSFAILURE : return {...state,isLoading:false,isFailure:true};
        default : return state;
    }
};

export {Reducer};