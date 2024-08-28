import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdClose, MdCheck } from "react-icons/md";

const EventWaitlist = ({ title, id, onClose }) => {
    const backendURL = "https://book-it-server-sigma.vercel.app";

    const [waitlist, setWaitlist] = useState([]);
    const [attendeeStatus, setAttendeeStatus] = useState({});

    const closeWaitlist = () => {
        onClose(false);
    };

    useEffect(() => {
        const fetchEventWaitlist = async () => {
            try {
                console.log("Event ID: ", id);
                const response = await axios.get(`${backendURL}/events/${id}/bookings`);
                setWaitlist(response.data.bookingList);
                console.log("Event waitlist:", response.data.bookingList);
            } catch (error) {
                console.log("Error fetching waitlist:", error);
            }
        };

        fetchEventWaitlist();
    }, [backendURL, id]);

    const handleAdmit = async (attendeeId, index) => {
        try {
            const response = await axios.post(`${backendURL}/attendance/add/${attendeeId}/${id}`);
            console.log("Attendee admission status:", response.data);
            setAttendeeStatus(prevStatus => ({
                ...prevStatus,
                [index]: "Admitted"
            }));
        } catch (error) {
            console.error("Error admitting attendee:", error);
        }
    };

    const handleDecline = async (attendeeId, index) => {
        try {
            await axios.post(`${backendURL}/events/${id}/decline`, { attendeeId });
            setAttendeeStatus(prevStatus => ({
                ...prevStatus,
                [index]: "Declined"
            }));
        } catch (error) {
            console.error("Error declining attendee:", error);
        }
    };

    return (
        <div className="waitlist-container">
            <div className="waitlist-header">
                <p className="custom-underline">{title} Waitlist</p>
                <div onClick={closeWaitlist}>
                    <MdClose />
                </div>
            </div>

            <div>
                {waitlist && waitlist.map((attendee, index) => (
                    <div key={attendee.id} className="attendee-container">
                        <p className="attendee">
                            {index + 1}. {attendee.first_name} {attendee.last_name}
                        </p>
                        {attendeeStatus[index] ? (
                            <p className="attendee-status">{attendeeStatus[index]}</p>
                        ) : (
                            <div className="attendee-actions">
                                <button onClick={() => handleAdmit(attendee.id, index)} className="admit-button">
                                    <MdCheck />
                                    Admit
                                </button>
                                <button onClick={() => handleDecline(attendee.id, index)} className="decline-button">
                                    <MdClose />
                                    Decline
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventWaitlist;
