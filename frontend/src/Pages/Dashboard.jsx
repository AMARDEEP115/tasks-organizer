import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./Dashboards.css";
import React, { useEffect } from "react";
import AddSprintBox from "../Components/AddSprintBox";
import AddTaskBox from "../Components/AddTaskBox";
import EditTaskBox from "../Components/EditTaskBox";
import DeleteTaskBox from "../Components/DeleteTaskBox";
import AddAttributeBox from "../Components/AddAttributeBox";
import EditAttributeBox from "../Components/EditAttributeBox";
import DeleteAttributeBox from "../Components/DeleteAttributeBox";

const Dashboard=({isAuth})=>{
    const [dashDisp,setDashDisp]=React.useState([]);
    const [showTask,setShowTask]=React.useState({sprint:"",task:""});
    const AllUsers=useSelector(store=>store.UserReducer.allUsers);
    const AllSprints=useSelector(store=>store.SprintReducer.sprints);
    const AllTasks=useSelector(store=>store.TaskReducer.allTasks);
    const AllAttributes=useSelector(store=>store.AttributesReducer.attributes);
    // console.log(AllSprints);
    // console.log(AllTasks);
    // console.log(AllAttributes);

    // if(dashDisp.length>0){
    //     console.log(dashDisp);
    // }
    
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
                            let ininObj={
                                attributeID:elAtri._id,
                                taskID:elAtri.taskID,
                                sprintID:elAtri.sprintID,
                                description:elAtri.description,
                                assignedTo:AllUsers.find((elUser)=>elUser._id===elAtri.userID),
                                state:elAtri.state,
                            };
                            inObj.Attribure.push(ininObj);
                        }
                    });
                    obj.tasks.push(inObj);
                };
            })
            arr.push(obj);
        });
        setDashDisp(arr);
    },[]);

    if(!isAuth){
        return <Navigate to="/" />
    }

    return <div id="Dashboard">
        <AddSprintBox dashDisp={dashDisp} setDashDisp={setDashDisp}/>

        {/* <button id="AddNewSprint">Add New Sprint</button> */}
        {dashDisp.length>0 && dashDisp.map((el,indexA)=><div key={indexA} className="SingleSprint">
            <h1>{el.sprintName}</h1>
            <div>
                <div className="SprintsTaskTable">
                    <AddTaskBox dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID}/>
                    <div>
                        {el.tasks.map((elTasks,indexB)=><div key={indexB} className="SingleTasksView">
                            <h1 onClick={()=>{
                            if(el.sprintID===showTask.sprint && elTasks.taskID===showTask.task){
                                setShowTask({sprint:"",task:""});
                            } else {
                                setShowTask({sprint:el.sprintID,task:elTasks.taskID});
                            }
                        }}>{elTasks.taskName}</h1>
                            <div>
                                <EditTaskBox dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID} taskID={elTasks.taskID} />
                                <DeleteTaskBox  dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID} taskID={elTasks.taskID} />
                            </div>
                        </div>)}
                    </div>
                </div>
                {el.tasks.map((elTasks,indexB)=><div key={indexB} style={{display:(showTask.task===elTasks.taskID && showTask.sprint===el.sprintID)?"block":"none"}} className="SelectedSprintsTasksTable">
                        <h1>{elTasks.taskName}</h1>
                        <div>
                            <div className="New">
                                <AddAttributeBox dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID} taskID={elTasks.taskID} />
                                {elTasks.Attribure.map((elAttribs,indexC)=>elAttribs.state==="new" && <div key={indexC} className="SingleAtrribs">
                                    <div>{elAttribs.description}</div>
                                    <p>Assigned to : {elAttribs.assignedTo===""?"No Body":elAttribs.assignedTo.name}</p>
                                    <div>
                                        <p>State : {elAttribs.state}</p>
                                        <div>
                                            <EditAttributeBox dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID} taskID={elTasks.taskID} attributeID={elAttribs.attributeID} assignedTo={elAttribs.assignedTo} description={elAttribs.description} state={elAttribs.state} />
                                            <DeleteAttributeBox dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID} taskID={elTasks.taskID} attributeID={elAttribs.attributeID}/>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                            <div className="InProgress">
                                <h1>In Progress</h1>
                                {elTasks.Attribure.length>0 && elTasks.Attribure.map((elAttribs,indexC)=>elAttribs.state==="inProgress" && <div key={indexC} className="SingleAtrribs">
                                    <div>{elAttribs.description}</div>
                                    <p>Assigned to : {elAttribs.assignedTo===""?"No Body":elAttribs.assignedTo.name}</p>
                                    <div>
                                        <p>State : {elAttribs.state}</p>
                                        <div>
                                            <EditAttributeBox dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID} taskID={elTasks.taskID} attributeID={elAttribs.attributeID} assignedTo={elAttribs.assignedTo} description={elAttribs.description} state={elAttribs.state} />
                                            <DeleteAttributeBox dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID} taskID={elTasks.taskID} attributeID={elAttribs.attributeID}/>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                            <div className="Completed">
                                <h1>Completed</h1>
                                {elTasks.Attribure.map((elAttribs,indexC)=>elAttribs.state==="completed" && <div key={indexC} className="SingleAtrribs">
                                    <div>{elAttribs.description}</div>
                                    <p>Assigned to : {elAttribs.assignedTo===""?"No Body":elAttribs.assignedTo.name}</p>
                                    <div>
                                        <p>State : {elAttribs.state}</p>
                                        <div>
                                            <EditAttributeBox dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID} taskID={elTasks.taskID} attributeID={elAttribs.attributeID} assignedTo={elAttribs.assignedTo} description={elAttribs.description} state={elAttribs.state} />
                                            <DeleteAttributeBox dashDisp={dashDisp} setDashDisp={setDashDisp} sprintID={el.sprintID} taskID={elTasks.taskID} attributeID={elAttribs.attributeID}/>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>)
        }
    </div>
};

export default Dashboard;