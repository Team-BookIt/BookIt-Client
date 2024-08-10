import React, { useEffect, useState } from "react";
import SearchBar from "../../components/(universal)/searchBar";
import BookedEvent from "../../components/(attendee)/bookedEvent";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(attendee)/sideBar";
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
        <div>
            <Header title={"Bookings"} />
            <SideBar activePage={"Bookings"} />
            <div className="page-container">
                <p>Events you've signed up for</p>
                <SearchBar />

                <div className="booked-events-container">
                    {bookedEvents && bookedEvents.map((event) => (
                        <BookedEvent 
                            id={event.event_id} 
                            name={event.title} 
                            venue={event.venue} 
                            timestamp={event.event_timestamp} 
                            image={event.image}
                            description={event.bio}
                            organizer={event.organizer_name}
                            organizer_logo={event.organizer_logo}
                            orgID={event.org_id}
                            categories={event.event_tags}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Bookings;