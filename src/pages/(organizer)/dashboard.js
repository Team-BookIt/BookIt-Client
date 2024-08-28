// Dashboard.jsx
import React, { useEffect, useState } from "react";
import SideBar from "../../components/(organizer)/sideBar";
import Header from "../../components/(universal)/header";
import SearchBar from "../../components/(universal)/searchBar";
import { MdAddCircleOutline } from "react-icons/md";
import UpcomingEvent from "../../components/(organizer)/upcomingEvent";
import PastEvent from "../../components/(organizer)/pastEvent";
import AddEvent from "../../components/(organizer)/addEvent";
import { getOrganizerProfile } from "../../utils/getOrganizerProfile";
import EventWaitlist from "../../components/(organizer)/eventWaitlist";
import { getOrganizerData } from "../../utils/getOrganizerData";
import noEvents from "../../assets/no-events.png";
import CardSkeleton from "../../components/(universal)/cardLoader";

const Dashboard = () => {
    const [filter, setFilter] = useState("upcoming");
    const [showForm, setShowForm] = useState(false);
    const [organizerEvents, setOrganizerEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [eventDetails, setEventDetails] = useState({});
    const [showWaitlist, setShowWaitlist] = useState(false);
    const [orgID, setOrgID] = useState();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const handleAddEventClick = () => setShowForm(true);

    const handleCloseForm = () => {
        setShowForm(false);
        setShowWaitlist(false);
        setRefresh(!refresh);
    };

    const handlePastClick = () => setFilter("past");
    const handleUpcomingClick = () => setFilter("upcoming");

    const handleUpcomingEventPress = (eventData) => {
        console.log("Individual event details :", eventData);
        setEventDetails(eventData);
        setShowWaitlist(true);
    };

    useEffect(() => {
        const orgData = getOrganizerData();
        setOrgID(Number(orgData.id));
    }, []);

    useEffect(() => {
        const getOrganizerEvents = async () => {
            setLoading(true); // Start loading
            try {
                const organizerProfile = await getOrganizerProfile(orgID);
                if (organizerProfile.organizerEventDetails) {
                    setOrganizerEvents(organizerProfile.organizerEventDetails);
                }
            } catch (error) {
                console.error("Error fetching organizer events:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };
    
        if (orgID) {
            getOrganizerEvents();
        }
    }, [orgID, refresh]);
    
    useEffect(() => {
        const now = Date.now();

        const upcoming = organizerEvents.filter((event) => {
            const date = new Date(event.event_timestamp);
            return date.getTime() > now;
        });

        const past = organizerEvents.filter((event) => {
            const date = new Date(event.event_timestamp);
            return date.getTime() < now;
        });

        setPastEvents(past);
        setUpcomingEvents(upcoming);

        console.log("Past events:", past);
        console.log("Upcoming events:", upcoming);
    }, [organizerEvents]);

    return (
        <div>
            <Header title={"Dashboard"} />
            <SideBar activePage={"Dashboard"} />

            <div className="page-container">
                <p>Details of your events</p>

                <div className="dashboard-header">
                    <SearchBar />
                    <div className="add-event-button" onClick={handleAddEventClick}>
                        <p>Add Event</p>
                        <MdAddCircleOutline size={25} />
                    </div>
                </div>

                <div className="selector-container">
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
                    {loading ? (
                        [1, 2, 3, 4, 5].map((_, index) => <CardSkeleton key={index} />) // Display skeleton loaders
                    ) : (
                        <>
                            {filter === "upcoming" && (
                                upcomingEvents.length === 0 ? (
                                    <div className="no-org-events">
                                        <img src={noEvents} alt="No upcoming events" />
                                    </div>
                                ) : (
                                    upcomingEvents.map((event) => (
                                        <UpcomingEvent
                                            key={event.event_id}
                                            name={event.title}
                                            rate={event.price}
                                            timestamp={event.event_timestamp}
                                            venue={event.venue}
                                            categories={["Tech", "Fun", "Party"]}
                                            event_id={event.event_id}
                                            onEventPress={handleUpcomingEventPress}
                                            image={event.image}
                                        />
                                    ))
                                )
                            )}

                            {filter === "past" && (
                                pastEvents.length === 0 ? (
                                    <div className="no-org-events">
                                        <img src={noEvents} alt="No past events" />
                                    </div>
                                ) : (
                                    pastEvents.map((event) => (
                                        <PastEvent
                                            key={event.id}
                                            name={event.title}
                                            attendees={30}
                                            attendanceRate={"65%"}
                                            reviews={67}
                                            ratings={3.2}
                                            image={event.image}
                                        />
                                    ))
                                )
                            )}
                        </>
                    )}
                </div>

                
                {showForm && (
                    <div className="modal-overlay" onClick={handleCloseForm}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <AddEvent organizerID={orgID} onSuccess={handleCloseForm}  />
                        </div>
                    </div>
                )}
    
                {showWaitlist && (
                    <div className="modal-overlay" onClick={handleCloseForm}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <EventWaitlist onClose={setShowWaitlist} title={eventDetails.title} id={eventDetails.id} key={eventDetails.id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
