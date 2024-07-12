import axios from "axios";
import { getUserData } from "./getUserData";

const backendURL = process.env.REACT_APP_BOOKIT_BACKEND_URL;

export const getUserBookedEvents = async () => {
    const userID = getUserData().id;
    try {
        const response = await axios.get(`${backendURL}/bookings/${userID}`);
        console.log(response.data);
        return (response.data);
    } catch (error) {
        console.log("Error getting booked events:", error);
    }
}