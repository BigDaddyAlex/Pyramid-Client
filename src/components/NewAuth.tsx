import React from 'react';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify, Auth } from 'aws-amplify';

import awsExports from '../aws-exports';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dashboard from './Dashboard';

Amplify.configure(awsExports);

const NewAuth = ({signOut, user}) => {

  async function test(){
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      console.log(user)
      console.log(user.attributes.email)
    } catch(err) {
      console.log(err);
    }
  }
  test()

  return (
    <div>
       <button onClick={signOut}>Sign out</button>
       <Dashboard email={user.attributes.email}/>
    </div>
  );
}
export default withAuthenticator(NewAuth);
