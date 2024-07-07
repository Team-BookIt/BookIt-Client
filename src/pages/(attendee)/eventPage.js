import React from "react";
import { useLocation } from "react-router-dom";
import {
    MdAccessTime, 
    MdLocationOn, 
    MdCalendarMonth, 
    MdMoney, 
    MdEmail, 
    MdLanguage, 
    MdPhone,
    MdPerson
} from "react-icons/md";
import Header from "../../components/(attendee)/header";
import SideBar from "../../components/(universal)/sideBar";
import PrimaryButton from "../../components/primaryButton";


const EventPage = () => {
    const location = useLocation();
    const {
        name,
        rate,
        date,
        time,
        venue,
        description,
        organizer,
        organizer_logo,
        categories
    } = location.state || {};

    const handleBookEvent = () => {
        alert("Event booked successfullly");
    };

    return (
        <div className="parent-container">
            <Header title={name} />
            <SideBar onPageChange={() => {}} />
            
            <div className="event-page">
                <div className="event-header">
                    <div className="event-header-overlay">
                        <p>{name}</p>
                    </div>
                </div>

                <div className="event-page-details">
                    <div className="event-details">
                        <div className="event-detail">
                            <MdLocationOn />
                            <p>{venue}</p>
                        </div>
                        <div className="event-detail">
                            <MdMoney />
                            <p>{rate}</p>
                        </div>
                        <div className="event-detail">
                            <MdCalendarMonth />
                            <p>{date}</p>
                        </div>
                        <div className="event-detail">
                            <MdAccessTime />
                            <p>{time}</p>
                        </div>
                    </div>

                    <div>
                        <p className="custom-underline">About {name}</p>
                        <p>{description}</p>
                    </div>

                    <div>
                        <p className="custom-underline">Organizer</p>
                        <div className="event-organizer-container">
                            {organizer_logo === undefined ? (
                                <MdPerson size={130} />
                            ) : (
                                <img src={organizer_logo} alt="organizer-logo" className="organizer-logo" onClick={() => alert(organizer_logo)}/> 
                            )}
                            <div className="event-organizer-details">
                                <p>{organizer.name}</p>
                                <div className="event-organizer-detail">
                                    <MdEmail />
                                    <p>{organizer}</p>
                                </div>
                                <div className="event-organizer-detail">
                                    <MdLanguage />
                                    <p>{organizer}</p>
                                </div>
                                <div className="event-organizer-detail">
                                    <MdPhone />
                                    <p>{organizer}</p>
                                </div>

                                <div>
                                    <button>View Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="categories-container">
                        <p className="custom-underline">Categories</p>
                        <div className="categories">
                            {categories.map((category, index) => {
                                return(
                                    <p key={index}>{category}</p>
                                )
                            })}
                        </div>
                    </div>

                    <div>
                        <PrimaryButton title={"Book It"} onButtonClick={handleBookEvent} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventPage;