import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import HomeCard from './HomeCard.tsx'

function Home() {

  const cxt = useContext(AuthContext)
  let navigate = useNavigate();

  useEffect(() => {
    if (cxt.isLoggedIn)
      navigate('/dashboard')
    return;
  }, [cxt.isLoggedIn]);

  return (
    <div>
      <div className=" d-flex justify-content-center">
        <div className=" d-flex align-items-center " style={{ height: "40vh" }}>
          <span className="text-center">
            <div class="row text-white">
              <h3 className='text-white'>Our mission is to eliminate the mannual proccesses involved in the exchange of day-to-day data</h3>
              <div className='text-white'>- our time is better spent doing more productive work</div>
            </div>
          </span>
        </div>
      </div>
      <div className='row'>
        <h3 className='text-white'>Check out some of the most popular templates below</h3>
        <HomeCard title='Patient Intake' description='A form that hospitals use to register new patients' />
        <HomeCard title='Insurance claim' description='A form insurance companies use to collect data about claims' />
        <HomeCard title='Library Membership Registration' description='A form libraries use to register new members' />
      </div>
    </div>


  );
}

export default Home;
