
import { Collection, Divider } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import NewCard from "./cards/newCard";

export default () => {
  const [templates, setTemplates] = useState([])
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
      return ""
  }
  useEffect(() => {
    getTemplates()
    return
  }, [])
  
  console.log(templates)

  const items = [
    {
      title: 'Patient Intake',
      description: 'A form that hospitals use to register new patients',
      badges: ['Hospital', 'Verified'],
    },
    {
      title: 'Insurance',
      description: 'A form insurance companies use to collect data about claims',
      badges: ['Insurance'],
    },
  ];

  return (
    <div>
      <div className=" d-flex justify-content-center">
        <div className=" d-flex align-items-center " style={{ height: "70vh" }}>
          <span className="text-center">
            <div className="row text-white">
              <br />
              <br />
              <h3 className='text-white'>Let's eliminate the laborious proccesses involved in the exchange of data</h3>
              <div className='text-white'>- our time is better spent doing more productive work</div>
            </div>
          </span>
        </div>
      </div>

      <div className='row'>
        <h5 className='text-white'>Check out some of the most popular templates below</h5>

        <Divider orientation="horizontal" />
        <br />

      </div>
      <br />
      <Collection
        items={templates}
        type="list"
        direction="row"
        gap="20px"
        wrap="wrap"
      >
        {(item, index) => (
          <NewCard index={index} item={item} />
        )}
      </Collection>
      
    </div>
  );
}

