import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from './ContactIcons';


const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header className="text-center text-white">
        <h2>About The Creator</h2>
        <div><br></br></div>
      </header>
    </section>

    <section className="blurb text-white">
      <p>Hi, I&apos;m Alex. I like building things.</p>
      <p>  I have worked on software engineering roles at serveral tech firms
        in the past few years.
      </p>
      <p>Prior to that, I spent a few years working in real estate finance in NYC.
      </p>
      <ul className="actions">
      </ul>
    </section>

    <div id="footer">
      <ContactIcons/>
    </div>
  </section>
);

export default SideBar;
