import React from "react";
import { FaGithub } from 'react-icons/fa';
import logo from "../../assets/logo.png";

const Footer = () => {
    return(
        <footer className="footer">
            
            <img src={logo} alt="brand logo" className="logo"/>

            <div className="links-container">
                <div className="github-repos">
                    <h3>DEVELOPMENT</h3>
                    <a href="https://github.com/Team-BookIt/BookIt-Client">Frontend</a>
                    <a href="https://github.com/Team-BookIt/BookIt-Server">Backend</a>
                </div>
                <div className="documentation">
                    <h3>DOCUMENTATION</h3>
                    <a href="https://www.figma.com/design/naKB2JfKyjKQSekl61tGHd/BookIt%2CUI%2FUX?node-id=76-2&t=Q2ZdQMg2236jtFlb-0">UI plan</a>
                    <a href="https://www.figma.com/design/naKB2JfKyjKQSekl61tGHd/BookIt%2CUI%2FUX?node-id=76-2&t=Q2ZdQMg2236jtFlb-0">Requirements</a>
                </div>
            </div>

            <FaGithub size={80}/>
        </footer>
    );
};

export default Footer;