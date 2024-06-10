import React from "react";

const Header = () => {
    return(
        <div className="header">
            <div className="logo-container">
                <h1>BookIt!</h1>
            </div>

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