import React from 'react'
import './Header.css'

import home_icon from '../Assets/Home.png'

const Header = () => {
    return (
        <div className='header'>  
            <div className="title"><span>MSJK Diagnostic Test Portal</span></div>
            <div className="home">
                <span><img src={home_icon} alt="" /></span>
            </div>
        </div>
    );
}

export default Header