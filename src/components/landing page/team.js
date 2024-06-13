import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import TeamMember from "./teamMember";

import vince from "../../assets/team-images/Vince.jpg";
import michael from "../../assets/team-images/Michael.jpg";
import baffuoh from "../../assets/team-images/baffuoh.jpg";
import samuel from "../../assets/team-images/Samuel.jpg";


const teamMembers = [
    {name: "Vince Churchill Ankrah", role: "Development Team Lead", picture: vince},
    {name: "Michael Boadi", role: "UI/UX Designer", picture: michael},
    {name: "Agnes Marfo", role: "UI/UX Designer", picture: michael},
    {name: "Precious Baffour Awuah", role: "UI/UX Designer", picture: michael},
    {name: "Baffuoh Asare-Bediako", role: "Frontend Developer", picture: baffuoh},
    {name: "Samuel Osei Agyemang", role: "Frontend Developer", picture: samuel},
    {name: "Hubert Kingsley Ocran", role: "Backend Engineer", picture: michael},
    {name: "Ivan Seyram Ametewee", role: "Backend Engineer", picture: michael},
    {name: "Harriet Effah", role: "Database Engineer", picture: michael},
    {name: "Vanessa Ofosu Gyanewaa", role: "Database Engineer", picture: michael},
    {name: "Jason Techie Abeiku", role: "Database Engineer", picture: michael},
    {name: "Khalida Mawusene Toporira Ali", role: "Database Engineer", picture: michael},
];


const Team = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    
    return(
        <section className="team">
            <h2 className="section-heading">Meet the BookIt! Team</h2>

            
            <Slider {...settings}>
                {teamMembers.map(member => (
                    <TeamMember key={member.name} name={member.name} role={member.role} picture={member.picture} />
                ))}
            </Slider>
        </section>
    );
};

export default Team;