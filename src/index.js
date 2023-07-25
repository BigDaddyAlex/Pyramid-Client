import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Amplify, API } from 'aws-amplify';
import { configureStore, history } from "./reducers/store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";



const axios = require('axios').default;
const store = configureStore();

axios.baseURL = process.env.REACT_APP_API_URL + '';
let userData = JSON.parse(localStorage.getItem("userData"))
let token
if (userData) {
  token = userData.token
}
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/json'; axios.interceptors.request.use(request => {
  return request;
},
  error => {
    return Promise.reject(error);
  });
axios.interceptors.response.use(response => {
  return response;
},
  error => {
    return Promise.reject(error);
  });


const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ConnectedRouter history={history} store={store}>
      <BrowserRouter><App /></BrowserRouter>

    </ConnectedRouter>
  </Provider>,
);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );