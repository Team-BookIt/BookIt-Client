import React from "react";

const Header = ({ title }) => {
    return (
        <div className="attendee-header">
            <p>{title}</p>
            <img alt="profile-pic"/>
        </div>
    )
}

export default Header;