import React from "react";
import { parseData } from "../../utils/Utils"

export default function InboxCard(props) {

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

    return (
        <div className="p-1">
            <div key={props.id} className="card " style={{ width: "100%" }}>
                <div className="p-3 row">
                    <div key="id" className=" text-start col-sm" style={{width: "400px"}}>{props.id }</div>
                    <div key="date" className="w-10 text-end col-sm">{props.requestDate}</div>
                    <div key="data" className="w-30 text-end col-sm" style={{ whiteSpace: 'pre-wrap' }} >{parseData(props.data)}</div>
                    <div key="actions" className="w-30 text-end col-sm">
                        <button className="btn text-danger" onClick={() => { handleDelete(props.field); }}>
                            x
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}