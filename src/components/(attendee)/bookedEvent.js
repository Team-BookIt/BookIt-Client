import React from "react";
import { MdLocationOn, MdAlarm } from "react-icons/md";
import { formatTimestamp } from "../../utils/formatTimestamp";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../assets/hero-bg.jpg"

// import image from "../../assets/image-1.png"

const BookedEvent = ({
    name, 
    venue, 
    timestamp, 
    image, 
    rate,
    description, 
    organizer, 
    organizer_logo, 
    orgID, 
    categories, 
    id
}) => {
    const {date, time, daysLeft, isEnded} = formatTimestamp(timestamp);
    rate = Number(rate).toFixed(2) !== Number(0).toFixed(2) ? Number(rate).toFixed(2) : "Free";

    const navigate = useNavigate();

    const handleEventPress = () => {
        navigate("/eventPage", {
            state: {
                name,
                date,
                time,
                venue,
                description,
                organizer,
                organizer_logo,
                orgID,
                categories,
                rate,
                booked: true,
                isEnded,
                id
            }
        })
    };

    
    return (
        <div className="booked-event-container">
            <div className="image-container">
                <img src={image || defaultImg} alt="event flyer"/>
            </div>

            <div className="booked-event-details-container">
                <p className="event-name" onClick={handleEventPress}>{name}</p>
                
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