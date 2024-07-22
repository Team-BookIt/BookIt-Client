import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PrimaryButton from "../../components/primaryButton";

import logo from "../../assets/logo.png";
import sideImage from "../../assets/onboarding-1.png";



const Login = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("attendee");
    const backendRoute = `https://book-it-server-sigma.vercel.app/auth/${userType === "attendee" ? "user" : "org"}/login`;

    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const handleFormValueChange = (event) => {
        const { name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    
    const handleLoginPress = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(backendRoute, formValues);
            // if (userType === "attendee") {
            //     localStorage.setItem("userData", JSON.stringify(response.data.user[0]));
            //     console.log(response.data.user[0]);
            // }
            console.log("Response:", response.data.organizer);
            userType === "attendee" ? navigate("/mainPage") : navigate("/dashboard");
            alert("Login successful");
        } catch (error) {
            console.log("Error logging in:", error);
        }
    }

    const handleSignupPress = () => {
        navigate("/signup");
    }

    return(
        <div className="onboarding-container">
            <img src={sideImage} className="onboarding-img-container" alt="people toasting at an event" />

            <div className="onboarding-main">
                <img src={logo} alt="bookit logo" />
                <p>
                    Don't have an account? <span onClick={handleSignupPress}>Create one.</span>
                </p>

                <div className="switch-bar">
                    <p
                        onClick={() => setUserType("attendee")}
                        className={userType === "attendee" ? "active" : ""}
                    >
                        Attendee
                    </p>

                    <p 
                        onClick={() => setUserType("organizer")}
                        className={userType === "organizer" ? "active" : ""}
                    >
                        Organizer
                    </p>
                </div>

                <div className="form-container">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={formValues.email}
                        onChange={handleFormValueChange}
                        required
                    />

                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        value={formValues.password} 
                        onChange={handleFormValueChange}
                        required
                    />
                </div>                
                <PrimaryButton title={"Login"} onButtonClick={handleLoginPress}/>
            </div>
        </div>
    );
}

export default Login;