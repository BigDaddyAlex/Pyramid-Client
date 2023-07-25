import React from 'react';

import HomeCard from './cards/HomeCard'
import { Collection, Button, Heading, Card, Image, Flex, View, Badge, Divider } from '@aws-amplify/ui-react';
import Navbar from './navbar';
import { Route, Routes, Search } from 'react-router-dom';
import Home from './Home';
import Creator from './personal/Creator';
import ContactPage from './personal/ContactPage';


function Unauth() {



  return (

    <div>
      <Navbar />
      <div className="px-5">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="creator" element={<Creator />} />
          <Route path="Contact" element={<ContactPage />} />
        </Routes>
      </div>
    </div>


  );
}

export default Unauth;
