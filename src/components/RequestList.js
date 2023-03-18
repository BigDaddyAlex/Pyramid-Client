import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import Request from "./Request";


const Record = (props) => {

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.requestDate}</td>
      <td>{props.data}</td>
      <td>
        <button className="btn btn-link"
          onClick={() => {
            // props.deleteRecord(props.field);
          }}
        >
          x
        </button>
      </td>
    </tr>
  )
};

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [deleteEvent, setDeleteEvent] = useState(false);

  const cxt = useContext(AuthContext);
  let email = cxt.email


  async function getRecordsFromMongo() {
    const response = await fetch(`http://localhost:1050/requests`, {
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
            key={record.requestee}
            requestDate={record.requestDate}
            data={JSON.stringify(record.fields)}
          />
        );
      });
  }

  // 

  if (cxt.isLoggedIn && cxt.email !== 'undefined') {
    return (
      <div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Create Date</th>
              <th>Data</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {getRecordList()}
          </tbody>
        </table>
        <button>
          <Link className="nav-link" to="newrequest">
            New
          </Link>
        </button>
        <div><Request emails={records.map(record=>record.requestee)}/></div>

      </div>
    );
  } else {
    return
  }

}