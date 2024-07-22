import React from "react";
import PropTypes from "prop-types";

const ConfirmationModal = ({ message, onYesPress, onNoPress }) => {
    return (
        <div className="confirmation-modal-overlay" onClick={onNoPress}>
            <div className="confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="confirmation-modal-header">
                    <div className="confirmation-modal-message">{message}</div>
                </div>
                <div className="confirmation-modal-actions">
                    <button className="confirmation-modal-button confirmation-yes-button" onClick={onYesPress}>
                        Yes
                    </button>
                    <button className="confirmation-modal-button confirmation-no-button" onClick={onNoPress}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

// Define prop types for better code readability and error checking
ConfirmationModal.propTypes = {
    message: PropTypes.string.isRequired,
    icon: PropTypes.element,
    onYesPress: PropTypes.func.isRequired,
    onNoPress: PropTypes.func.isRequired,
};

export default ConfirmationModal;
