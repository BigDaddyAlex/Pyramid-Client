import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   field: "",
   value: "",
 });
 const params = useParams();
 const navigate = useNavigate();
 
//  useEffect(() => {
//    async function fetchData() {
//      const field = params.field.toString();
//      const response = await fetch(`http://localhost:1050/record/${params.field.toString()}`);
 
//      if (!response.ok) {
//        const message = `An error has occurred: ${response.statusText}`;
//        window.alert(message);
//        return;
//      }
 
//      const record = await response.json();
//      if (!record) {
//        window.alert(`Record with id ${field} not found`);
//        navigate("/");
//        return;
//      }
 
//      setForm(record);
//    }
 
//    fetchData();
 
//    return;
//  }, [params.id, navigate]);
 
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const record = {
     field: form.field,
     value: form.value,
   };
 
   await fetch(`http://localhost:1050/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(record),
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