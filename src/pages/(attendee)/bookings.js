import React, { useEffect, useState } from "react";
import SearchBar from "../../components/(universal)/searchBar";
import BookedEvent from "../../components/(attendee)/bookedEvent";
import { getUserBookedEvents } from "../../utils/getUserBookedEvents";

const Bookings = () => {
    const [bookedEvents, setBookedEvents] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            const bookings = await getUserBookedEvents();
            setBookedEvents(bookings);
            console.log("Booked events:", bookings);
        }

        getBookings();
    }, [])

    return (
        <div className="page-container">
            <p>Events you've signed up for</p>
            <SearchBar />

            <div className="events-container">
                {bookedEvents && bookedEvents.map((event) => (
                    <BookedEvent 
                        key={event.event_id} 
                        name={event.title} 
                        venue={event.venue} 
                        timestamp={event.event_timestamp} 
                        image={event.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default Bookings;