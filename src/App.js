import './App.css';
import { Routes, Route, Navigate} from "react-router-dom";
import PageHomeDN from './PageHomeDN';
import PageHDNPatient from './PageHDNPatient';
import PageHomeMT from './PageHomeMT';
import PageHomePG from './PageHomePG';
import PageAdmin from './PageAdmin';
import PageLogin from './PageLogin';
import PageHDNPIDetailed from "./PageHDNPIDetailed";
import PageHMTUnfinished from "./PageHMTUnfinished";
import Userfront from "@userfront/react";
import React from 'react';
import PageHMTInput from './PageHMTInput';

Userfront.init("8nwyy85n");

function Home() {
  if (!Userfront.accessToken()) {
    return <PageLogin />;
  } else if (Userfront.user.hasRole("viewer")) {
    return <PageHomeDN />;
  } else if (Userfront.user.hasRole("author")) {
    return <PageHomeMT />;
  } else if (Userfront.user.hasRole("subscriber")) {
    return <PageHomePG />;
  } else if (Userfront.user.hasRole("admin")) {
    return <PageAdmin />;
  }
  return <PageLogin />;
}

function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          Userfront.accessToken() ? (
            <Home/>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/login" element={<PageLogin/>}/>
      <Route path="/patient/:patientId" element={<PageHDNPatient/>}/>
      <Route path="/patient/:patientId/:transactionId/:specimenId" element={<PageHDNPIDetailed/>}/>
      <Route path="/unfinished" element={<PageHMTUnfinished/>}/>
      <Route path="/input" element={<PageHMTInput/>}/>
    </Routes>
  );
}

export default App;