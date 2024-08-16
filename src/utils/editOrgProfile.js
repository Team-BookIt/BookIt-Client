import axios from "axios";

const backendURL = "https://book-it-server-sigma.vercel.app";
const orgID = Number(JSON.parse(localStorage.getItem("organizer")).id);

export const editOrganizerProfile = async( field ) => {
    try {
        const response = await axios.put(`${backendURL}/profile/org/${orgID}/update`, field);
        console.log("Profile updated successfully!", response.data);
        return (response.data);
    } catch (error) {
        console.log("Error update organizer profile:", error);
    }
}