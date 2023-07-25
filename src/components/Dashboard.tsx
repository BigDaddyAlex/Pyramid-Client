import { useEffect, useState } from "react";
import 'react-tabs/style/react-tabs.css';
import { Dispatch, bindActionCreators } from "redux";
import Inbox from "./Inbox";
import Profile from "./Profile";
import Sent from "./Sent";
import Templates from "./Templates";

import * as signinActions from "./../actions/signinActions";


import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { RootState } from "./../reducers";
import { connect } from "react-redux";

function Dashboard(props) {
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

  useEffect(() => {
    getRecordsFromMongo()
    return;
  }, []);

  useEffect(() => {
    if (!props.signinState.signin) {
      props.signOut()
      props.actions.setSigninActions(true)
    } 
  }, [props.signinState.signin]);

  async function getRecordsFromMongo() {
    const response = await fetch(process.env.REACT_APP_API_URL + '/record', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.email
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
    return activeTab === activeTabTarget ? 'bg-secondary text-white list-group-item ' : 'list-group-item text-white bg-black'
  }

  function getRightSide() {
    switch (activeTab) {
      case 'inbox':
        return (<Inbox profileData={profileData} email={props.email} />)
      case 'sent':
        return (<Sent profileData={profileData} email={props.email} fieldSearchList={fieldSearchList}/>)
      case 'profile':
        return (<Profile profileData={profileData} email={props.email} fieldSearchList={fieldSearchList}/>)
      case 'templates':
        return (<Templates profileData={profileData} email={props.email} fieldSearchList={fieldSearchList}/>)
    }
  }

  return (
    <div className="bg-black d-flex " style={{ minHeight: "90vh" }}>
      <div className="mt-2" style={{ width: "250px" }}>
        <header>
          <nav className=" d-lg-block">
            <div className="position-sticky">
              <div className="list-group bg-black">
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


const actions: any = Object.assign({}, signinActions);

function mapStateToProps(state: RootState) {
  return {
    signinState: state.signinReducer
  };
}
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
