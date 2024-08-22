import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    MdAccessTime, 
    MdLocationOn, 
    MdCalendarMonth, 
    MdEmail, 
    MdLanguage, 
    MdPhone,
    MdChat,
    MdAirplaneTicket
} from "react-icons/md";
import Header from "../../components/(universal)/header";
import SideBar from "../../components/(attendee)/sideBar";
import PrimaryButton from "../../components/primaryButton";
import AttendeeReview from "../../components/(attendee)/attendeeReview";
import ReviewModal from "../../components/(attendee)/reviewModal";
import ConfirmationModal from "../../components/(universal)/actionConfirmationModal";
import ToastMessage from "../../components/(universal)/toast";
import { addUserInterests, bookEvent } from "../../utils/bookEvent";
import defaultAvatar from "../../assets/default-avatar.png"
import { getEventById } from "../../utils/getEventById";
import noReview from "../../assets/no-reviews.png"
import { cancelBooking } from "../../utils/cancelBooking";

const EventPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showTaost, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [eventReviews, setEventReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        name,
        date,
        time,
        venue,
        description,
        rate,
        organizer,
        organizer_logo,
        orgID,
        categories,
        isEnded,
        id,
        booked
    } = location.state || {};

    // const [eventBooked, setEventBooked] = useState(booked);


    useEffect(() => {
        const fetchEvent = async () => {
            console.log("Event id:", id);
            const eventData = await getEventById(id);
            if (eventData)
                setEventReviews(eventData.eventReviews);
        }

        fetchEvent();
    }, [id]);

    const eventID = Number(id);

    const openReviewModal = () => {
        setIsReviewModalOpen(true);
    };

    const closeReveiwModal = () => {
        setIsReviewModalOpen(false);
    };

    const handlePayment = () => {
        const handler = window.PaystackPop.setup({
            key: 'pk_test_2ef45ac3bdd13380b0b455505b6dcd42bb7755ed', // Replace with your public key
            email: 'asarebediakobaffuoh@gmail.com',
            amount: rate * 100, // Amount in kobo
            ref: '' + Math.floor(Math.random() * 10000000000 + 1), // Generate a random reference
            onClose: () => {
                alert('Payment window closed.');
            },
            callback: () => {
                onYesPress();
                navigate("/home");
                // You can handle the response here, such as updating the UI or making a request to your backend
            }
        });
    
        handler.openIframe();
    };

    const handleButtonPress = () => {
        console.log("Rate:", rate);
        setModalMessage("Are you sure you want to book this event?");
        if (rate === "Free"){
            setShowConfirmationModal(true);
        } else {
            handlePayment();
        }
    };

    const handleEventCancellation = async () => {
        setModalMessage("Are you sure you want to cancel this event? This action cannot be undone.");
        setShowConfirmationModal(true);
    }

    const onYesPress = async() => {
        setLoading(true);
        console.log("Event booked?", booked);
        if (!booked){
            const booking = await bookEvent(id);
            await addUserInterests(categories);
            if (booking) {                
                if (booking.message === "Event registration successful") {
                    setToastMessage("Event booked successfully!");
                    setToastType("success");
                } else if (booking.message === "Seems you've already booked this event") {
                    setToastMessage("Seems you've already booked this event");
                    setToastType("warning");
                } else {
                    setToastMessage("Failed to book event");
                    setToastType("error");
                }
            }
        } else if (booked) {
            const cancel = await cancelBooking(eventID);
            if (cancel.message === "Event booking cancelled successfully") {
                setToastMessage("Event cancellation successful!");
                setToastType("success");
            } else if (cancel.message === "Booking not found") {
                setToastMessage("You haven't booked this event.");
                setToastType("warning");
            } else {
                setToastMessage("Failed to cancel event");
                setToastType("error");
            }
        }

        setShowConfirmationModal(false);
        setLoading(false);
        setShowToast(true);
        setTimeout(() => navigate("/home"), 1000);
    }

    const onNoPress = () => {
        setShowConfirmationModal(false);
    }

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

    const renderReviews = (reviews) => {
        if (!reviews) {
            return (
                <div className="no-events-img-container">
                    <img src={noReview} alt="no reviews" className="no-events-img" />
                </div>
            )
        } else {
            return (reviews.map((review) => (
                <AttendeeReview 
                    review={review}
                />
            )))
        }
    }

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
                        <div className="event-detail">
                            <MdAirplaneTicket />
                            <p>{rate}</p>
                        </div>
                    </div>

                    <div>
                        <p className="custom-underline">About {name}</p>
                        <p>{description}</p>
                    </div>

                    <div>
                        <p className="custom-underline">Organizer</p>
                        <div className="event-organizer-container">
                            <img src={organizer_logo || defaultAvatar} alt="organizer-logo" className="organizer-logo" onClick={() => alert(organizer_logo)}/> 
                            <div className="event-organizer-details">
                                <p>{organizer}</p>
                                <div>
                                    <button className="view-profile" onClick={handleViewOrganizerProfile}>
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
                        !booked ? (
                            <div>
                                <PrimaryButton title={"Book It"} onButtonClick={handleButtonPress} />
                            </div>
                        ) : (
                            <div className="cancel-booking-button" onClick={handleEventCancellation}>
                                <button type="submit">Cancel Booking</button>
                            </div>
                        )
                    ) : (                        
                        <div>
                            <div className="reviews-header">
                                <p className="custom-underline">Reviews</p>
                                <div className="review-button" onClick={openReviewModal}>
                                    <MdChat />
                                    <p>Leave a review</p>
                                </div>
                            </div>

                            <div>
                                {renderReviews(eventReviews)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ReviewModal isOpen={isReviewModalOpen} onRequestClose={closeReveiwModal} eventID={id} />

            {showConfirmationModal && (
                <ConfirmationModal 
                    onYesPress={onYesPress} 
                    onNoPress={onNoPress} 
                    message={modalMessage} 
                    loading={loading}
                />
            )}

            {showTaost && (
                <ToastMessage 
                    message={toastMessage}
                    type={toastType}
                    duration={2000}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default EventPage;
