import React,  { useEffect, useContext } from 'react';
import Main from './Main';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';


const Creator = () => {
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
        <Main>
          <article className="post" id="index">
            <header>
              <div className="title">
              </div>
            </header>
          </article>
        </Main>
      </div>
    </div>
  );
}

export default Creator;
