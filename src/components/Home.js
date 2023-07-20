import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

function Home() {

  const cxt = useContext(AuthContext)
  let navigate = useNavigate();

  useEffect(() => {
    if (cxt.isLoggedIn)
      navigate('/dashboard')
    return;
  }, [cxt.isLoggedIn]);

  return (
    <div className=" d-flex justify-content-center">
      <div className=" d-flex align-items-center " style={{ height: "85vh" }}>
        <span className="text-center">
          <div class="row text-white">
            <h1>A place for you to outsource your work</h1>
          </div>
        </span>
      </div>
    </div>
  );
}

export default Home;
