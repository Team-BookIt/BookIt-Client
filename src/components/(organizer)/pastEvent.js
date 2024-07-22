import React from "react";
import { MdPerson, MdAssessment, MdStar, MdMessage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PastEvent = ({
    name, 
    attendees,
    attendanceRate,
    reviews,
    ratings
}) => {
    const navigate = useNavigate();

    const handleEventPress = () => {
        navigate("/eventPage", {
            state: {
                name, 
                attendees,
                attendanceRate,
                reviews,
                ratings
            }
        });
    };

    return (
        <div className="event-container">
            <div className="event-header">
                <img alt="event flyer" />
            </div>
            <div className="event-info-container">
                <p className="event-name" onClick={handleEventPress}>
                    {name}
                </p>
                <div className="event-details">
                    <div className="event-detail">
                        <MdPerson />
                        <p>{attendees} attendees</p>
                    </div>
                    <div className="event-detail">
                        <MdAssessment />
                        <p>{attendanceRate} attendance rate</p>
                    </div>
                    <div className="event-detail">
                        <MdMessage />
                        <p>{reviews} reviews</p>
                    </div>
                    <div className="event-detail">
                        <MdStar />
                        <p>{ratings} rating</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PastEvent;