import React, { useEffect, useState } from "react";
import {
    MdEmail, 
    MdLanguage, 
    MdPhone,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { getOrganizerProfile } from "../../utils/getOrganizerProfile";

import Header from "../../components/(universal)/header";
import SideBar from "../../components/(attendee)/sideBar";
import Event from "../../components/(attendee)/event"
import defaultAvatar from "../../assets/default-avatar.png";
import noEvents from "../../assets/no-events.png";

const OrganizerProfile = () => {
    const location = useLocation();
    const [filter, setFilter] = useState("all");
    const [organizerProfile, setORganizerProfile] = useState({});
    const [organizerDetails, setOrganizerDetails] = useState({});
    const [organizerEvents, setOrganizerEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const { organizer, organizer_logo, orgID } = location.state || {};

    const handleAllClick = () => setFilter("all");
    const handlePastClick = () => setFilter("past");
    const handleUpcomingClick = () => setFilter("upcoming");

    useEffect(() => {
        const getOrganizerEvents = async () => {
            const organizerProfile = await getOrganizerProfile(orgID);
            console.log("Organizer ID:", orgID)
            setORganizerProfile(organizerProfile);
            setOrganizerDetails(organizerProfile.organizerDetails[0]);
            setOrganizerEvents(organizerProfile.organizerEventDetails);
            console.log("Organizer events:", organizerProfile.organizerEventDetails);
        };

        const now = Date.now();

        const upcoming = organizerEvents.filter(event => {
            const date = new Date(event.event_timestamp);
            return date.getTime() > now;
        })
 
        const past = organizerEvents.filter(event => {
            const date = new Date(event.event_timestamp);
            return date.getTime() < now;
        })

        getOrganizerEvents();
        setPastEvents(past);
        setUpcomingEvents(upcoming);
    }, [organizerEvents, orgID]);

    const renderEvents = (events) => {
        if (events.length === 0) {
            return (
                <div className="no-events-img-container">
                    <img src={noEvents} alt="no-events" className="no-events-img" />
                </div>
            )
        }

        return events.map((event) => (
            <Event
                key={event.id}
                name={event.title}
                rate={20}
                timestamp={event.event_timestamp}
                venue={event.venue}
                description={event.bio}
                categories={["Tech", "Fun", "Party"]}
                id={1} 
                isEnded
            />
        ))
    }

    return(
        <div className="parent-container">
            <Header title={`${organizer} - Profile`} />
            <SideBar onPageChange={() => {}} />
            
            <div className="event-page">
                <div className="organizer-profile-header">
                    <div>
                        <img src={organizer_logo || defaultAvatar} alt="profile"/>
                    </div>

                    <div className="orgnanizer-stats-container">
                        <p className="number">{organizerProfile && (organizerProfile.numberOfEvents || 0)}</p>
                        <p>Events</p>
                    </div>

                    <div className="orgnanizer-stats-container">
                        <p className="number">{organizerProfile && (organizerProfile.averageRatings || 0)}</p>
                        <p>Avg. Rating</p>
                    </div>
                </div>

                <div className="event-page-details">
                    <div>
                        <p className="custom-underline"> About {organizer}</p>
                        <p>{organizerDetails.bio || "Not set"}</p>
                    </div>

                    <div>
                        <p className="custom-underline">Contact Information</p>
                        <div className="event-organizer-details">
                                <div className="event-organizer-detail">
                                    <MdEmail />
                                    <p>{organizerDetails.email || "Not set"}</p>
                                </div>
                                <div className="event-organizer-detail">
                                    <MdLanguage />
                                    <p>{organizerDetails.website || "Not set"}</p>
                                </div>
                                <div className="event-organizer-detail">
                                    <MdPhone />
                                    <p>{organizerDetails.contact || "Not set"}</p>
                                </div>
                            </div>
                    </div>

                    <div>
                        <p className="custom-underline">Events</p>
                        <div className="selector-container">
                            <p 
                                className={filter === "all" && "active-filter"}
                                onClick={handleAllClick}
                            >
                                All
                            </p>

                            <p 
                                className={filter === "upcoming" && "active-filter"}
                                onClick={handleUpcomingClick}
                            >   
                                Upcoming
                            </p>

                            <p 
                                className={filter === "past" && "active-filter"}
                                onClick={handlePastClick}
                            >
                                Past
                            </p>
                        </div>

                        <div className="events-container">
                            {filter === "all" && renderEvents(organizerEvents)}
                            {filter === "upcoming" && renderEvents(upcomingEvents)}
                            {filter === "past" && renderEvents(pastEvents)}                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizerProfile;