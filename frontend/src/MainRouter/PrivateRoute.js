import { Navigate } from "react-router-dom";

const PrivateRoute=({children})=>{
    let isAuth=true;
    if(isAuth){
        return children;
    }
    return <Navigate to="/login" />
}

export default PrivateRoute;