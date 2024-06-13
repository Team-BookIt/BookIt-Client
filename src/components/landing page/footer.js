import React from "react";
import { FaGithub } from 'react-icons/fa';
import "../../styles.css";
import logo from "../../assets/logo.png";

const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-container">
                <img src={logo} alt="brand logo" className="logo"/>

                <div className="links-container">
                    <div className="links-block">
                        <h3 className="block-heading">DEVELOPMENT</h3>
                        <a href="https://github.com/Team-BookIt/BookIt-Client" className="link">Frontend</a>
                        <a href="https://github.com/Team-BookIt/BookIt-Server" className="link">Backend</a>
                    </div>
                    <div className="links-block">
                        <h3 className="block-heading">DOCUMENTATION</h3>
                        <a href="https://www.figma.com/design/naKB2JfKyjKQSekl61tGHd/BookIt%2CUI%2FUX?node-id=76-2&t=Q2ZdQMg2236jtFlb-0" className="link">UI plan</a>
                        <a href="https://www.figma.com/design/naKB2JfKyjKQSekl61tGHd/BookIt%2CUI%2FUX?node-id=76-2&t=Q2ZdQMg2236jtFlb-0" className="link">Requirements</a>
                    </div>
                </div>

                <div>
                    <FaGithub size={100}/>
                </div>
            </div>

            <p className="copyright">&copy; Software Engineering Group 11</p>
        </footer>
    );
};

export default Footer;