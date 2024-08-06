// Event.js
import React from "react";
import { MdAccessTime, MdLocationOn, MdCalendarMonth } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../utils/formatTimestamp";
import defaultImg from "../../assets/hero-bg.jpg"

const Event = ({
    name, 
    timestamp, 
    venue, 
    description, 
    organizer, 
    organizer_logo, 
    categories, 
    id, 
    image,
    orgID,
    booked
}) => {
    const navigate = useNavigate();

    const {date, time, isEnded} = formatTimestamp(timestamp);

    const handleEventPress = () => {
        console.log("Event booked?", booked);
        navigate("/eventPage", {
            state: {
                id,
                name,
                date,
                time,
                venue,
                description,
                organizer,
                organizer_logo,
                categories,
                isEnded,
                orgID,
                booked
            }
        });
    };
    

    return (
        <div className="event-container">
            <div className="event-header">
                <img src={image && image !== "" && Object.keys(image).length !== "" ? image : defaultImg} alt="event flyer" />
            </div>
            <div className="event-info-container">
                <p className="event-name" onClick={handleEventPress}>
                    {name}
                </p>
                <p className="event-description">{description}</p>
                <div className="event-details">
                    <div className="event-detail">
                        <MdAccessTime />
                        <p>{time}</p>
                    </div>
                    <div className="event-detail">
                        <MdLocationOn />
                        <p>{venue}</p>
                    </div>
                    <div className="event-detail">
                        <MdCalendarMonth />
                        <p>{date}</p>
                    </div>
                </div>
                
                {categories[0] !== null && (
                    <div className="categories-container">
                        <p>Categories</p>
                        <div className="categories">
                            {categories.map((category, index) => (
                                <p key={index}>{category}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Event;