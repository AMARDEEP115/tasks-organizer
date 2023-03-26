import * as attri from "./actionTypes";

const initialState={
    isLoading:false,
    attributes:[],
    isFailure:false,
}

const Reducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case attri.ATTRIBUTESREQUEST : return {...state,isLoading:true};
        case attri.ATTRIBUTESSUCCESS : return {...state,isLoading:false,attributes:payload};
        case attri.ATTRIBUTESFAILURE : return {...state,isLoading:false,isFailure:true};
        default : return state;
    }
};

export {Reducer};