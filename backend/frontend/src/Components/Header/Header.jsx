import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './Header.css';

import home_icon from '../Assets/Home.png';
import Userfront from "@userfront/core";

const Header = () => {
    const location = useLocation();
    const isLoggedIn = Userfront.accessToken() !== null;

    // Do not show logout button on the login page
    const showLogoutButton = isLoggedIn && location.pathname !== '/login'; 

    const handleLogout = () => {
        Userfront.logout();
    }

    return (
        <div className='header'>
            <Link to="/" target="_self" rel="noreferrer">
                <div className="title"><span>MSJK Diagnostic Test Portal</span></div>
            </Link>
            
            {showLogoutButton && (
                <button onClick={handleLogout} className="logout-button">
                    <span><div className='logout-button-text'>
                        Logout
                    </div></span>
                </button>
            )}

            <Link to="/" target="_self" rel="noreferrer">
                <div className="home">
                    <span><img src={home_icon} alt="Home" /></span>
                </div>
            </Link>
        </div>
    );
}

export default Header;
