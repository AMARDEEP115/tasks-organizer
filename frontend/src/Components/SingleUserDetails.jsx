import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./SingleUserDetailss.css";
import SpecificTaskState from "./SpecificTaskState";

const SingleUserDetails=({userId,viewProfile})=>{
    const [userDisp,setUserDisp]=React.useState([]);

    const AllUsers=useSelector(store=>store.UserReducer.allUsers);
    const AllSprints=useSelector(store=>store.SprintReducer.sprints);
    const AllTasks=useSelector(store=>store.TaskReducer.allTasks);
    const AllAttributes=useSelector(store=>store.AttributesReducer.attributes);

    let usersDetails=AllUsers.find((elUser)=>elUser._id===userId);
    let LoggedInUser=JSON.parse(localStorage.getItem("userTask"));

    useEffect(()=>{
        let arr=[];
        let x=AllSprints.map((el)=>{
            let obj={};
            obj.sprintName=el.name;
            obj.sprintID=el._id;
            obj.tasks=[];
            AllTasks.map((elTask)=>{
                if(elTask.sprintID===el._id){
                    let inObj={};
                    inObj.taskName=elTask.name;
                    inObj.taskID=elTask._id;
                    inObj.Attribure=[];
                    AllAttributes.map((elAtri)=>{
                        if(elAtri.sprintID===el._id && elAtri.taskID===elTask._id){
                            if(elAtri.userID===userId){
                                let ininObj={
                                    attributeID:elAtri._id,
                                    taskID:elAtri.taskID,
                                    sprintID:elAtri.sprintID,
                                    description:elAtri.description,
                                    assignedTo:AllUsers.find((elUser)=>elUser._id===userId),
                                    state:elAtri.state,
                                };
                                inObj.Attribure.push(ininObj);
                            }
                        }
                    });
                    obj.tasks.push(inObj);
                };
            })
            arr.push(obj);
        });
        setUserDisp(arr);
    },[]);
    return <div style={{display:userId===viewProfile?"block":"none"}}>
        <div id="UserProfileContainer">
            <div>
                <h1>NAME : <span>{usersDetails.name}</span></h1>
                <h1>EMAIL : <span>{usersDetails.email}</span></h1>
                <h1>MOBILE : <span>{usersDetails.mobile}</span></h1>
            </div>
            <div>
                {LoggedInUser._id===userId && <h1>Logged In</h1>}
            </div>
        </div>
        <div id="UserTasksContainer">
            {userDisp.map((el,indexA)=><SpecificTaskState key={indexA} el={el} userId={userId}/>)}
        </div>
    </div>
}

export default SingleUserDetails;