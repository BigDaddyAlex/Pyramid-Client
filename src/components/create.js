import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from './AuthContext';


export default function Create() {
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


    await fetch("http://localhost:1050/update", {
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
          <input
            type="text"
            className="form-control"
            id="field"
            value={form.field}
            onChange={(e) => updateForm({ field: e.target.value })}
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
          <input
            type="submit"
            value="Create record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}