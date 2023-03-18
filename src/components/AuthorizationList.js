import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

const Record = (props) => {

  const [authEvent, setAuthEvent] = useState(false);

  useEffect(() => {
    return;
  }, [authEvent]);

  async function approveAll(data1, request_id) {
    Object
      .keys(data1)
      .forEach((key) => {
        data1[key] = 1
      })

    await fetch(`http://localhost:1050/updateRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": request_id,
        field: "fields",
        value: data1
      }),
    });
    setAuthEvent(!authEvent)

  }
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.requestDate}</td>
      <td>{JSON.stringify(props.data)}</td>
      <td>
        <Link className="btn btn-link" onClick={() => approveAll(props.data, props.request_id)}>Approve all</Link>
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
  }, []);

  function getRecordList() {
    return records
      .map((record) => {
        return (
          <Record
            id={record.requestee}
            request_id={record._id}
            key={record.requestee}
            requestDate={record.requestDate}
            data={record.fields}
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
              <th>Action</th>
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