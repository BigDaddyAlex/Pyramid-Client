import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from './AuthContext';
import NewfuzzySearch from '../utils/NewFuzzySearch'


export default function Create(props) {
  const cxt = useContext(AuthContext)
  const [form, setForm] = useState({
    _id: cxt.email,
    field: "",
    value: "",
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const record = { ...form };

    await fetch(process.env.REACT_APP_API_URL + '/update', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({ field: "", value: "" });
    navigate("/");
  }

  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="field">Field</label>
          
          <NewfuzzySearch
            list={props.fieldSearchList}
            value={form.field}
            className="input"
            keys={['title']}
            width={430}
            onSelect={(e) => updateForm({ field: e.title })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input
            type="text"
            className="form-control"
            id="value"
            value={form.value}
            onChange={(e) => updateForm({ value: e.target.value })}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-dark btn-sm ">
            Create Field
          </button>
        </div>
      </form>
    </div>
  );
}