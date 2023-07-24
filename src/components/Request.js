import React, { useContext, useState } from "react";
import NewfuzzySearch from '../utils/NewFuzzySearch'


export default function Request(props) {

  const [recipient, setRecipient] = useState("");

  async function onSubmit(e) {

    e.preventDefault();

    if (props.emails.includes(recipient)) {
      return
    } else {
      let fields = {}
      arr.forEach((item) => fields[item.value] = 0)
      await fetch(process.env.REACT_APP_API_URL + '/createRequest', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: props.email,
          recipient: recipient,
          fields: fields
        }
        ),
      })
        .catch(error => {
          window.alert(error);
          return;
        });
    }

    props.onChange()
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
    setRecipient(e.target.value.toLowerCase().trim())
  };

  const handleChange = (selected, i) => {

    setArr(s => {
      const newArr = s.slice();

      newArr[i].value = selected.title

      return newArr;
    });
  };

  return (
    <div className="p-5 bg-light" style={{ minHeight: "90vh" }}>
      <div>
        <h5>New Request</h5>
        <form onSubmit={onSubmit}>
          <label htmlFor="field">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={recipient}
            onChange={handleChangeEmail}
            style={{width: "200px"}}
          />
          {arr.map((item, i) => {
            return (
              <NewfuzzySearch
                list={props.fieldSearchList}
                value={item.value}
                className=""
                key={i}
                keys={['title']}
                width={200}
                onSelect={(selected) => handleChange(selected, i)}
              />
            );
          })}
          <button className="mt-2" onClick={addInput}>+</button>
          <div className="form-group">
            <input className="btn btn-dark btn-sm mt-2" type="submit" value="Create record" />
          </div>
          <div className="form-group">
          </div>
        </form>
      </div>
    </div>
  );
}