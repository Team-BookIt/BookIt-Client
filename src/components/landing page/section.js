import React from "react";

import img1 from "../../assets/image-1.png"
import attendees from "../../assets/attendees.png"
import organiser from "../../assets/organiser.png"

const Section = () => {
    return(
        <section>
            {/* what is bookit */}
            <div className="section">
                <img alt="An event setting" src={img1} className="section-img"/>

                <div className="section-text-container">
                    <h1 className="section-heading">What is BookIt!?</h1>
                    <p>
                        BookIt! is the ultimate event platform designed to bring organizers and attendees together seamlessly. 
                    </p>
                    <p>
                        Whether you're planning a large conference, a local workshop, or an intimate meetup, BookIt! has everything you need to make your event a success.
                    </p>        
                </div>
            </div>

            {/* bookit for organisers */}
            <div className="section">
                <div className="section-text-container">
                    <h1 className="section-heading">BookIt! for Organizers</h1>
                    <ul>
                        <li>Create detailed event listings</li>
                        <li>Set up ticketing options</li>
                        <li>Track registrations</li>
                        <li>Register Attendees</li>
                    </ul>
                    <p>
                        Our platform is designed to save you time and effort, so you can focus on delivering an outstanding experience.
                    </p>        
                </div>

                <img alt="People at an event" src={organiser} className="section-img"/>
            </div>

            {/* bookit for attendees */}
            <div className="section">
                <img alt="An event organizer" src={attendees} className="section-img"/>

                <div className="section-text-container">
                    <h1 className="section-heading">BookIt! for Attendees</h1>
                    <p>
                        Discover a world of events that match your interests on BookIt!.
                    </p>
                    <p>
                        From professional conferences to casual gatherings, our platform makes it easy to find and register for events that inspire you.
                    </p>        
                </div>
            </div>
        </section>
    )
};

export default Section;