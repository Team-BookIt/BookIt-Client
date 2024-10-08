import React, { useEffect, useState } from "react";
import { MdCheck, MdDeleteOutline, MdEdit, MdOutlineCameraAlt, MdOutlineLock, MdExitToApp, MdOutlineInfo } from "react-icons/md";
import ConfirmationModal from "../../components/(universal)/actionConfirmationModal";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(attendee)/sideBar";
import { useNavigate } from "react-router-dom";
import { editAttendeeProfile } from "../../utils/editAttendeeProfile";
import axios from "axios";

import defaultAvatar from "../../assets/default-avatar.png";
import { getUserData } from "../../utils/getUserData";

const AttendeeSettings = () => {
    const navigate = useNavigate();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState("");
    const [editable, setEditable] = useState(false);
    const [user, setUser] = useState({});

    const [profile, setProfile] = useState({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        image: user.image || ""
    });

    const presetKey = "bookit";
    const cloudName = "dmht0mpfq";

    useEffect(() => {
        const fetchUser = async() => {
            const userData = await getUserData();
            setUser(userData);
        }

        fetchUser();
    }, []);

    const handleLogOutPress = () => {
        setShowConfirmationModal(true);
        localStorage.removeItem("user");
    }

    const handleYesPress = () => {
        console.log("Yes pressed");
        navigate("/login");
    };

    const handleNoPress = () => {
        console.log("No pressed");
        setShowConfirmationModal(false);
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
    
        formData.append("file", file);
        formData.append("upload_preset", presetKey);
        formData.append("cloud_name", cloudName);
    
        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
            const imageUrl = res.data.secure_url;
            console.log("Response:", res);
    
            // Update image state and profile state with the new image URL
            setImage(imageUrl);
            setProfile(prevProfile => ({
                ...prevProfile,
                image: imageUrl
            }));
        } catch (err) {
            console.log("Error uploading image:", err);
        }
    };
    

    const handleFileChange = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
        uploadImage(event);
    };

    const handleDelete = () => {
        setSelectedFile(null);
    };

    const handleEditPress = () => {
        setEditable(!editable);
        console.log("Image:", user.image);
    }

    const handleInputChange = (field, value) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            [field]: value
        }))
    }

    const handleProfileUpdate = async () => {
        console.log("Profile:", profile);
        await editAttendeeProfile(profile);
    }
      
    return (
        <div className="home-container">
            <Header title={"Settings"} profilePic={user.image} />
            <SideBar activePage={"Settings"} />
            <div className="page-container">
                <div className="settings-container">
                    <div className="settings-header">
                        <div className="avatar-upload-container">
                            <div className="avatar-wrapper">
                                <img src={selectedFile || user.image || defaultAvatar} alt="Avatar" className="avatar-image" />
                                {editable && (
                                    <div>
                                        <label htmlFor="file-input" className="camera-icon-wrapper">
                                            <MdOutlineCameraAlt className="camera-icon" />
                                        </label>
                                        <input id="file-input" accept="image/*" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                                    </div>
                                )}
                            </div>

                            {editable && selectedFile && (                                
                                <div className="delete-button-container" onClick={handleDelete}>
                                    <button className="delete-button">Delete avatar</button>
                                    <MdDeleteOutline size={20} color="#fff" />
                                </div>
                            )}
                        </div>

                        <div onClick={handleEditPress}>
                            {editable === false ? (
                                <div className="edit-button">
                                    <p>Edit Profile</p>
                                    <MdEdit />
                                </div>
                            ) : (
                                <div className="edit-button" onClick={handleProfileUpdate}>
                                    <p>Save Changes</p>
                                    <MdCheck />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pwd-group-heading">
                        <p>Basic Info</p>
                        <MdOutlineInfo />
                    </div>

                    <div className="name-group">
                        <div className="input-group">
                            <label>
                                First Name
                            </label>
                            <input 
                                type="text"
                                placeholder={user ? user.first_name : ""}
                                value={profile.first_name}
                                onChange={(e) => handleInputChange("first_name", e.target.value)}
                                readOnly={!editable}
                                className="field-input"
                            />
                        </div>
                        <div className="input-group">
                            <label>
                                Last Name
                            </label>
                            <input 
                                type="text"
                                placeholder={user ? user.last_name : ""}
                                value={profile.last_name}
                                onChange={(e) => handleInputChange("last_name", e.target.value)}
                                readOnly={!editable}
                                className="field-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                Email Address
                            </label>
                            <input 
                                type="email"
                                placeholder={user ? user.email : ""}
                                value={profile.emailAddress}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                readOnly={!editable}
                                className="field-input"
                            />
                        </div>
                    </div>

                    {/* <div className="pwd-group-heading">
                        <p>Change Password</p>
                        <MdOutlineLock />
                    </div>

                    <div className="name-group">
                        <div className="input-group">
                            <label>
                                Current Password
                            </label>
                            <input 
                                type="password"
                                readOnly={!editable}
                                className="field-input"
                            />
                        </div>
                        <div className="input-group">
                            <label>
                                New Password
                            </label>
                            <input 
                                type="password"
                                readOnly={!editable}
                                className="field-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                Confirm New Password
                            </label>
                            <input 
                                type="password"
                                readOnly={!editable}
                                className="field-input"
                            />
                        </div>
                    </div> */}
                    
                    <div 
                        style={{width: "150px", alignSelf: "center", marginTop: "50px"}} 
                        className="edit-button"
                        onClick={handleLogOutPress}
                    >
                        <p>Log out</p>
                        <MdExitToApp size={30} />
                    </div>
                </div>

                {showConfirmationModal && (
                    <ConfirmationModal 
                        message="Are you sure you want to log out?"
                        onYesPress={handleYesPress}
                        onNoPress={handleNoPress}
                    />
                )}
            </div>
        </div>
    );
};

export default AttendeeSettings;
