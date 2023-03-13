import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from "./AuthContext";


const PrivateRoute = () => {
    const cxt = useContext(AuthContext)
    const auth = cxt.isLoggedIn; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Navigate to="/recordlist" /> : <Navigate to="/auth" />;
}

export default PrivateRoute