import React from "react";
import "./SpecificTaskStatee.css";

const SpecificTaskState=({el,userId})=>{
    const [taskState,setTaskState]=React.useState({task:"",state:""});
    return <div className="SingleSprintView">
                <h1>{el.sprintName}</h1>
                <div className="S3lectBox">
                    <h1>Select Task</h1>
                    <select value={taskState.task} onChange={(e)=>setTaskState({...taskState,task:e.target.value})}>
                        <option>--select--</option>
                        {el.tasks.map((elTask,indexB)=><option key={indexB} value={elTask.taskID}>{elTask.taskName}</option>)}
                    </select>
                </div>
                <div className="S3lectBox">
                    <h1>Select State</h1>
                    <select value={taskState.state} onChange={(e)=>setTaskState({...taskState,state:e.target.value})}>
                        <option>--select--</option>
                        <option value="new">New</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <hr/>
                <div className="TaskDisplay">
                    {el.tasks.map((elTasks)=>elTasks.Attribure.map((elAtribs,indexC)=>{
                        if(elAtribs.assignedTo._id===userId){
                            return <div key={indexC} style={{display:(taskState.task===elTasks.taskID && taskState.state===elAtribs.state)?"block":"none"}} className="SinggleTassk">
                                {elAtribs.description}
                            </div>
                        }
                    }))}
                </div>
    </div>
}

export default SpecificTaskState;