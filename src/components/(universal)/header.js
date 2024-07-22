import React from "react";
import { MdPerson } from "react-icons/md";

const Header = ({ title, profilePic }) => {
    return (
        <div className="attendee-header">
            <p>{title}</p>
            {profilePic ? (<img alt="profile-pic"/>) : <MdPerson size={50} />}
        </div>
    )
}

export default Header;