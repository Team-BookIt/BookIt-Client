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
                const eventsData = await fetchEvents();
                setEvents(eventsData);
                // Save events data to localStorage
                localStorage.setItem('eventsData', JSON.stringify(eventsData));
            } catch (error) {
                console.log("Error fetching events:", error);
                alert("Oops! Couldn't fetch events.");
            };
        };

        setUser(getUserData);

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