import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainSearch from '../utils/MainSearch';

function Search(props) {

  let navigate = useNavigate();

  useEffect(() => {
    if(props.isLoggedIn)
    navigate('/dashboard')
    return;
  }, [props.isLoggedIn]);

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

export default Search;
