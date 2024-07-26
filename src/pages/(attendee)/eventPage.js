import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    MdAccessTime, 
    MdLocationOn, 
    MdCalendarMonth, 
    MdEmail, 
    MdLanguage, 
    MdPhone,
    MdPerson,
    MdChat
} from "react-icons/md";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(attendee)/sideBar";
import PrimaryButton from "../../components/primaryButton";
import AttendeeReview from "../../components/(attendee)/attendeeReview";
import ReviewModal from "../../components/(attendee)/reviewModal";
import { bookEvent } from "../../utils/bookEvent";

const EventPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const {
        name,
        date,
        time,
        venue,
        description,
        organizer,
        organizer_logo,
        orgID,
        categories,
        isEnded,
        id
    } = location.state || {};

    const openModal = () => {
        setIsReviewModalOpen(true);
    };

    const closeModal = () => {
        setIsReviewModalOpen(false);
    };

    const handleBookEvent = () => {
        bookEvent(id);
        alert("Event booked successfully");
        navigate("/mainPage");
    };

    const handleViewOrganizerProfile = () => {
        navigate("/organizerProfile", {
            state: {
                name,
                date,
                time,
                venue,
                description,
                organizer,
                organizer_logo,
                categories,
                isEnded,
                orgID
            }
        });
    };

    const review = {
        imageUrl: "https://example.com/image.jpg",
        name: "Tommy M. Laird",
        rating: 4, // Rating out of 5
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
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
                                <p>{organizer}</p>
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
                                    <button onClick={handleViewOrganizerProfile}>
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {categories[0] !== null && (
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
                    )}
                    {!isEnded ? (
                        <div>
                            <PrimaryButton title={"Book It"} onButtonClick={handleBookEvent} />
                        </div>
                    ) : (                        
                        <div>
                            <div className="reviews-header">
                                <p className="custom-underline">Reviews</p>
                                <div className="review-button" onClick={openModal}>
                                    <MdChat />
                                    <p>Leave a review</p>
                                </div>
                            </div>

                            <div>
                                <AttendeeReview 
                                    review={review} 
                                />
                                <AttendeeReview 
                                    review={review} 
                                />
                                <AttendeeReview 
                                    review={review} 
                                />
                                <AttendeeReview 
                                    review={review} 
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ReviewModal isOpen={isReviewModalOpen} onRequestClose={closeModal} />
        </div>
    );
};

export default EventPage;
