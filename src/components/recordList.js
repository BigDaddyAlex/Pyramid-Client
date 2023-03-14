import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

const Record = (props) => {
  
  return (
  <tr>
    <td>{props.field}</td>
    <td>{props.value}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.field}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
)};

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const cxt = useContext(AuthContext);
  let email = cxt.email


  useEffect(() => {
    
    async function getRecords() {
      const response = await fetch(`http://localhost:1050/record`, {
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
      console.log(response)
      const records = await response.json();
      
      setRecords(records);
    }

    
    getRecords(cxt.email);

    return;
  }, [records.length]);

  async function deleteRecord(id) {
    await fetch(`http://localhost:1050/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function getRecordList() {
    return Object
      .keys(records)
      .filter((key) => key != "password" && key != "_id")
      .map(function(key) {
      return  (<Record
        field = {key}
        value = {records[key]}
      />)
      
    })
  }

  if (cxt.isLoggedIn && cxt.email !== 'undefined') {
    return (
      <div>
        <h3>Data</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{getRecordList()}</tbody>
        </table>
      </div>
    );
  } else {
    return
  }

}