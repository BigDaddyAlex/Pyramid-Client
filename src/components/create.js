import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   field: "",
   value: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
    console.log("------")
    console.log(prev)
    console.log({ ...prev, ...value })
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:1050/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ field: "", value: ""});
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
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}