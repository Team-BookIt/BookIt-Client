import React from "react";
import logo from "../../assets/logo.png";

const Header = () => {
    return(
        <header className="header">
            <img src={logo} alt="brand logo" className="logo"/>

            <nav>
                <ul>
                    <li><a href="../pages/landingPage.js">LOGIN</a></li>
                    <li><a href="../pages/landingPage.js">SIGNUP</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;