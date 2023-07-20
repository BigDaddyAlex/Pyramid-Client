import React, { useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import Request from "./Request";
import SentCard from "./cards/SentCard";

export default function Sent(props) {
  const [isRequstUpdated, setIsRequstUpdated] = useState(false);
  const [records, setRecords] = useState([]);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [createRequest, setCreateRequest] = useState(false);


  const cxt = useContext(AuthContext);
  let email = cxt.email


  async function getRecordsFromMongo() {
    const response = await fetch(process.env.REACT_APP_API_URL + '/requests', {
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

    const records = await response.json();
    setRecords(records);
  }

  useEffect(() => {
    getRecordsFromMongo()
    return;
  }, [deleteEvent, isRequstUpdated]);

  function getRecordList() {
    return records
      .map((record) => {
        return (
          <SentCard
            requester={cxt.email}
            id={record.requestee}
            key={record.requestee}
            requestDate={record.requestDate.substring(0,10)}
            data={record.fields}
            onDelete={deleteRequestHandler}
          />
        );
      });
  }

  const requestChangeHandler = (e) => {
    setCreateRequest(false)
  }

  const deleteRequestHandler = (e) => {
    setDeleteEvent(!deleteEvent)
    console.log(deleteEvent)
  }

  if (!createRequest) {
    return (
      <div className="p-1">
        <div className="mt-3" >
          <div className="mr-2">
            <button className="btn btn-dark btn-sm" type='button' onClick={() => setCreateRequest(true)}>
              New
            </button>
          </div>
        </div>
        <div className="font-weight-bold p-2">
          You have sent out {records.length} requests for data
        </div>  
        {getRecordList()}
      </div>
    );
  } else {
    return (
      <div><Request emails={records.map(record => record.requestee)} fieldSearchList={props.fieldSearchList}
        onChange={requestChangeHandler} />
      </div>
    )
  }

}