import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";

export default function Edit(props) {
  const [form, setForm] = useState({
    _id: props.email,
    field: "",
    value: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    // const record = {
    //   field: form.field,
    //   value: form.value,
    // };

    await fetch(process.env.REACT_APP_API_URL + '/update', {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="field">field: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ field: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">value: </label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ value: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}