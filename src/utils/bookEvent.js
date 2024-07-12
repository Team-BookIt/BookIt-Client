import axios from "axios";
import { getUserData } from "./getUserData";

const backendURL = process.env.REACT_APP_BOOKIT_BACKEND_URL;


export const bookEvent = async (eventID) => {
    const userID = getUserData().id;
    try {
        const response = await axios.post(`${backendURL}/events/register`, {eventID, userID});
        console.log(response.data);
        alert("Event booked successfully!");
        return response.data;
    } catch (error) {
        console.log("Error booking event:", error);
    }
};

