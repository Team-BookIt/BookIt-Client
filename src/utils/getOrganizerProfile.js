import axios from "axios";
const backendURL = process.env.REACT_APP_BOOKIT_BACKEND_URL;

export const getOrganizerProfile = async (orgID) => {
    try {
        const response = await axios.get(`${backendURL}/user/org/${orgID}`);
        console.log(response.data);
        return(response.data.organizerProfile);
    } catch (error) {
        console.log("Error fetching organizer profile from utility function:", error);
    }
}