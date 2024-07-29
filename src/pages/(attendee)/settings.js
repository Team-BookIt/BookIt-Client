import React, { useState } from "react";
import { MdUpload } from "react-icons/md";
import EditFieldModal from "../../components/(attendee)/editAttendeeFieldModal"; 
import ConfirmationModal from "../../components/(universal)/actionConfirmationModal";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(attendee)/sideBar";
import { useNavigate } from "react-router-dom";

const AttendeeSettings = () => {
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [currentField, setCurrentField] = useState("");
    const [currentValue, setCurrentValue] = useState("");
    const [inputType, setInputType] = useState("");

    const handleEditPress = (field, value, type) => {
        setCurrentField(field);
        setCurrentValue(value);
        setInputType(type);
        setShowEditModal(true);
    };

    const closeModal = () => {
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
                                onClick={() => handleEditPress("name", "Kofi Asamoah", "text")}
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
                                onClick={() => handleEditPress("email", "kasamoah@gmail.com", "email")}
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

                {/* Render EditFieldModal when showEditModal is true */}
                {showEditModal && (
                    <EditFieldModal
                        field={currentField}
                        value={currentValue}
                        type={inputType}
                        onClose={closeModal}
                    />
                )}

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
