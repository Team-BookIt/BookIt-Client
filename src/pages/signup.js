import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../components/landing page/primaryButton";

import logo from "../assets/logo.png";
import sideImage from "../assets/onboarding-2.png";



const Signup = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("attendee");
    
    const handleAttendeeSignup = () => {
        navigate("/")
    }

    const handleLoginPress = () => {
        navigate("/login");
    }

    const hanldeOrganizerSignup = () => {
        navigate("/organizerProfileForm");
    }

    return(
        <div className="onboarding-container">
            <img src={sideImage} className="onboarding-img-container" alt="people at an event"/>

            <div className="onboarding-main">
                <img src={logo} alt="bookit-logo" />
                <p>
                    Already have an account? <span onClick={handleLoginPress}>Log in.</span>
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
                        <input type="text" name="firstName" placeholder="First Name" required/>
                        <input type="text" name="LastName" placeholder="Last Name" required/>
                        <input type="text" name="username" placeholder="Username" required/>
                        <input type="email" name="attendeeEmail" placeholder="Email Address" required/>
                        <input type="password" name="password" placeholder="Password" required/>
                        <input type="password" name="passwordConfirm" placeholder="Confirm Password" required/>
                    </div>
                )}
                
                {userType == "organizer" && (
                    <div className="form-container">
                        <input type="text" name="firstName" placeholder="First Name" required/>
                        <input type="text" name="LastName" placeholder="Last Name" required/>
                        <input type="text" name="username" placeholder="Username" required/>
                        <input type="email" name="attendeeEmail" placeholder="Email Address" required/>
                        <input type="text" name="phoneNum" placeholder="Phone Number" required/>
                        <input type="password" name="password" placeholder="Password" required/>
                        <input type="password" name="passwordConfirm" placeholder="Confirm Password" required/>
                    </div>
                )}
                
                <PrimaryButton 
                    title={"Signup"} 
                    onButtonClick={userType == "attendee" ? handleAttendeeSignup : hanldeOrganizerSignup}
                />
            </div>
        </div>
    );
}

export default Signup;