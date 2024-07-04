import React from "react";

const PrimaryButton = ({ title, onButtonClick }) => {
    return(
        <div className="button-container" onClick={onButtonClick}>
            <button type="submit">{title}</button>
        </div>
    );
};

export default PrimaryButton;