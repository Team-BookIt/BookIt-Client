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
                // Fetch events from local storage
                const localEvents = localStorage.getItem("allEvents");
                
                // Parse local events if they exist
                const parsedLocalEvents = localEvents ? JSON.parse(localEvents) : [];

                // Fetch events from backend
                const eventsData = await fetchEvents();

                // Compare backend events with local events
                if (JSON.stringify(eventsData) !== JSON.stringify(parsedLocalEvents)) {
                    // Events are different, update state and local storage
                    setEvents(eventsData);
                    localStorage.setItem("allEvents", JSON.stringify(eventsData));
                    console.log("Events fetched and updated successfully:", eventsData);
                } else {
                    // Events are the same, use local storage data
                    setEvents(parsedLocalEvents);
                    console.log("Events are up-to-date. Using local storage data.");
                }
            } catch (error) {
                console.log("Error fetching events:", error);
                alert("Oops! Couldn't fetch events.");
            }
        };

        setUser(getUserData());
        fetchEventsData();
    }, []);

    return(
        <div className="page-container">
            <p>Hi there, {user ? user.first_name : "User"}</p>
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
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;