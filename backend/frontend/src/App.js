import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import PageHome from './PageHome';
import PageLogin from './PageLogin';
import Userfront from "@userfront/react";

Userfront.init("8nwyy85n");

function App() {
  function RedirectToHomeIfLoggedIn() {
    if (Userfront.accessToken()) {
      // If user is logged in, redirect them to /home
      return <Navigate to="/home" replace />;
    } else {
      // Otherwise, show the login page
      return <PageLogin />;
    }
  }

  function RequireAuth({ children }) {
    if (!Userfront.accessToken()) {
      // Redirect them to the /login page, but save the current location they were trying to go to
      return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
    }

    return children;
  }

  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/login" element={<RedirectToHomeIfLoggedIn />} />
      <Route path="/home" element={
        <RequireAuth>
          <PageHome />
        </RequireAuth>
      } />
    </Routes>
  );
}

export default App;
