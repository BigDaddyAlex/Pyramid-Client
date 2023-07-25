import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";

import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify, Auth } from 'aws-amplify';
import { SigninModel } from "../interfaces/SigninModel";
import * as signinActions from "./../actions/signinActions";

import awsExports from '../aws-exports';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dashboard from './Dashboard';
import Navbar from "./navbar"
import { RootState } from "./../reducers";

Amplify.configure(awsExports);


interface Props {
  signinState: SigninModel;
  actions: any;
}

const NewAuth = (props) => {

console.log(props.signinState.signin)
  useEffect(() => {
    if (!props.signinState.signin) {
      props.signOut()
      props.actions.setSigninActions(true)
    } 
  }, [props.signinState.signin]);

  async function test() {
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      // console.log("sss")
      // console.log(user)
    } catch (err) {
      // console.log(err);
    }
  }
  test()
  return (
    <div>
      
      <Dashboard email={props.user?.attributes?.email} />
    </div>
  );
}
const actions: any = Object.assign({}, signinActions);

function mapStateToProps(state: RootState) {
  console.log(state)
  return {
    signinState: state.signinReducer
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
)(withAuthenticator(NewAuth));
