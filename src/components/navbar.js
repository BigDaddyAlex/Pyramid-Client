import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import AuthContext from './AuthContext';



// const myClickHandler = (event) => {
//   // const auth = this.context;
//   console.log(this.context);
//   event.preventDefault();

// }

// Here, we display our Navbar
// export default function Navbar() {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <NavLink className="navbar-brand" to="/">
//           <img style={{ "width": 20 + '%' }} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
//         </NavLink>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
       
//         <NavLink className="nav-link" to="/create">
//           Create Record
//         </NavLink>
//         <NavLink onClick={myClickHandler} className="nav-link">
//           Log Out
//         </NavLink>

//       </nav>
//     </div>
//   );
// }

class Navbar extends Component {
  static contextType = AuthContext;
  
  myClickHandler = (event) => {
    const auth = this.context;
    auth.logout();
    console.log(this.context);
    event.preventDefault();
  
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <NavLink className="navbar-brand" to="/">
            Pyramid
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
         
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