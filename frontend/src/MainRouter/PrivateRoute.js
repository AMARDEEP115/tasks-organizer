import { Navigate } from "react-router-dom";

const PrivateRoute=({children,isAuth})=>{
    if(isAuth){
        return children;
    }
    return <Navigate to="/login" />
}

export default PrivateRoute;