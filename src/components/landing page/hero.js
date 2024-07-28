import React from "react";
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    const handleButtonPress = () => {
        navigate("/signup");
    }
    return(
        <div className="hero-section">
            <h1 className="hero-heading">Event booking & management <br/>made easy!</h1>
            <p className="hero-paragraph">Effortlessly organize and book your events with our intuitive platform. Whether it's a corporate meeting, a wedding, or a casual get-together, our streamlined tools ensure a hassle-free experience from start to finish. Simplify your event planning today!</p>
            <button className="get-started" onClick={handleButtonPress}>
                Get Started
                <FaChevronRight size={20}/>
            </button>
        </div>
    );
}

export default Hero;