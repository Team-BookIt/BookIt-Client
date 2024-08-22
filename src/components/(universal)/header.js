import React from "react";
import defaultAvatar from "../../assets/default-avatar.png"
import { useNavigate } from "react-router-dom";

const Header = ({ title, profilePic }) => {
    const navigate = useNavigate();

    const handlePicPress = () => navigate("/attendeeSettings")

    return (
        <div className="attendee-header">
            <p>{title}</p>
            <img 
                src={profilePic ? profilePic : defaultAvatar}
                onClick={handlePicPress}
            />
        </div>
    )
}

export default Header;