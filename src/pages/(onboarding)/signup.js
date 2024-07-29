import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PrimaryButton from "../../components/primaryButton";
import ToastMessage from "../../components/(universal)/toast";
import Loading from "../../components/(universal)/loading";

import logo from "../../assets/logo.png";
import sideImage from "../../assets/onboarding-2.png";

const Signup = ({ onSuccess }) => {
    const navigate = useNavigate();
    const backendRoute = process.env.REACT_APP_BOOKIT_BACKEND_URL;

    // to keep track of which type of user is signing up: attendee or organizer
    const [userType, setUserType] = useState("attendee");

    const [loading, setLoading] = useState(false);

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

    const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => {
        setShowToast(true);
    };

    const handleCloseToast = () => {
        onSuccess();
        setShowToast(false);
    };

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
        });
    };

    const handleAttendeeSignup = async (event) => {
        event.preventDefault();
        setLoading(true);

        // check if both passwords match
        if (attendeeDetails.password === passwordConfirm) {
            try {
                const response = await axios.post(`${backendRoute}/auth/user/signup`, attendeeDetails);
                console.log("Response:", response.data);

                if (response.data.message === "User created successfully") {
                    console.log("User info:", response.data.user);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    handleShowToast();
                    setTimeout(() => {
                        navigate("/home");
                    }, 2000);
                } else {
                    alert(`${response.data.message}`);
                }
            } catch (error) {
                console.log("Error signing attendee up:", error);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Password mismatch!");
        }
    };

    const handleOrganizerSignup = async (event) => {
        event.preventDefault();
        setLoading(true)        ;

        if (organizerDetails.password === passwordConfirm) {
            try {
                const response = await axios.post(`${backendRoute}/auth/org/signup`, organizerDetails);
                console.log("Response:", response.data);

                if (response.data.message === "Organizer registered successfully") {
                    console.log("Organizer info:", response.data.organizer[0]);
                    localStorage.setItem("organizer", JSON.stringify(response.data.organizer[0]));
                    handleShowToast();
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 2000);
                } else {
                    alert(`${response.data.message}`);
                }
            } catch (error) {
                console.log("Error signing organizer up:", error);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Password mismatch!");
        }
    };

    const handleLoginPress = () => {
        navigate("/login");
    };

    return (
        <div className="onboarding-container">
            <img src={sideImage} className="onboarding-img-container" alt="people at an event" />

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

                <form onSubmit={userType === "attendee" ? handleAttendeeSignup : handleOrganizerSignup}>
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

                    <p className="terms">
                        Your personal information will not be shared with third-party entities.
                        By signing up, you agree to our <a href="/signup">terms of service</a> and <a href="/signup">privacy policy</a>
                    </p>

                    <PrimaryButton title={loading ? <Loading /> : "Signup"} />
                </form>
            </div>

            {showToast && (
                <ToastMessage
                    message="Signed up successfully!"
                    type="success"
                    onClose={handleCloseToast}
                />
            )}
        </div>
    );
}

export default Signup;
