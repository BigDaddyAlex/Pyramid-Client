import React, { useCallback, useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import axios from 'axios';
import Auth from './components/Auth';
import AuthContext from './components/AuthContext';
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import PrivateRoute from "./components/PrivateRoute";

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
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        email: email,
        login: login,
        logout: logout
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route exact path='/' element={<PrivateRoute />}>
          </Route>
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/home" element={<RecordList />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;