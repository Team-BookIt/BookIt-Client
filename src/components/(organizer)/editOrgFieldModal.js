import React, { useState } from "react";
import { editOrganizerProfile } from "../../utils/editOrgProfile";
import { MdClose } from "react-icons/md";
import Loading from "../(universal)/loading";

const EditFieldModal = ({ field, value, type, onClose }) => {
    const [fieldValue, setFieldValue] = useState(value);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        try {
            await editOrganizerProfile({ [field]: fieldValue }); 
            onClose(); 
        } catch (error) {
            console.error("Error updating organizer profile:", error);
        } finally {
            setLoading(false);
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

                        <button type="submit">{loading ? <Loading /> : `Update ${field}`}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFieldModal;
