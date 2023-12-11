import React from 'react'
import { Link } from "react-router-dom"
import './Header.css'

import home_icon from '../Assets/Home.png'

const Header = () => {
    return (
        <div className='header'>  
        <Link to="/home" target="_blank" rel="noreferrer">
            <div className="title"><span>MSJK Diagnostic Test Portal</span></div>
        </Link>
        
        <Link to="/home" target="_blank" rel="noreferrer">
            <div className="home">
                <span><img src={home_icon} alt="" /></span>
            </div>
        </Link>
        </div>
    );
}

export default Header