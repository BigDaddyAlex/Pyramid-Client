import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { parseData } from "../../utils/Utils"

export default function InboxCard(props) {

    const [authEvent, setAuthEvent] = useState(false);
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        setProfileData(props.profileData)
        return;
    }, [props.profileData]);

    async function approveAll(data1, request_id) {
        console.log(data1)
        Object
            .keys(data1)
            .forEach((key) => {
                if (Object.keys(profileData).includes(key)) {
                    data1[key] = profileData[key]
                }
            })

        await fetch(process.env.REACT_APP_API_URL + '/updateRequest', {
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
        <div className="p-1">
            <div key={props.id} className="card " style={{ width: "100%" }}>
                <div className="card-body row">
                    <div key="id" className="w-50 text-start col-sm">{props.id}</div>
                    <div key="date" className="w-10 text-end col-sm">{props.requestDate}</div>
                    <div key="data" className="w-30 text-end col-sm" style={{whiteSpace: 'pre-wrap'}} >{parseData(props.data)}</div>
                    <div key="actions" className="w-30 text-end col-sm">
                        <Link className="btn text-success" onClick={() => approveAll(props.data, props.request_id)}>&#10003;</Link>
                        <Link className="btn btn-link" to={`edit`}>Select</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}