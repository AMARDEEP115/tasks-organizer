import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SingleUser from "../Components/SingleUser";
import SingleUserDetails from "../Components/SingleUserDetails";
import "./Alluserss.css";

const Allusers=({isAuth})=>{
    const [viewProfile,setViewProfile]=React.useState("");
    const AllUsers=useSelector(store=>store.UserReducer.allUsers);
    if(!isAuth){
        return <Navigate to="/" />
    }
    return <div id="Allusers">
        <div>
            <div id="AlluersLeftSection">
                <div>ALL USERS</div>
                {AllUsers.map((el,index)=><div key={index} onClick={()=>{
                    if(viewProfile===""){
                        setViewProfile(el._id);
                    } else {
                        if(viewProfile===el._id){
                            setViewProfile("");
                        } else {
                            setViewProfile(el._id);
                        }
                    }
                }}>
                    <SingleUser name={el.name} />
                </div>)}
            </div>
            <div  id="AlluersRightSection">
                {/* {viewProfile!=="" && <SingleUserDetails  userId={viewProfile}/>} */}
                {AllUsers.map((el,index)=><SingleUserDetails key={index}  userId={el._id} viewProfile={viewProfile}/>)}
            </div>
        </div>
    </div>
};

export default Allusers;