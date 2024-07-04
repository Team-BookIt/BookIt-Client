import React from "react";
import SearchBar from "../../components/(universal)/searchBar";
import BookedEvent from "../../components/(attendee)/bookedEvent";

const Bookings = () => {
    return (
        <div className="page-container">
            <p>Events you've signed up for</p>
            <SearchBar />

            <div className="events-container">
                <BookedEvent 
                    name={"Codefest"} 
                    venue={"Kumapley Auditorium, KNUST"}
                    daysLeft={"3"}
                />
                <BookedEvent 
                    name={"Codefest"} 
                    venue={"Kumapley Auditorium, KNUST"}
                    daysLeft={"3"}
                />
                <BookedEvent 
                    name={"Codefest"} 
                    venue={"Kumapley Auditorium, KNUST"}
                    daysLeft={"3"}
                />
                <BookedEvent 
                    name={"Codefest"} 
                    venue={"Kumapley Auditorium, KNUST"}
                    daysLeft={"3"}
                />
            </div>
        </div>
    );
}

export default Bookings;