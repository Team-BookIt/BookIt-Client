import React, { useState } from "react";
import { MdUpload } from "react-icons/md";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(organizer)/sideBar";
import EditFieldModal from "../../components/(organizer)/editOrgFieldModal";
import ConfirmationModal from "../../components/(universal)/actionConfirmationModal";
import { useNavigate } from "react-router-dom";

const OrganizerSettings = () => {
    const navigate = useNavigate();

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
                                Kofi Asamoah
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("name", "text", "Kofi Asamoah")}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="settings-field">
                        <div className="settings-field-text">
                            <div className="main-text">
                                Email
                            </div>
                            <div className="sub-text">
                                kasamoah@gmail.com
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("email", "email", "kasamoah@gmail.com")}
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
                                012345678
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("contact", "text", "012345678")}
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
                                Kumasi
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("location", "text", "Kumasi")}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="settings-field">
                        <div className="settings-field-text">
                            <div className="main-text">
                                Website URL
                            </div>
                            <div className="sub-text">
                                www.acesknust.com
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("website", "url", "www.acesknust.com")}
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
                                The Association of Computer Engineering Students of KNUST is
                                a student Association aiming to...
                            </div>
                        </div>
                        <div>
                            <button
                                className="edit-button"
                                onClick={() => handleEditPress("bio", "text", "The Association of Computer Engineering Students of KNUST is a student Association aiming to...")}
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
