// Event.js
import React from "react";
import { MdAccessTime, MdLocationOn, MdCalendarMonth, MdMoney } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Event = ({
    name, 
    rate,
    date, 
    time, 
    venue, 
    description, 
    organizer, 
    organizer_logo, 
    categories, 
    id, 
    isEnded
}) => {
    const navigate = useNavigate();

    rate = rate !== 0 ? "GHS " + rate.toFixed(2) : "Free";

    const handleEventPress = () => {
        navigate("/eventPage", {
            state: {
                id,
                name,
                rate,
                date,
                time,
                venue,
                description,
                organizer,
                organizer_logo,
                categories,
                isEnded
            }
        });
    };

    return (
        <div className="event-container">
            <div className="event-header">
                <img alt="event header image" />
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
                    <div className="event-detail">
                        <MdMoney />
                        <p>{rate}</p>
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