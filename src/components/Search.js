import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import MainSearch from '../utils/MainSearch';

function Home() {

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
        <span className="text-center">
          <MainSearch 
            placeholder = "You can say things like sign in"
            width = "500px" />
        </span>
      </div>
    </div>
  );
}

export default Home;
