import React from "react";
import { MdLocationOn, MdAlarm } from "react-icons/md";
import { formatTimestamp } from "../../utils/formatTimestamp";

// import image from "../../assets/image-1.png"

const BookedEvent = ({name, venue, timestamp, image}) => {
    const {daysLeft} = formatTimestamp(timestamp)
    return (
        <div className="booked-event-container">
            <div className="image-container">
                <img src={image} alt="event flyer"/>
            </div>

            <div className="booked-event-details-container">
                <p className="event-name">{name}</p>
                
                <div className="event-details">
                    <div className="event-detail">
                        <MdLocationOn />
                        <p>{venue}</p>
                    </div>
                    
                    <div className="event-detail">
                        <MdAlarm />
                        <p>{daysLeft !== "Past" ? `${daysLeft} days left`: "Event ended"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookedEvent;