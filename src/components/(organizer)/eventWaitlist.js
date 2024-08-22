import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const EventWaitlist = ({ title, id, onClose }) => {
    const backendURL = "https://book-it-server-sigma.vercel.app";

    const [waitlist, setWaitlist] = useState([]);
    
    const closeWaitlist = () => {
        onClose(false);
    }
    

    useEffect(() => {
        const fetchEventWaitlist = async() => {
            try {
                console.log("Event ID: ", id);
                const response = await axios.get(`${backendURL}/events/${id}/bookings`);
                setWaitlist(response.data.bookingList);
                console.log("Event waitlist:", response.data.bookingList)
            } catch (error) {
                console.log("Error fetching waitlist:", error);
            }
        }

        fetchEventWaitlist();
    }, [backendURL, id]);

    return(
        <div className="waitlist-container">
            <div className="waitlist-header">
                <p className="custom-underline">{title} Waitlist</p>
                <div onClick={closeWaitlist}>
                    <MdClose />
                </div>
            </div>

            <div>
                {waitlist && waitlist.map((attendee, index) => (
                    <p className="attendee">
                        {index + 1}. {attendee.first_name} {attendee.last_name}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default EventWaitlist;