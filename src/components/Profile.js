import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import ProfileCard from "./cards/ProfileCard";
import Create from "../components/create";
import Edit from "./edit";


export default function Profile(props) {
  const [records, setRecords] = useState({});
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [subPage, setSubPage] = useState("profile")

  useEffect(() => {
    setRecords(props.profileData)
    return;
  }, [deleteEvent, props.profileData]);

  async function deleteRecord(fieldName) {
    await fetch(process.env.REACT_APP_API_URL + '/delete', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props.email,
        field: fieldName
      }),
    });
    setDeleteEvent(!deleteEvent)
  }

  function getProfile() {
    return Object
      .keys(records)
      .filter((key) => key !== "password")
      .map(function (key) {
        return (<ProfileCard
          field={key}
          key={key}
          value={records[key]}
          deleteRecord={(fieldName) => deleteRecord(fieldName)}
          switchToEdit={switchToEdit}
        />)
      })
  }

  function switchToCreate(){
    setSubPage("create")
  }

  function switchToEdit(){
    setSubPage("edit")
  }

  if (subPage==="profile") {
    return (
      <div className="p-1">
        <button className="btn btn-dark btn-sm " onClick={switchToCreate}>
          Create Field
        </button>
        {getProfile()}
      </div>
    );
  } else if(subPage==="create"){
    return <Create fieldSearchList={props.fieldSearchList}/>
  } else if(subPage==="edit") {
    return <Edit />
  }

}