import axios from "axios";

const backendURL = process.env.REACT_APP_BOOKIT_BACKEND_URL;


export const fetchEvents = async () => {
    console.log("Backend url", backendURL)
    try {
        const response = await axios.get(`${backendURL}/events`);
        return response.data.events;
    } catch (error) {
        console.log("Error fetching events from utility function:", error);
        throw error;
    }
}