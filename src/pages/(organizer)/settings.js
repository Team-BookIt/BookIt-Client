import React, { useEffect, useState } from "react";
import { MdUpload } from "react-icons/md";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(organizer)/sideBar";
import EditFieldModal from "../../components/(organizer)/editOrgFieldModal";
import ConfirmationModal from "../../components/(universal)/actionConfirmationModal";
import { useNavigate } from "react-router-dom";
import { getOrganizerData } from "../../utils/getOrganizerData";

const OrganizerSettings = () => {
    const navigate = useNavigate();
    const [organizerData, setOrganizerData] = useState({});

    const name = organizerData.name || "Not set";
    const email = organizerData.email || "Not set";
    const contact = organizerData.contact || "Not set";
    const location = organizerData.location || "Not set";
    const website = organizerData.website || "Not set";
    const bio = organizerData.bio || "Not set";

    useEffect(() => {
        const organizer = getOrganizerData();
        setOrganizerData(organizer);
    }, [])

    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [field, setField] = useState("");
    const [type, setType] = useState("");
    const [value, setValue] = useState("");

    const handleEditPress = (field, type, value) => {
        setField(field);
        setValue(value);
        setType(type);
        setShowEditModal(true);
    };

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
                <h1>Your Account</h1>

                {showEditModal && (
                    <EditFieldModal
                        field={field}
                        type={type}
                        value={value}
                        onClose={closeEditModal}
                    />
                )}

                {showConfirmationModal && (
                    <ConfirmationModal 
                        message="Are you sure you want to log out?"
                        onYesPress={handleYesPress}
                        onNoPress={handleNoPress}
                    />
                )}

                <div className="settings-container">
                    <div className="pic-upload">
                        <div className="profile-image">
                            K
                        </div>
                        <div className="settings-field-text">
                            <div className="main-text">
                                Upload your profile photo
                            </div>
                            <div className="sub-text">
                                This will help friends recognize you on BookIt!
                            </div>
                        </div>
                        <div>
                            <label className="edit-button">
                                <input type="file" accept="image/*" />
                                Upload
                                <MdUpload className="upload-icon" />
                            </label>
                        </div>
                    </div>

                    <div className="settings-field">
                        <div className="settings-field-text">
                            <div className="main-text">
                                Name
                            </div>
                            <div className="sub-text">
                                {organizerData && name}
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("name", "text", name)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="settings-field">
                        <div className="settings-field-text">
                            <div className="main-text">
                                Email Address 
                            </div>
                            <div className="sub-text">
                            {organizerData && email}
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("email", "email", email)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="settings-field">
                        <div className="settings-field-text">
                            <div className="main-text">
                                Contact Info
                            </div>
                            <div className="sub-text">
                                {organizerData && contact}
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("contact", "text", contact)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="settings-field">
                        <div className="settings-field-text">
                            <div className="main-text">
                                Location
                            </div>
                            <div className="sub-text">
                                {organizerData && location}
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("location", "text", location)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="settings-field">
                        <div className="settings-field-text">
                            <div className="main-text">
                                Website Address
                            </div>
                            <div className="sub-text">
                                {organizerData && website}
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("website", "url", website)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="settings-field">
                        <div className="settings-field-text">
                            <div className="main-text">
                                Bio
                            </div>
                            <div className="sub-text">
                                {organizerData && bio}
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("bio", "text", bio)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="password">
                        <button className="edit-button" onClick={() => setShowConfirmationModal(true)}>
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizerSettings;
