import React from "react";
import "../../styles.css";
import logo from "../../assets/logo.png";

const Header = () => {
    return(
        <header>
            <img src={logo} alt="brand logo" className="logo"/>

            <nav>
                <ul className="header-links-container">
                    <li className="header-link"><a href="../pages/landingPage.js">LOGIN</a></li>
                    <li id="signup-button" className="header-link"><a href="../pages/landingPage.js">SIGNUP</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;