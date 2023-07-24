import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Search from './components/Search';
import Navbar from "./components/navbar.tsx";
import ContactPage from "./components/personal/ContactPage.tsx";
import Creator from "./components/personal/Creator";
import NewAuth from "./components/NewAuth.tsx"



let logoutTimer;

const App = () => {

  const userData = JSON.parse(localStorage.getItem("userData"));

  const [token, setToken] = useState(userData);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [email, setEmail] = useState(userData ? userData["email"] : null);
  const [isLoading, setIsloading] = useState(true)

  const login = useCallback((email, token, expirationDate) => {
    setToken(token);
    setEmail(email);
    setIsloading(false)
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        email: email,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setEmail(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('profileData');
    let token = null
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    setIsloading(false)
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.email, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return (
      <div className="App bg-black" style={{ height: 999 }}>
        

          <Routes>
            <Route path="auth" element={<NewAuth />} />
            <Route path="" element={<Home />} />
            <Route path="creator" element={<Creator />} />
            <Route path="Contact" element={<ContactPage />} />
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="search/*" element={<Search />} />
          </Routes>

      </div>
  );
};

export default App;