// UpcomingEvent.jsx
import React from "react";
import { MdAccessTime, MdLocationOn, MdCalendarMonth, MdMoney, MdPerson } from "react-icons/md";
import { formatTimestamp } from "../../utils/formatTimestamp";

const UpcomingEvent = ({
    name,
    rate,
    timestamp,
    venue,
    description,
    waitlist,
    event_id,
    onEventPress,
    image
}) => {
    const { date, time } = formatTimestamp(timestamp);
    rate = rate !== 0 ? "GHS " + rate.toFixed(2) : "Free";

    const handleEventPress = () => {
        const eventData = {
            title: name,
            id: event_id,
        };
        onEventPress(eventData);
        console.log("Event data:", eventData);
    };

    return (
        <div className="event-container">
            <div className="event-container-header">
                <img src={image} alt="event flyer" />
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
                    <div className="event-detail">
                        <MdPerson />
                        <p>{waitlist} people on waitlist</p>
                    </div>
                </div>

                {/* {categories[0] !== null && (
                    <div className="categories-container">
                        <p>Categories</p>
                        <div className="categories">
                            {categories.map((category, index) => (
                                <p key={index}>{category}</p>
                            ))}
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default UpcomingEvent;
