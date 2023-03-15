import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

const Record = (props) => {

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.requestDate}</td>
      <td>{props.data}</td>
      <td>
        <Link className="btn btn-link" onClick={props.approveAll}>Approve all</Link> 
        <Link className="btn btn-link" to={`edit`}>Select to approve</Link>
      </td>
    </tr>
  )
};

export default function AuthorizationList() {
  const [records, setRecords] = useState([]);
  const [deleteEvent, setDeleteEvent] = useState(false);

  const cxt = useContext(AuthContext);
  let email = cxt.email

  async function getRecordsFromMongo() {
    const response = await fetch(`http://localhost:1050/authorizations`, {
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
  }, [deleteEvent]);
  
  //TODO
  async function approveAll(){
    // await fetch(`http://localhost:1050/delete`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     _id: cxt.email,
    //     field: fieldName
    //   }),
    // });

  }

  async function deleteRecord(fieldName) {
    await fetch(`http://localhost:1050/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: cxt.email,
        field: fieldName
      }),
    });
    setDeleteEvent(!deleteEvent)
  }

  function getRecordList() {
    return records
      .map((record) => {
        return (
          <Record
            id={record.requestee}
            key = {record.requestee}
            requestDate={record.requestDate}
            data={JSON.stringify(record.fields)}
            approveAll={() => approveAll()}
          />
        );
      });
  }

  if (cxt.isLoggedIn && cxt.email !== 'undefined') {
    return (
      <div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Create Date</th>
              <th>Data</th>
              <th>OPS</th>
            </tr>
          </thead>
          <tbody>
            {getRecordList()}
          </tbody>
        </table>
    

      </div>
    );
  } else {
    return
  }

}