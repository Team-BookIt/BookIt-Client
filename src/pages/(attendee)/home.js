import React, { useEffect, useState } from "react";
import Event from "../../components/(attendee)/event";
import SearchBar from "../../components/(universal)/searchBar";
import { fetchEvents } from "../../utils/fetchEvents";
import { getUserData } from "../../utils/getUserData";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(attendee)/sideBar";
import { getUserBookedEvents } from "../../utils/getUserBookedEvents";
import CardSkeleton from "../../components/(universal)/cardLoader";
import noEvents from "../../assets/no-events.png"

const Home = () => {
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [interestedEvents, setInterestedEvents] = useState([]);
    const [bookedEvents, setBookedEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const localEvents = localStorage.getItem("allEvents");
                const parsedLocalEvents = localEvents ? JSON.parse(localEvents) : [];
                const eventsData = await fetchEvents();
                console.log("All events:", eventsData);

                if (JSON.stringify(eventsData) !== JSON.stringify(parsedLocalEvents)) {
                    setEvents(eventsData);
                    localStorage.setItem("allEvents", JSON.stringify(eventsData));
                } else {
                    setEvents(parsedLocalEvents);
                }
            } catch (error) {
                console.log("Error fetching events:", error);
            }
        };
        
        const getUser = async() => {
            setUser(await getUserData()); // Fetch the user data on mount
        };
        
        getUser();
        fetchEventsData();
    }, []);

    useEffect(() => {
        const now = Date.now();

        const upcoming = events.filter((event) => {
            const date = new Date(event.event_timestamp);
            return date.getTime() > now;
        });

        const past = events.filter((event) => {
            const date = new Date(event.event_timestamp);
            return date.getTime() < now;
        });

        const interested = upcomingEvents.filter((event) => {
            const tags = event.event_tags || [];
            const interests = user.interests || [];
            return (interests.length !==0 ? tags.some(tag => interests.includes(tag)) : []);
        });

        setInterestedEvents(interested);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
    }, [events, upcomingEvents]);

    useEffect(() => {
        const getBookedEvents = async () => {
            try {
                const response = await getUserBookedEvents();
                setBookedEvents(response);
            } catch (error) {
                console.error("Error fetching booked events:", error);
                setBookedEvents([]);
            }
        };

        getBookedEvents();
    }, []);

    
    const handleSearch = (searchTerm) => {
        const trimmedTerm = searchTerm.trim();
        setSearchTerm(trimmedTerm);

        const lowercasedFilter = trimmedTerm.toLowerCase();
        const filteredData = events.filter((event) => {
            return (
                (event.title && event.title.toLowerCase().includes(lowercasedFilter)) ||
                (event.venue && event.venue.toLowerCase().includes(lowercasedFilter)) ||
                (event.bio && event.bio.toLowerCase().includes(lowercasedFilter)) ||
                (event.event_tags && event.event_tags.some(tag => tag && tag.toLowerCase().includes(lowercasedFilter)))
            );
        });
    
        setFilteredEvents(filteredData);
    };
    

    const isBooked = (eventID) => {
        return Array.isArray(bookedEvents) && bookedEvents.some(event => event.event_id === eventID);
    };

    return (
        <div className="parent-container">
            <Header title={"Home"} />
            <SideBar activePage={"Home"} />
            <div className="page-container">
                <p>Hi there, {user && user.first_name ? user.first_name : "User"}</p>
                <SearchBar onSearch={handleSearch} />

                {searchTerm && (
                    <div className="home-section">
                        <p className="custom-underline">Search results</p>
                        <div className="events-container">
                            {filteredEvents.length !== 0 ? filteredEvents.map(event => (
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
                                    booked={isBooked(event.event_id)}
                                />
                            )) : (
                                <div className="empty-search">
                                    <img src={noEvents} />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                
                <div className="home-section">
                    <p className="custom-underline">Events you might like</p>
                    <div className="events-container">
                        {interestedEvents !== 0 ? interestedEvents.map(event => (
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
                                    booked={isBooked(event.event_id)}
                                />
                        )) : (
                            [1, 2, 3, 4].map((index) => <CardSkeleton key={index} />)
                        )}
                    </div>
                </div>


                <div className="home-section">
                    <p className="custom-underline">Upcoming Events</p>
                    <div className="events-container">
                        {upcomingEvents.length !== 0 ? upcomingEvents.map(event => (
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
                                booked={isBooked(event.event_id)}
                            />
                        )) : (
                            [1, 2, 3, 4].map((index) => <CardSkeleton key={index} />)
                        )}
                    </div>
                </div>

                
                <div className="home-section">
                    <p className="custom-underline">Past Events</p>
                    <div className="events-container">
                        {pastEvents.length !== 0 ? pastEvents.map(event => (
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
                                booked={isBooked(event.event_id)}
                            />
                        )) : (
                            [1, 2, 3, 4].map((index) => <CardSkeleton key={index} />)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
