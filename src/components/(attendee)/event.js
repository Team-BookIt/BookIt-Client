import React from "react";
import { MdAccessTime, MdLocationOn, MdCalendarMonth, MdMoney } from "react-icons/md";

import logo from "../../assets/sec-logo-1.png"
const Event = ({name, rate, date, time, venue, description, organizer, categories}) => {
    const handleSeeMorePress = () => {
        alert("See more!")
    }
    return(
        <div className="event-container">
            <div className="event-header">
                <img alt="event header image" />
            </div>

            <div className="event-info-container">
                <p className="event-name">{name}</p>
{/* 
                <div className="event-organizer-details">
                    <img src={logo} alt="organizer logo"/>
                    <p>{organizer}</p>
                </div> */}

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



                <div className="categories-container">
                    <p>Categories</p>
                    <div className="categories">
                        {categories.map((category, index) => {
                            return(
                                <p key={index}>{category}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event;