import React, { useState } from 'react';
import './Login.css';

import logo_icon from '../Assets/Logo.png';
import eyeOpen from '../Assets/EyeOpen.png';
import eyeClose from '../Assets/EyeClose.png';

const Login = () => {
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(true);

    return (
        <div className='login-container'>
            <div className="logo">
                <img src={logo_icon} alt="Logo" />
            </div>
            <div className="em-pass">               
                <div className="input">
                    <input type="email" placeholder="Enter Email"/>
                </div>

                <div className="input">
                    <input 
                        type={visible ? "text" : "password"}
                        value={password} 
                        id="password" 
                        placeholder="Enter Password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className = "eyecon" onClick={() => setVisible(!visible)}>
                        <span>
                            {visible ? <img src={eyeOpen} alt="Show Password" /> 
                                     : <img src={eyeClose} alt="Hide Password" />}
                        </span>
                    </div>
                </div>
            </div>

            <div className="login-button">
                <div className="login-button-text">Login</div>
            </div>
        </div>
    );
}

export default Login;
