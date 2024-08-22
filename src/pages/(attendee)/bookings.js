import React, { useEffect, useState } from "react";
import SearchBar from "../../components/(universal)/searchBar";
import BookedEvent from "../../components/(attendee)/bookedEvent";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(attendee)/sideBar";
import BookedEventLoader from "../../components/(universal)/bookedEventLoader";
import { getUserBookedEvents } from "../../utils/getUserBookedEvents";
import noEvents from "../../assets/no-events.png"

const Bookings = () => {
    const [bookedEvents, setBookedEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const getBookings = async () => {
            const bookings = await getUserBookedEvents();
            setBookedEvents(bookings);
            console.log("Booked events:", bookings);
        }

        getBookings();
    }, []);

    const handleSearch = (searchTerm) => {
        const trimmedTerm = searchTerm.trim();
        setSearchTerm(trimmedTerm);

        const lowercasedFilter = trimmedTerm.toLowerCase();
        const filteredData = bookedEvents.filter((event) => {
            return (
                (event.title && event.title.toLowerCase().includes(lowercasedFilter)) ||
                (event.venue && event.venue.toLowerCase().includes(lowercasedFilter)) ||
                (event.bio && event.bio.toLowerCase().includes(lowercasedFilter)) ||
                (event.event_tags && event.event_tags.some(tag => tag && tag.toLowerCase().includes(lowercasedFilter)))
            );
        });
    
        setFilteredEvents(filteredData);
    };

    return (
        <div className="home-container">
            <Header title={"Bookings"} />
            <SideBar activePage={"Bookings"} />
            <div className="page-container">
                <p>Events you've signed up for</p>
                <SearchBar onSearch={handleSearch} />

                <div className="booked-events-container">
                    {!bookedEvents ? (
                        <div className="">
                            <img className="" src={noEvents} />
                        </div>
                    ) : (
                        searchTerm && filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <BookedEvent 
                                    key={event.event_id} 
                                    id={event.event_id} 
                                    name={event.title} 
                                    venue={event.venue} 
                                    timestamp={event.event_timestamp} 
                                    image={event.image}
                                    rate={event.price}
                                    description={event.bio}
                                    organizer={event.organizer_name}
                                    organizer_logo={event.organizer_logo}
                                    orgID={event.org_id}
                                    categories={event.event_tags}
                                />
                            ))
                        ) : (
                            bookedEvents.length > 0 ? (
                                bookedEvents.map((event) => (
                                    <BookedEvent 
                                        key={event.event_id} 
                                        id={event.event_id} 
                                        name={event.title} 
                                        venue={event.venue} 
                                        timestamp={event.event_timestamp} 
                                        image={event.image}
                                        rate={event.price}
                                        description={event.bio}
                                        organizer={event.organizer_name}
                                        organizer_logo={event.organizer_logo}
                                        orgID={event.org_id}
                                        categories={event.event_tags}
                                    />
                                ))
                            ) : (
                                [1, 2, 3, 4, 5, 6, 7, 8].map((index) => <BookedEventLoader key={index} />)
                            )
                        )
                    )}
                </div>

            </div>
        </div>
    );
}

export default Bookings;