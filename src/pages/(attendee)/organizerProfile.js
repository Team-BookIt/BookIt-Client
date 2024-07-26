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

const OrganizerProfile = () => {
    const location = useLocation();
    const [filter, setFilter] = useState("all");
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
    }, [organizerEvents, orgID])
    return(
        <div className="parent-container">
            <Header title={`${organizer} - Profile`} />
            <SideBar onPageChange={() => {}} />
            
            <div className="event-page">
                <div className="organizer-profile-header">
                    <div>
                        <img src={organizer_logo} alt="profile"/>
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
                            {filter === "all" && organizerEvents.map((event) => (
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
                            ))}

                            {filter === "past" && pastEvents.map((event) => (
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
                            ))}

                            {filter === "upcoming" && upcomingEvents.map((event) => (
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizerProfile;