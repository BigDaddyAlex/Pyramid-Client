import React from "react";
import { Link } from "react-router-dom";


export default function ProfileCard(props) {

    async function handleDelete(e) {
        await fetch(process.env.REACT_APP_API_URL + '/deleteRequest', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sender: props.requester,
                recipient: props.id
            })
        });
        props.onDelete();
    }

    function switchToEdit() {
        props.switchToEdit()
    }

    if (props.field !== '_id') {
        return (
            <div className="p-1">
                <div key={props.id} className="card bg-dark text-white" style={{ width: "100%" }}>
                    <div className="card-body row">
                        <div key="id" className="w-50 text-start col-sm">{props.field}</div>
                        <div key="date" className="w-10 text-end col-sm">{props.value}</div>
                        <div key="data" className="w-30 text-end col-sm" style={{ whiteSpace: 'pre-wrap' }} >{props.data}</div>
                        <div key="actions" className="w-30 text-end col-sm">
                            <button className="btn btn-link" onClick={switchToEdit}>Edit</button> |
                            <button className="btn text-danger" onClick={() => { props.deleteRecord(props.field); }}>
                                x
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="p-1">
                <div key={props.id} className="card bg-dark text-white" style={{ width: "100%" }}>
                    <div className="card-body row">
                        <div key="id" className="w-50 text-start col-sm">{props.field}</div>
                        <div key="date" className="w-10 text-end col-sm">{props.value}</div>
                        <div key="data" className="w-30 text-end col-sm" style={{ whiteSpace: 'pre-wrap' }} >{props.data}</div>
                        <div key="actions" className="w-30 text-end col-sm">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}