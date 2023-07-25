import { Amplify } from 'aws-amplify';
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from 'react-router-dom';
import awsExports from '../aws-exports';
import { connect } from "react-redux";
import * as signinActions from "./../actions/signinActions";

import { RootState } from "./../reducers";
import { bindActionCreators, Dispatch } from "redux";

Amplify.configure(awsExports);

export const Navbar = (props) => {
  let navigate = useNavigate();

  const ModalHandler = () => {
    navigate("auth")
  }


  function getRightButton(){
    if(props.signinState.signin){
      return <button className="text-dark btn btn-light btn-sm " onClick={()=>{props.actions.setSigninActions(false)}}>Sign out</button>
    } else {
      return <button className="text-dark btn btn-light btn-sm " onClick={ModalHandler} >
      Log in
    </button>
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
        
        {getRightButton()}
      </nav>
    </div>
  );
}


const actions: any = Object.assign({}, signinActions);

function mapStateToProps(state: RootState) {
  return {
    signinState: state.signinReducer,
  };
}
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);