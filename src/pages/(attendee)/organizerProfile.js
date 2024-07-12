import React from "react";
import {
    MdEmail, 
    MdLanguage, 
    MdPhone,
} from "react-icons/md";
import { useLocation } from "react-router-dom";

import Header from "../../components/(attendee)/header";
import SideBar from "../../components/(universal)/sideBar";
import Event from "../../components/(attendee)/event"

const OrganizerProfile = () => {
    const location = useLocation();

    const { organizer, organizer_logo } = location.state || {};
    return(
        <div className="parent-container">
            <Header title={`${organizer} - Profile`} />
            <SideBar onPageChange={() => {}} />
            
            <div className="event-page">
                <div className="organizer-profile-header">
                    <div>
                        <img src={organizer_logo} alt="profile-picture"/>
                    </div>

                    <div className="orgnanizer-stats-container">
                        <p className="number">32</p>
                        <p>Events</p>
                    </div>

                    <div className="orgnanizer-stats-container">
                        <p className="number">4.2</p>
                        <p>Avg. Rating</p>
                    </div>
                </div>

                <div className="event-page-details">
                    <div>
                        <p className="custom-underline"> About {organizer}</p>
                        <p>
                            The Association of Computer Engineering Students of KNUST is a student Association aiming to enhance the technological prospects of it's students through engaging seminars, workshops and events.Our motto is “Technology for our age”, emphasizing the main goal of the Association.
                        </p>
                    </div>

                    <div>
                        <p className="custom-underline">Contact Information</p>
                        <div className="event-organizer-details">
                                <p>{organizer.name}</p>
                                <div className="event-organizer-detail">
                                    <MdEmail />
                                    <p>{organizer}</p>
                                </div>
                                <div className="event-organizer-detail">
                                    <MdLanguage />
                                    <p>{organizer}</p>
                                </div>
                                <div className="event-organizer-detail">
                                    <MdPhone />
                                    <p>{organizer}</p>
                                </div>
                            </div>
                    </div>

                    <div>
                        <p className="custom-underline">Events</p>
                        <div className="selector-container">
                            <p>Upcoming</p>
                            <p>Past</p>
                        </div>

                        <div>
                            <Event
                                name={"Code fest"}
                                rate={20}
                                date={10/10/2024}
                                venue={"Kumapley Auditorium"}
                                time={"10:30 AM"}
                                description={"The biggest coding event on campus"}
                                categories={["Tech", "Fun", "Party"]}
                                id={1} 
                                isEnded
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizerProfile;