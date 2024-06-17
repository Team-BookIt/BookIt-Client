import React from "react";
import "../../styles.css";
import logo from "../../assets/logo.png";

const Header = () => {
    return(
        <header>
            <img src={logo} alt="brand logo" className="logo"/>

            <nav>
                <ul className="header-links-container">
                    <li className="login"><a href="../pages/landingPage.js">LOGIN</a></li>
                    <li className="signup"><a href="../pages/landingPage.js">SIGNUP</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;