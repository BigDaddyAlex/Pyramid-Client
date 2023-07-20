import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import InboxCard from "./cards/InboxCard";


export default function Inbox(props) {
  const [records, setRecords] = useState([]);
  const cxt = useContext(AuthContext);
  let email = cxt.email
  const [profileData, setProfileData] = useState([]);

  async function getRecordsFromMongo() {
    const response = await fetch(process.env.REACT_APP_API_URL + '/authorizations', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email
      })
    });
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    setRecords(records);
  }

  useEffect(() => {
    setProfileData(props.profileData)
    return;
  }, [props.profileData]);

  useEffect(() => {
    getRecordsFromMongo()
    return;
  }, []);

  function getRecordList() {

    return records.length === 0 ? <></> : records
      .map((record) => {
        return (
          <InboxCard
            id={record.requester}
            request_id={record._id}
            key={record.requester}
            requestDate={record.requestDate.substring(0, 10)}
            data={record.fields}
            profileData={profileData}
          />
        );
      });
  }

  if (cxt.isLoggedIn && cxt.email !== 'undefined') {
    return (
      <div className="p-1">
        <div className="font-weight-bold p-2">
          You have {records.length} requests to review
        </div>
        {getRecordList()}
      </div>
    );
  } else {
    return
  }
}