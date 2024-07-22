import axios from "axios";

const backendURL = "https://book-it-server-sigma.vercel.app";


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