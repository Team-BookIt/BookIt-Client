import axios from "axios";
import { getUserData } from "./getUserData";

const backendURL = process.env.REACT_APP_BOOKIT_BACKEND_URL;

export const getUserBookedEvents = async () => {
    const userID = getUserData().id;
    try {
        const response = await axios.get(`${backendURL}/events/bookings/${userID}`);
        console.log(response.data);
        return (response.data.bookedEvents);
    } catch (error) {
        console.log("Error getting booked events:", error);
    }
}