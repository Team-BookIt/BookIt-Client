import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
    return(
        <div className="header">
            <img src={logo} alt="brand logo" className="logo"/>

            <nav>
                <ul>
                    <li><a href="../pages/landingPage.js">LOGIN</a></li>
                    <li><a href="../pages/landingPage.js">SIGNUP</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;