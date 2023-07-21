import React from 'react';

const HomeCard = (props) => {
  return (
    <div className="col-sm-3 mx-2 my-4">
      <div className="card bg-dark">
        <div className="card-body">
          <h5 className="card-title text-white">{props.title}</h5>
          <p className="card-text text-white">{props.description}</p>
          <a href="#" className="btn bg-black text-white">Try this</a>
        </div>
      </div>
    </div>
  );
};

export default HomeCard