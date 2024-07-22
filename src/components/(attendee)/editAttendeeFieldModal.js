import React, { useState } from "react";
import { editAttendeeProfile } from "../../utils/editAttendeeProfile";
import { MdClose } from "react-icons/md";

const EditFieldModal = ({ field, value, type, onClose }) => {
    const [fieldValue, setFieldValue] = useState(value);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await editAttendeeProfile({ [field]: fieldValue }); 
            onClose(); 
        } catch (error) {
            console.error("Error updating attendee profile:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="edit-field-container">
                    <div className="edit-field-heading">
                        <p>Change {field}</p>
                        <MdClose onClick={onClose}/>
                    </div>
                    <form onSubmit={handleSubmit} className="edit-field-form">
                        <input
                            type={type}
                            value={fieldValue}
                            onChange={(e) => setFieldValue(e.target.value)}
                        />

                        <button type="submit">Update {field}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFieldModal;
