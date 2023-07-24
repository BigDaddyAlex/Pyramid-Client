import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import AuthContext from './AuthContext';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let params = useParams();

    return (
      <Component
        {...props}
        location={location}
        params={params}
      />
    );
  }
  return ComponentWithRouterProp;
}

const Navbar = (props) => {
  const cxt = useContext(AuthContext)
  const [modal, setModal] = useState(false);
  let navigate = useNavigate();

  const ModalHandler = () => {
    if (cxt.isLoggedIn) {
      cxt.logout()

    } else {
      navigate('auth')
    }
  }

  return (
    <div>
      <nav className="navbar bg-black p-2 align-items-end">
        <NavLink className="navbar-brand" to="/">
          <img className="img-fluid " style={{ height: 35 }} src="/logo-transparent-bg.png" />
        </NavLink>
        <NavLink className="navbar-nav h5 text-white text-decoration-none"  to="/">
          Home
        </NavLink>
        <NavLink className="navbar-nav h5 text-white text-decoration-none "  to="/creator">
          About
        </NavLink>
        <NavLink className="navbar-nav h5 text-white text-decoration-none"  to="/Contact">
          Contact
        </NavLink>
        
        <button className="text-dark btn btn-light btn-sm " onClick={ModalHandler} >
          {cxt.isLoggedIn ? "Log out" : "Log in"}
        </button>
      </nav>
    </div>
  );
}


export default withRouter(Navbar);