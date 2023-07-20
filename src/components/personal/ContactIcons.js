import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import data from './contact';

const ContactIcons = () => (
  <div className="d-flex justify-content-around bg-black  ">
    {data.map((s) => (
      <div  key={s.label}>
        <a href={s.link}>
          <FontAwesomeIcon icon={s.icon} />
        </a>
      </div>
    ))}
  </div>
);

export default ContactIcons;
