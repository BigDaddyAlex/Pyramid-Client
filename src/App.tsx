import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import NewAuth from "./components/NewAuth";
import Search from './components/Search';
import Navbar from './components/navbar';
import ContactPage from "./components/personal/ContactPage";
import Creator from "./components/personal/Creator";


const App = () => {
  return (
    <div className="App bg-black" style={{ height: 999 }}>
      <Navbar />
      <div className="px-5">
        <Routes>
          <Route path="auth" element={<NewAuth />} />
          <Route path="" element={<Home />} />
          <Route path="creator" element={<Creator />} />
          <Route path="Contact" element={<ContactPage />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="search/*" element={<Search />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;