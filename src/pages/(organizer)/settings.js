import React, { useEffect, useState } from "react";
import { MdCheck, MdDeleteOutline, MdEdit, MdOutlineCameraAlt, MdOutlineLock, MdExitToApp, MdOutlineInfo } from "react-icons/md";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(organizer)/sideBar";
import { useNavigate } from "react-router-dom";
import { getOrganizerData } from "../../utils/getOrganizerData";

import defaultAvatar from "../../assets/default-avatar.png";
import { editOrganizerProfile } from "../../utils/editOrgProfile";

const OrganizerSettings = () => {
    const navigate = useNavigate();
    const [editable, setEditable] = useState(false);
    const [organizerData, setOrganizerData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const organizer = getOrganizerData();
        setOrganizerData(organizer);
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
    };

    const handleDelete = () => {
        setSelectedFile(null);
    };

    const handleEditPress = () => {
        setEditable(true);
    }

    const handleSavePress = async () => {
        setEditable(false);
        await editOrganizerProfile(profile);
    }

    const handleInputChange = (field, value) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            [field]: value
        }))
    }

    const closeEditModal = () => {
        setShowEditModal(false);
    };

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
                                <img src={selectedFile || defaultAvatar} alt="Avatar" className="avatar-image" />
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
                                placeholder={""}
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
                                placeholder={""}
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
                                placeholder={""}
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
                                placeholder={""}
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

                    <div className="pwd-group-heading">
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
                    </div>
                    
                    <div 
                        style={{width: "150px", alignSelf: "center", marginTop: "50px"}} 
                        className="edit-button"
                    >
                        <p>Log out</p>
                        <MdExitToApp size={30} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizerSettings;
