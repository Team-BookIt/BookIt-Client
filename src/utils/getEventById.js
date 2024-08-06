import axios from "axios";

const backendURL = "https://book-it-server-sigma.vercel.app";

export const getEventById = async (eventID) => {
    try {
        const response = await axios.get(`${backendURL}/events/${eventID}`);
        console.log("Event fetched successfully:", response.data.eventDetails);
        return response.data.eventDetails;
    } catch (error) {
        console.log("error getting event:", error);
    }
}