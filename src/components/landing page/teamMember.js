import React from "react";


const TeamMember = ({ name, role, picture }) => {
    return(
        <div className="team-member-container">
            <img src={picture} alt={`${name}`} className="team-member-img" />
            <h3>{name}</h3>
            <p>{role}</p>
        </div>
    );
};

export default TeamMember;