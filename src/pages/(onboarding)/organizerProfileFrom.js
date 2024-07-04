import React from "react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../components/primaryButton";

import logo from "../../assets/logo.png";
import sideImage from "../../assets/onboarding-1.png";



const OrganizerProfileForm = () => {
    const navigate = useNavigate();
    
    const handleNextPress = () => {
        navigate("/accountVerification")
    }

    return(
        <div className="onboarding-container">
            <img src={sideImage} className="onboarding-img-container" />

            <div className="onboarding-main">
                <img src={logo} />
                <p>
                    Organizer Profile Completion.
                </p>


                <div className="form-container">
                    <input type="text" name="companyName" placeholder="Company/Organizer Name" required/>
                    <input type="text" name="companyWebsite" placeholder="Company website link" required/>
                    <input type="email" name="companyEmail" placeholder="Company email address" required/>
                    <input type="text" name="companyDescription" placeholder="Tell us a bit about the company..." required/>
                    <input type="text" name="companyLogo" placeholder="Upload company logo" required/>
                </div>
                
                <PrimaryButton title={"Next"} onButtonClick={handleNextPress}/>
            </div>
        </div>
    );
}

export default OrganizerProfileForm;