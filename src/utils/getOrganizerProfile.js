import axios from "axios";
const backendURL = "https://book-it-server-sigma.vercel.app";

export const getOrganizerProfile = async (orgID) => {
    try {
        const response = await axios.get(`${backendURL}/user/org/${orgID}`);
        console.log("Organizer id from getOrganizerProfile:", orgID);
        console.log("From utility function", response.data);
        return(response.data.organizerProfile);
    } catch (error) {
        console.log("Error fetching organizer profile from utility function:", error);
    }
}