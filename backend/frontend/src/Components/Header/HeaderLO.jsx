import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './Header.css';

import home_icon from '../Assets/Home-LO.png';

const Header = () => {
    return (
        <div className='header'>

            <div className="title-short-lo">MSJK DTP</div>
            <div className="title-lo">MSJK Diagnostic Test Portal</div>

            <div className="home-lo">
                    <img src={home_icon} alt="Home" />
            </div>
        </div>
    );
}

export default Header;
