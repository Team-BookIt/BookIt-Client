import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

const Header = () => {
    const navigate = useNavigate();

    return(
        <header>
            <img src={logo} alt="brand logo" className="logo"/>

            <nav>
                <ul className="header-links-container">
                    <li className="login" onClick={() => navigate("/login")}>
                        <p>LOGIN</p>
                    </li>

                    <li className="signup" onClick={() => navigate("/signup")}>
                        <p>SIGNUP</p>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;