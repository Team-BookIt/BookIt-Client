import React from "react";
import { MdLocationOn, MdAlarm } from "react-icons/md";
import { formatTimestamp } from "../../utils/formatTimestamp";
import { useNavigate } from "react-router-dom";

// import image from "../../assets/image-1.png"

const BookedEvent = ({name, venue, timestamp, image, description, organizer, organizer_logo, orgID, categories, id}) => {
    const {date, time, daysLeft, isEnded} = formatTimestamp(timestamp);

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
                booked: true,
                isEnded,
                id
            }
        })
    };

    
    return (
        <div className="booked-event-container">
            <div className="image-container">
                <img src={image} alt="event flyer"/>
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