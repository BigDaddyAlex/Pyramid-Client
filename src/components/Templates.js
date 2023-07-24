import { useState, useContext, useEffect } from "react"
import GenericButton from "./basic/GeneriButton";

export default function Templates(props) {


  const [templates, setTemplates] = useState([])
  const [templateIdxSelected, setTemplateIdxSelected] = useState(-1)
  const [requestEmail, setRequestEmail] = useState("")

  function getTemplates() {
    fetch(process.env.REACT_APP_API_URL + '/templates', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
    ).then(response => response.json())
      .then(data => setTemplates(data))
      .catch(e => {
        console.log(e);
      })

  }
  useEffect(() => {
    getTemplates()
    return
  }, [])

  function getTemplateHtml() {
    return templates
      .map((template, idx) => {
        return (
          <div className="p-1" key={idx}>
            <div className="card p-2 bg-dark text-white" key={template._id} style={{ width: "100%" }}>
              <div className="card-body row" >
                <div className="col-sm">
                  {template.pubilcName}
                </div>
                <div className="col-sm">{template.fields}</div>
                <div className="col-sm">
                  <GenericButton onClick={() => setTemplateIdxSelected(idx)} value='use' key={idx} />
                </div>
              </div>
            </div>
          </div>
        )
      })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(templates[templateIdxSelected]["fields"])
    let fields = {}
    templates[templateIdxSelected]["fields"].forEach((item) => {
      console.log(item)
      fields[item] = 0
    })
    await fetch(process.env.REACT_APP_API_URL + '/createRequest', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: props.email,
        recipient: requestEmail,
        fields: fields
      }
      ),
    })
      .catch(error => {
        window.alert(error);
        return;
      });
  }

  const handleChangeEmail = e => {
    e.preventDefault();

    setRequestEmail(e.target.value.toLowerCase().trim())
  };


  if (templateIdxSelected === -1) {
    return (
      <div className="p-1">
        <div className="">
          {getTemplateHtml()}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {JSON.stringify(templates[templateIdxSelected])}
          <br></br>
          <label>Email Address</label>
          <input type="text" className="form-control mt-1" placeholder="Email" value={requestEmail} onChange={handleChangeEmail} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}