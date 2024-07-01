import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import PrimaryButton from "../components/landing page/primaryButton";

import logo from "../assets/logo.png";
import sideImage from "../assets/onboarding-1.png";



const Login = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("attendee");
    
    const handleLoginPress = () => {
        navigate("/")
    }

    const handleSignupPress = () => {
        navigate("/signup");
    }

    return(
        <div className="onboarding-container">
            <img src={sideImage} className="onboarding-img-container" />

            <div className="onboarding-main">
                <img src={logo} />
                <p>
                    Don't have an account? <span onClick={handleSignupPress}>Create one.</span>
                </p>

                <div className="switch-bar">
                    <p
                        onClick={() => setUserType("attendee")}
                        className={userType == "attendee" ? "active" : ""}
                    >
                        Attendee
                    </p>

                    <p 
                        onClick={() => setUserType("organizer")}
                        className={userType == "organizer" ? "active" : ""}
                    >
                        Organizer
                    </p>
                </div>

                {userType == "attendee" && (
                    <div className="form-container">
                        <input type="email" name="attendeeEmail" placeholder="Email Address/Username" required/>
                        <input type="password" name="attendeePassword" placeholder="Password" required/>
                    </div>
                )}
                
                {userType == "organizer" && (
                    <div className="form-container">
                        <input type="email" name="organizerEmail" placeholder="Email Address/Username" required/>
                        <input type="password" name="organizerPassword" placeholder="Password" required/>
                        <input type="password" name="organizerPassword" placeholder="To show diff b/n organizer and attendee" required/>
                    </div>
                )}
                
                <PrimaryButton title={"Login"} onButtonClick={handleLoginPress}/>
            </div>
        </div>
    );
}

export default Login;