import React,  { useEffect, useContext } from 'react';
import Main from './Main';
import { useNavigate } from 'react-router-dom';
import { Amplify, API } from 'aws-amplify';
import { RootState } from "../../reducers";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

const ContactPage = (props) => {
  let navigate = useNavigate();
console.log(props.calculatorState)
  return (
    <div className=" d-flex justify-content-center ">
      <div className=" d-flex align-items-center " style={{ height: "85vh" }}>
        
          <article className="post" id="index">
            <header>
              <div className="title text-white">
                <h3>sqcalexander@gmail.com</h3>
              </div>
            </header>
          </article>
       
      </div>
    </div>
  );
}

export default ContactPage;