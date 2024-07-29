import React, { useEffect, useState } from "react";
import Event from "../../components/(attendee)/event";
import SearchBar from "../../components/(universal)/searchBar";
import { fetchEvents } from "../../utils/fetchEvents";
import { getUserData } from "../../utils/getUserData";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(attendee)/sideBar";

const Home = () => {
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([])

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const localEvents = localStorage.getItem("allEvents");
                const parsedLocalEvents = localEvents ? JSON.parse(localEvents) : [];
                const eventsData = await fetchEvents();

                if (JSON.stringify(eventsData) !== JSON.stringify(parsedLocalEvents)) {
                    setEvents(eventsData);
                    localStorage.setItem("allEvents", JSON.stringify(eventsData));
                    console.log("Events fetched and updated successfully:", eventsData);
                } else {
                    setEvents(parsedLocalEvents);
                    console.log("Events are up-to-date. Using local storage data.", parsedLocalEvents);
                }
            } catch (error) {
                console.log("Error fetching events:", error);
                alert("Oops! Couldn't fetch events.");
            }
        };

        setUser(getUserData()); // Fetch the user data on mount
        fetchEventsData();
    }, []);

    useEffect(() => {
        const now = Date.now();

        const upcoming = events.filter((event) => {
            const date = new Date(event.event_timestamp)
            return date.getTime() > now;
        });

        const past = events.filter((event) => {
            const date = new Date(event.event_timestamp)
            return date.getTime() < now;
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
    }, [events]);

    return (
        <div className="parent-container">
            <Header title={"Home"} />
            <SideBar activePage={"Home"} />
            <div className="page-container">
                <p>Hi there, {user && user.first_name ? user.first_name : "User"}</p>
                <SearchBar />
                
                <div className="home-section">
                    <p className="custom-underline">Events you might like</p>
                    <div className="events-container">
                        {events && events.map(event => (
                            <Event
                                key={event.event_id}
                                id={event.event_id}
                                name={event.title}
                                rate={event.price}
                                timestamp={event.event_timestamp}
                                venue={event.venue}
                                description={event.bio}
                                organizer={event.organizer_name}
                                organizer_logo={event.organizer_logo}
                                categories={event.event_tags}
                                image={event.image}
                                orgID={event.org_id}
                            />
                        ))}
                    </div>
                </div>


                <div className="home-section">
                    <p className="custom-underline">Upcoming Events</p>
                    <div className="events-container">
                        {upcomingEvents.map(event => (
                            <Event
                                key={event.event_id}
                                id={event.event_id}
                                name={event.title}
                                rate={event.price}
                                timestamp={event.event_timestamp}
                                venue={event.venue}
                                description={event.bio}
                                organizer={event.organizer_name}
                                organizer_logo={event.organizer_logo}
                                categories={event.event_tags}
                                image={event.image}
                                orgID={event.org_id}
                            />
                        ))}
                    </div>
                </div>

                <div className="home-section">
                    <p className="custom-underline">Trending Events</p>
                    <div className="events-container">
                        {upcomingEvents.map(event => (
                            <Event
                                key={event.event_id}
                                id={event.event_id}
                                name={event.title}
                                rate={event.price}
                                timestamp={event.event_timestamp}
                                venue={event.venue}
                                description={event.bio}
                                organizer={event.organizer_name}
                                organizer_logo={event.organizer_logo}
                                categories={event.event_tags}
                                image={event.image}
                                orgID={event.org_id}
                            />
                        ))}
                    </div>
                </div>


                <div className="home-section">
                    <p className="custom-underline">Top Organizers</p>
                    <div className="events-container">
                        {upcomingEvents.map(event => (
                            <Event
                                key={event.event_id}
                                id={event.event_id}
                                name={event.title}
                                rate={event.price}
                                timestamp={event.event_timestamp}
                                venue={event.venue}
                                description={event.bio}
                                organizer={event.organizer_name}
                                organizer_logo={event.organizer_logo}
                                categories={event.event_tags}
                                image={event.image}
                                orgID={event.org_id}
                            />
                        ))}
                    </div>
                </div>

                
                <div className="home-section">
                    <p className="custom-underline">Past Events</p>
                    <div className="events-container">
                        {pastEvents && pastEvents.map(event => (
                            <Event
                                key={event.event_id}
                                id={event.event_id}
                                name={event.title}
                                rate={event.price}
                                timestamp={event.event_timestamp}
                                venue={event.venue}
                                description={event.bio}
                                organizer={event.organizer_name}
                                organizer_logo={event.organizer_logo}
                                categories={event.event_tags}
                                image={event.image}
                                orgID={event.org_id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
