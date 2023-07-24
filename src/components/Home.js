import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCard from './cards/HomeCard.tsx'
import Navbar from './navbar.tsx';

function Home() {

  let navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className=" d-flex justify-content-center">
        <div className=" d-flex align-items-center " style={{ height: "40vh" }}>
          <span className="text-center">
            <div class="row text-white">
              <h3 className='text-white'>Let's eliminate the laborious proccesses involved in the exchange of data</h3>
              <div className='text-white'>- our time is better spent doing more productive work</div>
            </div>
          </span>
        </div>
      </div>
      <div className='row'>
        <h5 className='text-white'>Check out some of the most popular templates below</h5>
        <HomeCard title='Patient Intake' description='A form that hospitals use to register new patients' />
        <HomeCard title='Insurance claim' description='A form insurance companies use to collect data about claims' />
        <HomeCard title='Library Membership Registration' description='A form libraries use to register new members' />
      </div>
    </div>


  );
}

export default Home;
