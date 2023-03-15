import React from "react";
import { Route, Routes, Router, Outlet } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Create from "../components/create";
import Edit from "./edit";
import RecordList from "./recordList";
import RequestList from "./RequestList";
import Request from "./Request";
import AuthorizationList from "./AuthorizationList";



export default function ReactTabs() {
  return (
    <Tabs>
      <TabList>
        <Tab>Inbox</Tab>
        <Tab>Sent</Tab>
        <Tab>Profile</Tab>
      </TabList>
      <TabPanel>
        <Routes>
          <Route path='' element={<AuthorizationList />}></Route>
        </Routes>
      </TabPanel>
      
      <TabPanel>
        <Routes>
          <Route path='' element={<RequestList />}></Route>
          <Route path='newrequest' element={<Request />}></Route>
        </Routes>
      </TabPanel>
      <TabPanel>
        <Routes>
          <Route path='' element={<RecordList />}></Route>
          <Route path='edit' element={<Edit />}></Route>
          <Route path='create' element={<Create />}></Route>x``
        </Routes>
      </TabPanel>
     
      <Outlet />
    </Tabs>

  );

}


