import React, { useState } from "react";

import PrimaryButton from "../components/landing page/primaryButton";

import logo from "../assets/logo.png";
import sideImage from "../assets/onboarding-2.png";

const handleSignupPress = () => {
    console.log("Login button pressed!");
}


const Signup = () => {
    const [userType, setUserType] = useState("attendee");

    return(
        <div className="onboarding-container">
            <img src={sideImage} className="onboarding-img-container" />

            <div className="onboarding-main">
                <img src={logo} />
                <p>
                    Already have an account? <a href="#">Log in.</a>
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
                
                <PrimaryButton title={"Signup"} onButtonClick={handleSignupPress}/>
            </div>
        </div>
    );
}

export default Signup;