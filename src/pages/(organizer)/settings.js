import React from "react";

const OrganizerSettings = () => {
    return (
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
                        <button className="edit-button">
                            Upload
                            <FaUpload  className="upload-icon"/>
                        </button>
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
                        <button className="edit-button">
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
                        <button className="edit-button">
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
                        <button className="edit-button">
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
                        <button className="edit-button">
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
                        <button className="edit-button">
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
                        <button className="edit-button">
                            Edit
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrganizerSettings;