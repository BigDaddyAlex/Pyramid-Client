import React, { Component, useContext } from 'react';

import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

import AuthContext from './AuthContext';

class Navbar extends Component {
  static contextType = AuthContext
  
  myClickHandler = (event) => {
    const auth = this.context;
    auth.logout();
    event.preventDefault();
  
  }
  
  render() {
    const auth = this.context;  
    
    var hw = auth.isLoggedIn ? "Signed in" : "signed out"
    console.log(hw)
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">
            Pyramid
          </NavLink>
          <div>{hw}</div>
         
          <NavLink className="nav-link" to="/create">
            Create Record
          </NavLink>
          <NavLink onClick={this.myClickHandler} className="nav-link">
            Log Out
          </NavLink>
  
        </nav>
      </div>
    );
  }
}

export default Navbar;