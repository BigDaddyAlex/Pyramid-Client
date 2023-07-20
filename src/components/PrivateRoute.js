import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from "./AuthContext";


const PrivateRoute = () => {
    const cxt = useContext(AuthContext)
    return cxt.isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="home" />;
}

export default PrivateRoute