import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from './AuthContext';

export default function Request(props) {
  console.log(props.emails)
  const cxt = useContext(AuthContext)
  const [recipient, setRecipient] = useState("");
  const [form, setForm] = useState({
    _id: cxt.email,
    fields: [],
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {

    e.preventDefault();

    console.log(recipient)
    console.log(props.emails)

    if (props.emails.includes(recipient)) {
      return
    } else {
      await fetch("http://localhost:1050/createRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: cxt.email,
          recipient: recipient,
          fields: arr.map(item => item.value)
        }),
      })
        .catch(error => {
          window.alert(error);
          return;
        });
    }



    // setForm({ field: "", value: "" });

    // navigate("/");
  }

  const inputArr = [

    {
      type: "text",
      id: 1,
      value: ""
    }
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = (e) => {
    e.preventDefault();
    setArr(s => {
      return [
        ...s,
        {
          type: "text",
          value: ""
        }
      ];
    });
  };

  const handleChangeEmail = e => {
    e.preventDefault();

    setRecipient(e.target.value)
  };

  const handleChange = e => {
    e.preventDefault();

    const index = e.target.id;
    setArr(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  return (
    <div>
      <h3>Create New Request</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group" key="email">
          <label htmlFor="field">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={recipient}
            onChange={handleChangeEmail}
          />
        </div>
        {arr.map((item, i) => {
          return (
            <div className="form-group" key={i}>
              <label htmlFor="value">New field</label>
              <input
                className="form-control"
                value={item.value}
                type={item.type}
                id={i}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <button onClick={addInput}>Add</button>
        <div className="form-group">
          <input
            type="submit"
            value="Create record"
            className="btn btn-primary"
          />
        </div>
        <div className="form-group">
        </div>
      </form>
    </div>
  );
}