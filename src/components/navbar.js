import React, { useContext } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import AuthContext from './AuthContext';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  }
  return ComponentWithRouterProp;
}

const Navbar = (props) => {
  const cxt = useContext(AuthContext)

  function MyClickHandler(event) {

    cxt.logout()
    event.preventDefault();

    props.navigate('/auth')
  }

  var hw = cxt.isLoggedIn ? "Logged in as " + cxt.email: "Logged out"
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          Pyramid
        </NavLink>
        <NavLink onClick={MyClickHandler} className="nav-link">
          {hw}
        </NavLink>

      </nav>
    </div>
  );
}


export default withRouter(Navbar);