import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from "./AuthContext";


const PrivateRoute = () => {
    const cxt = useContext(AuthContext)
    const auth = cxt.isLoggedIn; 
    return auth ? <Navigate to="/data" /> : <Navigate to="/auth" />;
}

export default PrivateRoute