import * as users from "./actionTypes";

const initialState={
    isLoading:false,
    allUsers:[],
    isFailure:false,
}

const Reducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case users.USERSREQUEST : return {...state,isLoading:true};
        case users.USERSSUCCESS : return {...state,isLoading:false,allUsers:payload};
        case users.USERSFAILURE : return {...state,isLoading:false,isFailure:true};
        default : return state;
    }
};

export {Reducer};