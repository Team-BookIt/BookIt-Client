import React, { useEffect } from "react";
import PropTypes from "prop-types";

const ToastMessage = ({ message, type, duration, onClose }) => {
    // Automatically close the toast after the specified duration
    useEffect(() => {
        const timer = setTimeout(() => {
        	onClose();
    	}, duration);

    	// Clear the timer if the component unmounts before the timeout
    	return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
		<div className={`toast-message toast-${type}`}>
			<span className="toast-message-text">{message}</span>
		</div>
    );
};

ToastMessage.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.oneOf(["success", "error", "info", "warning"]).isRequired,
	duration: PropTypes.number,
	onClose: PropTypes.func.isRequired,
};

ToastMessage.defaultProps = {
  	duration: 3000,
};

export default ToastMessage;
