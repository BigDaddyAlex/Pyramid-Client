import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-tabs/style/react-tabs.css';
import Profile from "./Profile";
import Sent from "./Sent";
import Inbox from "./Inbox";
import AuthContext from "./AuthContext";
import Templates from "./Templates";




export default function Dashboard(props) {
  const cxt = useContext(AuthContext);
  const [profileData, setProfileData] = useState({});
  const [activeTab, setActiveTab] = useState('inbox');

  const fieldSearchList = [{
    title: 'First Name'
  },
  {
    title: 'Last Name'
  }, {
    title: 'Phone Number'
  }, {
    title: 'Gender'
  }];

  let email = cxt.email
  let navigate = useNavigate();


  useEffect(() => {
    if (!cxt.isLoggedIn)
      navigate('/home')
    return;
  }, [cxt.isLoggedIn]);


  useEffect(() => {
    getRecordsFromMongo()
    return;
  }, []);

  async function getRecordsFromMongo() {
    const response = await fetch(process.env.REACT_APP_API_URL + '/record', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: email
      })
    });
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    setProfileData(await response.json())
  }

  function getClassName(activeTabTarget) {
    return activeTab === activeTabTarget ? 'bg-secondary text-white list-group-item' : 'list-group-item'
  }

  function getRightSide() {
    switch (activeTab) {
      case 'inbox':
        return (<Inbox profileData={profileData} />)
      case 'sent':
        return (<Sent profileData={profileData} fieldSearchList={fieldSearchList}/>)
      case 'profile':
        return (<Profile profileData={profileData} fieldSearchList={fieldSearchList}/>)
      case 'templates':
        return (<Templates profileData={profileData} fieldSearchList={fieldSearchList}/>)
    }

  }

  return (
    <div className="bg-light d-flex " style={{ minHeight: "90vh" }}>
      <div className="mt-2" style={{ width: "250px" }}>
        <header>
          <nav className=" d-lg-block bg-light">
            <div className="position-sticky">
              <div className="list-group bg-light">
                <div className={getClassName('inbox')} onClick={() => setActiveTab('inbox')}>Inbox </div>
                <div className={getClassName('sent')} onClick={() => setActiveTab('sent')}>Sent</div>
                <div className={getClassName('profile')} onClick={() => setActiveTab('profile')}>Profile</div>
                <div className={getClassName('templates')} onClick={() => setActiveTab('templates')}>Templates</div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <div className="flex-grow-1">
        {getRightSide()}
      </div>

    </div>
  );
}


