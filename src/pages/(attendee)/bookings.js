import React, { useEffect, useState } from "react";
import SearchBar from "../../components/(universal)/searchBar";
import BookedEvent from "../../components/(attendee)/bookedEvent";
import { getUserBookedEvents } from "../../utils/getUserBookedEvents";

const Bookings = () => {
    const [bookedEvents, setBookedEvents] = useState({});

    useEffect(() => {
        setBookedEvents(getUserBookedEvents);
    }, [])
    return (
        <div className="page-container">
            <p>Events you've signed up for</p>
            <SearchBar />

            <div className="events-container">
                {bookedEvents && bookedEvents.map(() => (
                    <BookedEvent />
                ))}
            </div>
        </div>
    );
}

export default Bookings;