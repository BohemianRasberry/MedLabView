import './App.css';
import { Routes, Route } from "react-router-dom";
import PageHomeDN from './PageHomeDN';
import PageHomeLC from './PageHomeLC';
import PageHomeMT from './PageHomeMT';
import PageHomePG from './PageHomePG';
import PageAdmin from './PageAdmin';

import PageLogin from './PageLogin';

import Userfront from "@userfront/react";
import React, { Component } from 'react';
import { render } from 'react-dom';

Userfront.init("8nwyy85n");

function Home() {
  if (!Userfront.accessToken()) {
    return <PageLogin />;
  } else if (Userfront.user.hasRole("viewer")) { /*Doctor/Nurse*/
    return <PageHomeDN />;
  } else if (Userfront.user.hasRole("author")) { /*Lab Clerk*/
    return <PageHomeLC />;
  } else if (Userfront.user.hasRole("support")) { /*Medtech*/
    return <PageHomeMT />;
  } else if (Userfront.user.hasRole("subscriber")) { /*Pathologist*/
    return <PageHomePG />;
  } else if (Userfront.user.hasRole("admin")) { /*admin*/
    return <PageAdmin />;
  }
  // Redirect or show default content for users without a role
  return <div>Default Content</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PageLogin />} />
    </Routes>
  );
}

export default App;