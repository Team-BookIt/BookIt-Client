import React, { useEffect, useState } from "react";
import { MdCheck, MdDeleteOutline, MdEdit, MdOutlineCameraAlt, MdExitToApp, MdOutlineInfo } from "react-icons/md";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(organizer)/sideBar";
import { useNavigate } from "react-router-dom";
import { getOrganizerData } from "../../utils/getOrganizerData";
import axios from "axios";

import defaultAvatar from "../../assets/default-avatar.png";
import { editOrganizerProfile } from "../../utils/editOrgProfile";
import ConfirmationModal from "../../components/(universal)/actionConfirmationModal";

const OrganizerSettings = () => {
    const navigate = useNavigate();
    const [editable, setEditable] = useState(false);
    const [organizerData, setOrganizerData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [profile, setProfile] = useState({
        name: organizerData.name || "",
        contact: organizerData.contact || "",
        email: organizerData.email || "",
        location: organizerData.location || "",
        bio: organizerData.bio || "",
        website: organizerData.website || "",
        logo: organizerData.logo || ""
    });
    const [logo, setLogo] = useState(organizerData.logo || "");

    const presetKey = "bookit";
    const cloudName = "dmht0mpfq";

    const uploadImage = async (e) => {
        setSelectedFile(URL.createObjectURL(e.target.files[0]));
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
            setLogo(imageUrl);
            setProfile(prevProfile => ({
                ...prevProfile,
                logo: imageUrl
            }));
        } catch (err) {
            console.log("Error uploading image:", err);
        }
    };

    useEffect(() => {
        const organizer = getOrganizerData();
        setOrganizerData(organizer);
    }, []);

    // const handleFileChange = (event) => {
    //     setSelectedFile(URL.createObjectURL(event.target.files[0]));
    // };

    const handleDelete = () => {
        setSelectedFile(null);
    };

    const handleEditPress = () => {
        setEditable(true);
        console.log("Organizer:", organizerData);
    }

    const handleSavePress = async () => {
        setEditable(false);
        await editOrganizerProfile(profile);
        console.log("Profile:", profile);
    }

    const handleInputChange = (field, value) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            [field]: value
        }))
    }

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

    return (
        <div>
            <Header title={"Settings"} />
            <SideBar activePage={"Settings"} />

            <div className="page-container">
            <div className="settings-container">
                    {/* edits start */}
                    <div className="settings-header">
                        <div className="avatar-upload-container">
                            <div className="avatar-wrapper">
                                <img src={selectedFile || logo || defaultAvatar} alt="Avatar" className="avatar-image" />
                                {editable && (
                                    <div>
                                        <label htmlFor="file-input" className="camera-icon-wrapper">
                                            <MdOutlineCameraAlt className="camera-icon" />
                                        </label>
                                        <input id="file-input" accept="image/*" type="file" onChange={uploadImage} style={{ display: 'none' }} />
                                    </div>
                                )}
                            </div>

                            {editable && selectedFile && (                                
                                <div className="delete-button-container" onClick={handleDelete}>
                                    <button className="delete-button">Delete avatar</button>
                                    <MdDeleteOutline size={30} />
                                </div>
                            )}
                        </div>

                        <div>
                            {editable === false ? (
                                <div className="edit-button" onClick={handleEditPress}>
                                    <p>Edit Profile</p>
                                    <MdEdit />
                                </div>
                            ) : (
                                <div className="edit-button" onClick={handleSavePress}>
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
                                Name
                            </label>
                            <input 
                                type="text"
                                placeholder={profile.name}
                                value={profile.name}
                                readOnly={!editable}
                                className="field-input"
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>
                                Email Address
                            </label>
                            <input 
                                type="email"
                                placeholder={profile.email}
                                value={profile.email}
                                readOnly={!editable}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="field-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                Phone Number
                            </label>
                            <input 
                                type="tel"
                                placeholder={profile.contact}
                                value={profile.contact}
                                readOnly={!editable}
                                onChange={(e) => handleInputChange("contact", e.target.value)}
                                className="field-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                Location
                            </label>
                            <input 
                                type="text"
                                placeholder={profile.location}
                                value={profile.location}
                                readOnly={!editable}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                className="field-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                Webiste Address
                            </label>
                            <input 
                                type="website"
                                placeholder={""}
                                value={profile.website}
                                readOnly={!editable}
                                onChange={(e) => handleInputChange("website", e.target.value)}
                                className="field-input"
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                Bio
                            </label>
                            <input 
                                type="text"
                                placeholder={""}
                                value={profile.bio}
                                readOnly={!editable}
                                onChange={(e) => handleInputChange("bio", e.target.value)}
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
            </div>

            {showConfirmationModal && (
                    <ConfirmationModal 
                        message="Are you sure you want to log out?"
                        onYesPress={handleYesPress}
                        onNoPress={handleNoPress}
                    />
                )}
        </div>
    );
};

export default OrganizerSettings;
