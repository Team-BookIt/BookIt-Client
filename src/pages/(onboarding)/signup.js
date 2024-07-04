import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PrimaryButton from "../../components/primaryButton";

import logo from "../../assets/logo.png";
import sideImage from "../../assets/onboarding-2.png";


const Signup = () => {
    const navigate = useNavigate();
    const backendRoute = "https://book-it-server-sigma.vercel.app/";

    // to keep track of which type of user is signing up: attendee or organizer
    const [userType, setUserType] = useState("attendee"); 

    // to keep the content of the attendee signup form
    const [attendeeDetails, setAttendeeDetails] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    // to keep the content of the organizer signup form
    const [organizerDetails, setOrganizerDetails] = useState({
        name: "",
        email: "",
        password: ""
    });

    // to keep the second password input for confirmation
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleAttendeeInputChange = (event) => {
        const { name, value } = event.target;
        setAttendeeDetails({
            ...attendeeDetails,
            [name]: value
        });
    };

    const handleOrganizerInputChange = (event) => {
        const { name, value } = event.target;
        setOrganizerDetails({
            ...organizerDetails,
            [name]: value
        })
    }
    
    const handleAttendeeSignup = async (event) => {
        event.preventDefault();

        // check if both passwords match
        if (attendeeDetails.password === passwordConfirm) {
            try {
                const response = await axios.post(`${backendRoute}auth/user/signup`, attendeeDetails);
                console.log(response.data);
                
                if (response.data.message === "User created successfull") {
                    alert("Signed up successfully!");
                    navigate("/");
                } else {
                    alert(`${response.data.message}`);
                }
            } catch (error) {
                console.log("Error signing attendee up:", error);
            }
        } else {
            alert("Password mismatch!");
        }

    };
    
    const hanldeOrganizerSignup = async (event) => {
        event.preventDefault();
        
        if (organizerDetails.password === passwordConfirm) {
            try {
                const response = await axios.post(`${backendRoute}auth/org/signup`, organizerDetails);
                console.log(response.data);

                if (response.data.message === "Oranizer registered successfull") {
                    alert("Signed up successfully!");
                    navigate("/");
                } else {
                    alert(`${response.data.message}`);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Password mismatch!");
        }
    }
    
    const handleLoginPress = () => {
        navigate("/login");
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

                {userType === "attendee" && (
                    <div className="form-container">
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            name="first_name"
                            value={attendeeDetails.first_name}
                            onChange={handleAttendeeInputChange}
                            required
                        />

                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            name="last_name"
                            value={attendeeDetails.last_name} 
                            onChange={handleAttendeeInputChange}
                            required
                        />

                        <input 
                            type="email" 
                            placeholder="Email Address"
                            name="email" 
                            value={attendeeDetails.email}
                            onChange={handleAttendeeInputChange}
                            required
                        />

                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            value={attendeeDetails.password} 
                            onChange={handleAttendeeInputChange}
                            required
                        />

                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={(event) => setPasswordConfirm(event.target.value)}
                            required
                        />
                    </div>
                )}
                
                {userType === "organizer" && (
                    <div className="form-container">
                        <input 
                            type="text" 
                            placeholder="Company Name" 
                            name="name" 
                            value={organizerDetails.name}
                            onChange={handleOrganizerInputChange}
                            required
                        />
                        
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            name="email" 
                            value={organizerDetails.email}
                            onChange={handleOrganizerInputChange}
                            required
                        />
                        
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            value={organizerDetails.password}
                            onChange={handleOrganizerInputChange}
                            required
                        />

                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            name="passwordConfirm" 
                            value={passwordConfirm}
                            onChange={(event) => setPasswordConfirm(event.target.value)}
                            required
                        />
                    </div>
                )}
                
                <PrimaryButton 
                    title={"Signup"} 
                    onButtonClick={userType === "attendee" ? handleAttendeeSignup : hanldeOrganizerSignup}
                />
            </div>
        </div>
    );
}

export default Signup;