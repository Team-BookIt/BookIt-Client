import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const EventAttendees = ({ title, id }) => {
    const backendURL = "https://book-it-server-sigma.vercel.app";

    const [attendees, setAttendees] = useState([])

    useEffect(() => {
        const fetchEventAttendees = async() => {
            try {
                const response = await axios.get(`${backendURL}/events/${id}/attendees`);
                setAttendees(response.data);
                console.log("Event attendees:", response.data)
            } catch (error) {
                console.log("Error fetching attendees:", error);
            }
        }

        fetchEventAttendees();
    }, [backendURL, id]);

    return(
        <div>
            <div>
                <p>{title} Attendees</p>
                <MdClose />
            </div>

            <div>
                {attendees && attendees.map((attendee) => (
                    <p>{attendee}</p>
                ))}
            </div>
        </div>
    );
};

export default EventAttendees;