import React, { useEffect, useState } from "react";
import Event from "../../components/(attendee)/event";
import SearchBar from "../../components/(universal)/searchBar";
import { fetchEvents } from "../../utils/fetchEvents";
import { getUserData } from "../../utils/getUserData";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({});

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

    return (
        <div className="page-container">
            <p>Hi there, {user && user.first_name ? user.first_name : "User"}</p>
            <SearchBar />

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
    );
}

export default Home;
