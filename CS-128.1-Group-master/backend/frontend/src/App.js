import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PageHomeDN from './PageHomeDN';
import PageHDNPatient from './PageHDNPatient';
import PageHomeLC from './PageHomeLC';
import PageHomeMT from './PageHomeMT';
import PageHomePG from './PageHomePG';
import PageAdmin from './PageAdmin';
import PageLogin from './PageLogin';
import Userfront from "@userfront/react";
import React from 'react';

Userfront.init("8nwyy85n");

function Home() {
  if (!Userfront.accessToken()) {
    return <PageLogin />;
  } else if (Userfront.user.hasRole("viewer")) {
    return <PageHomeDN />;
  } else if (Userfront.user.hasRole("author")) {
    return <PageHomeLC />;
  } else if (Userfront.user.hasRole("support")) {
    return <PageHomeMT />;
  } else if (Userfront.user.hasRole("subscriber")) {
    return <PageHomePG />;
  } else if (Userfront.user.hasRole("admin")) {
    return <PageAdmin />;
  }
  return <PageLogin />;
}

function PrivateRoute({ children }) {
  const location = useLocation();
  if (Userfront.accessToken()) {
    // If user is logged in and tries to access the login page, redirect them to home
    return location.pathname === "/login" ? <Navigate to="/" /> : children;
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PrivateRoute><PageLogin /></PrivateRoute>} />
      <Route path="/patient" element={<PageHDNPatient/>}/>
    </Routes>
  );
}

export default App;
