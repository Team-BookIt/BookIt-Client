import React from "react";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import TeamMember from "./teamMember";

import vince from "../../assets/team-images/Vince.jpg";
import michael from "../../assets/team-images/Michael.jpg";
import baffuoh from "../../assets/team-images/baffuoh.jpg";
import samuel from "../../assets/team-images/Samuel.jpg";
import ivan from "../../assets/team-images/ivan.jpg";
import jason from "../../assets/team-images/jason.jpg";
import vanessa from "../../assets/team-images/vanessa.jpg";
import harriet from "../../assets/team-images/harriet.jpg";


const teamMembers = [
    {name: "Vince Churchill Ankrah", role: "Development Team Lead", picture: vince},
    {name: "Michael Boadi", role: "UI/UX Designer", picture: michael},
    {name: "Agnes Marfo", role: "UI/UX Designer", picture: michael},
    {name: "Precious Baffour Awuah", role: "UI/UX Designer", picture: michael},
    {name: "Baffuoh Asare-Bediako", role: "Frontend Developer", picture: baffuoh},
    {name: "Samuel Osei Agyemang", role: "Frontend Developer", picture: samuel},
    {name: "Hubert Kingsley Ocran", role: "Backend Engineer", picture: michael},
    {name: "Ivan Seyram Ametewee", role: "Backend Engineer", picture: ivan},
    {name: "Harriet Effah", role: "Database Engineer", picture: harriet},
    {name: "Vanessa Ofosu Gyanewaa", role: "Database Engineer", picture: vanessa},
    {name: "Jason Techie Abeiku", role: "Database Engineer", picture: jason},
    {name: "Khalida Mawusene Toporira Ali", role: "Database Engineer", picture: michael},
];


const Team = () => {
    return(
        <section className="team">
            <h2 className="section-heading">Meet the BookIt! Team</h2>

            <div className="team-members">
            {/* <Slider {...settings}> */}
                {teamMembers.map(member => (
                    <TeamMember key={member.name} name={member.name} role={member.role} picture={member.picture} />
                ))}
            {/* </Slider> */}
            </div>
        </section>
    );
};

export default Team;