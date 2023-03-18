import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

const Record = (props) => {

  return (
    <tr>
      <td>{props.field}</td>
      <td>{props.value}</td>
      <td>
        <Link className="btn btn-link" to={`edit`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteRecord(props.field);
          }}
        >
          x
        </button>
      </td>
    </tr>
  )
};

export default function RecordList() {
  const [records, setRecords] = useState({});
  const [deleteEvent, setDeleteEvent] = useState(false);

  const cxt = useContext(AuthContext);
  let email = cxt.email

  async function getRecordsFromMongo() {
    const response = await fetch(`http://localhost:1050/record`, {
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
    return Object
      .keys(records)
      .filter((key) => key != "password")
      .map(function (key) {
        return (<Record
          field={key}
          key = {key}
          value={records[key]}
          deleteRecord={(fieldName) => deleteRecord(fieldName)}
        />)

      })
  }

  if (cxt.isLoggedIn && cxt.email !== 'undefined') {

    return (
      <div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {getRecordList()}
          </tbody>
        </table>
        <button><Link className="nav-link" to="create">
          Create Record
        </Link></button>

      </div>
    );
  } else {
    return
  }

}