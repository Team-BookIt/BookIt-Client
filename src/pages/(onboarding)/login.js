import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PrimaryButton from "../../components/primaryButton";
import ToastMessage from "../../components/(universal)/toast";
import Loading from "../../components/(universal)/loading";

import logo from "../../assets/logo.png";
import sideImage from "../../assets/onboarding-1.png";



const Login = ({ onSuccess }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState("attendee");
    const [toastType, setToastType] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const backendRoute = `https://book-it-server-sigma.vercel.app/auth/${userType === "attendee" ? "user" : "org"}/login`;

    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => {
        setShowToast(true);
    };

    const handleCloseToast = () => {
        onSuccess();
        setShowToast(false);
    };

    const handleFormValueChange = (event) => {
        const { name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };
    
    const handleLoginPress = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        axios.post(backendRoute, formValues)
            .then(response => {
                console.log("Response", response);
                if (response.data) {
                    if (userType === "attendee" && response.data.user) {
                        console.log("User logged in successfully!", response.data.user);
                        localStorage.setItem("user", JSON.stringify(response.data.user));
                        setToastType("success");
                        setToastMessage("Logged in successfully!");
                        handleShowToast();
                        setTimeout(() => {
                            navigate("/home");
                        }, 2000);
                    } else if (response.data.organizer) {
                        console.log("Organizer logged in successfully!", response.data.organizer);
                        localStorage.setItem("organizer", JSON.stringify(response.data.organizer));
                        setToastType("success");
                        setToastMessage("Logged in successfully!");
                        handleShowToast();
                        setTimeout(() => {
                            navigate("/dashboard");
                        }, 2000);
                    } else {
                        // Handle non-existing email (empty response data)
                        setToastType("error");
                        setToastMessage("Email not found");
                        handleShowToast();
                        console.log("Email not found. Please check and try again.");
                    }
                } else {
                    // Handle non-existing email (empty response data)
                    setToastType("error");
                    setToastMessage("Email not found");
                    handleShowToast();
                    console.log("Email not found. Please check and try again.");
                }
            })
            .catch(error => {
                if (error.response) {
                    setToastType("error");
                    if (error.response.status === 401) {
                        // Handle incorrect password
                        setToastMessage("Incorrect password. Please try again.");
                        handleShowToast();
                        console.log("Incorrect password. Please try again.");
                    } else {
                        // Handle other errors
                        setToastMessage(`${error.response.data.message}`);
                        handleShowToast();
                        console.log("Error logging in:", error.response.data.message);
                    }
                } else {
                    // Handle network errors or other unexpected errors
                    setToastMessage(`${error.message}`);
                    setToastType("error");
                    handleShowToast();
                    console.log("An unexpected error occurred:", error.message);
                }
            })
            .finally(() => {
                setLoading(false);
            })
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
                <PrimaryButton title={loading ? <Loading /> : "Login"} onButtonClick={handleLoginPress}/>
            </div>

            {showToast && (
                <ToastMessage
                    message={toastMessage}
                    type={toastType}
                    onClose={handleCloseToast}
                />
            )}
        </div>
    );
}

export default Login;