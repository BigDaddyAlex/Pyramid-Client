import React from 'react';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';

import awsExports from '../aws-exports';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dashboard from './Dashboard';
import Navbar from './navbar.tsx';

Amplify.configure(awsExports);

const NewAuth = ({signOut, user}: WithAuthenticatorProps) => {

  // async function test(){
  //   try {
  //     const user = await Auth.currentAuthenticatedUser({
  //       bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  //     });
  //     console.log(user)
  //     console.log(user.attributes.email)
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }
  // test()

  return (
    <div>
        <Navbar />
       <button onClick={signOut}>Sign out</button>
       <Dashboard email={user.attributes.email} />
    </div>
  );
}
export default withAuthenticator(NewAuth);