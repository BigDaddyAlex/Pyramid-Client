import React,  { useEffect, useContext } from 'react';
import Main from './Main';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import { Amplify, API } from 'aws-amplify';

import awsconfig from '../../aws-exports'

Amplify.configure(awsconfig);
API.configure(awsconfig);

function getData() {
  const apiName = 'testApi';
  const path = '/test';
  const myInit = {
    headers: {} // OPTIONAL
  };
  return API.get(apiName, path, myInit);
}


const ContactPage = () => {
  const cxt = useContext(AuthContext)
  let navigate = useNavigate();

  useEffect(() => {
    if(cxt.isLoggedIn)
    navigate('/dashboard')
    return;
  }, [cxt.isLoggedIn]);

  return (
    <div className=" d-flex justify-content-center ">
      <div className=" d-flex align-items-center " style={{ height: "85vh" }}>
        
          <article className="post" id="index">
            <header>
              <div className="title">
                <h3>sqcalexander@gmail.com</h3>
                <button onClick={()=>getData()}>test</button>
              </div>
            </header>
          </article>
       
      </div>
    </div>
  );
}

export default ContactPage;
