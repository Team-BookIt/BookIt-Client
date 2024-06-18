import React, { useState } from "react";

import PrimaryButton from "../components/landing page/primaryButton";

import logo from "../assets/logo.png";
import sideImage from "../assets/onboarding-1.png";

const handleLoginPress = () => {
    console.log("Login button pressed!");
}


const Login = () => {
    const [userType, setUserType] = useState("attendee");

    return(
        <div className="onboarding-container">
            <img src={sideImage} className="onboarding-img-container" />

            <div className="onboarding-main">
                <img src={logo} />
                <p>
                    Don't have an account? <a href="#">Create one.</a>
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