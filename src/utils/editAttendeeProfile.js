import axios from "axios"

const backendURL = "https://book-it-server-sigma.vercel.app";

export const editAttendeeProfile = async( field ) => {
    try {
        const response = await axios.put(`${backendURL}/profile/user/update`, field);
        console.log("Profile updated successfully!", response.data);
        return (response.data);
    } catch (error) {
        console.log("Error updating attendee profile:", error);
    }
}