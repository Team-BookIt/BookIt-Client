import axios from "axios";

const backendUrl = "https://book-it-server-sigma.vercel.app"

export const fetchEvents = async () => {
    try {
        const response = await axios.get(`${backendUrl}/events`);
        return response.data.events;
    } catch (error) {
        console.log("Error fetching events from utility function:", error);
        throw error;
    }
}