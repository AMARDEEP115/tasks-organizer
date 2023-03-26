import { Button } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const SingleUserDetails=({userId})=>{
    const AllSprints=useSelector(store=>store.SprintReducer.sprints);
    const AllTasks=useSelector(store=>store.TaskReducer.allTasks);
    const AllAttributes=useSelector(store=>store.AttributesReducer.attributes);

    let usersAttributes=[];
    usersAttributes=AllAttributes.map((el)=>el.userID===userId);
    let userTasks=[];
    for(let i=0;i<usersAttributes.length;i++){
        let obj={}
        for(let j=0;j<AllTasks.length;j++){
            if(usersAttributes[i].taskID===AllTasks[j]._id){
                userTasks.push(AllTasks[j]);
            }
        }
    }
    let userSprints=[];
    for(let i=0;i<usersAttributes.length;i++){
        for(let j=0;j<AllSprints.length;j++){
            if(usersAttributes[i].sprintID===AllSprints[j]._id){
                userSprints.push(AllSprints[j]);
            }
        }
    }

    // if(usersAttributes.length>0 && userTasks.length>0 && userSprints.length>0){
    //     return 
    // }
    return <div>
        {userSprints.map((el)=>{
            return <div style={{border:"3px solid red"}}>
                {userTasks.map((eltask)=>{
                    if(el._id===eltask.sprintID){
                        return <div style={{border:"3px solid blue"}}>
                            {usersAttributes.map((elAtri)=>{
                                if(elAtri.sprintID===eltask._id){
                                    return <div style={{border:"3px solid green"}}>
                                        {elAtri.description}
                                    </div>
                                }
                            })}
                        </div>
                    }
                })}
            </div>
        })}
    </div>
}

export default SingleUserDetails;