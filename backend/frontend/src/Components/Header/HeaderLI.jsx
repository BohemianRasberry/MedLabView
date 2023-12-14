import React from 'react';
import { useNavigate } from "react-router-dom";
import './Header.css';

import home_icon from '../Assets/Home.png';
import Userfront from "@userfront/core";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = Userfront.accessToken() !== null;

    // Do not show logout button on the login page

    const handleLogout = () => {
        Userfront.logout();
    }

    const navigateHome = () => {
        if (isLoggedIn) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    return (
        <div className='header'>
            <div onClick={navigateHome}>
                <div className="title-short"><span>MSJK DTP</span></div>
                <div className="title"><span>MSJK Diagnostic Test Portal</span></div>
            </div>

            <button onClick={handleLogout} className="logout-button">
                    <span><div className='logout-button-text'>
                        Logout
                    </div></span>
            </button>

            <div onClick={navigateHome}>
                <div className="home">
                    <span><img src={home_icon} alt="Home" /></span>
                </div>
            </div>
        </div>
    );
}

export default Header;
