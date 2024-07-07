import React, { useEffect, useState } from "react";
import Event from "../../components/(attendee)/event";
import SearchBar from "../../components/(universal)/searchBar";
import { fetchEvents } from "../../utils/fetchEvents";

const Home = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const eventsData = await fetchEvents();
                setEvents(eventsData);
                // Save events data to localStorage
                localStorage.setItem('eventsData', JSON.stringify(eventsData));
            } catch (error) {
                console.log("Error fetching events:", error);
                alert("Oops! Couldn't fetch events.");
            };
        };

        // Check if events data exists in localStorage
        const cachedEvents = JSON.parse(localStorage.getItem('eventsData'));
        if (cachedEvents) {
            setEvents(cachedEvents);
        } else {
            fetchEventsData();
        }
    }, []);

    return(
        <div className="page-container">
            <p>Hi there, User</p>
            <SearchBar />

            <div className="events-container">
                {events.map(event => (
                    <Event 
                        key={event.event_id}
                        name={event.title}
                        rate={event.price}
                        date={event.event_timestamp}
                        time={event.event_timestamp} 
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