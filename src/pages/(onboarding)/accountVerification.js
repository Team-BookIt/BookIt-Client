import React from "react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../components/primaryButton";

import logo from "../../assets/logo.png";
import sideImage from "../../assets/onboarding-1.png";



const AccountVerification = () => {
    const navigate = useNavigate();
    
    const handleVerifyPress = () => {
        navigate("/");
    }
    return(
        <div className="onboarding-container">
            <img src={sideImage} className="onboarding-img-container" />

            <div className="onboarding-main">
                <img src={logo} />
                <p>
                    Account Verification.
                </p>

                <div className="verification-text-container">
                    <p>
                        We've sent a verification email to *****@gmail.com.
                    </p>
                    
                    <p>
                        Kindly enter it in the field below.
                    </p>
                </div>


                <div className="form-container">
                    <input type="text" name="verificationCode" placeholder="5-digit code" required/>
                </div>

                <div className="verification-footer">
                    <p>
                        Didn't get the code? <br/> Let us <a href="#">resend</a>
                    </p>
                    
                    <PrimaryButton title={"Verify"} onButtonClick={handleVerifyPress}/>
                </div>
            </div>
        </div>
    );
}

export default AccountVerification;