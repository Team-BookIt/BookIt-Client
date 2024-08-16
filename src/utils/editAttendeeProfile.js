import axios from "axios"

const backendURL = "https://book-it-server-sigma.vercel.app";

export const editAttendeeProfile = async( attributes ) => {
    const userId = Number(JSON.parse(localStorage.getItem("user")).id);
    console.log("Attributes", attributes);

    try {
        const response = await axios.put(`${backendURL}/profile/user/${userId}/update`, {attributes});
        console.log("Profile update response:", response.data);
        console.log("Field being updated:", attributes);
        return (response.data);
    } catch (error) {
        console.log("Error updating attendee profile:", error);
    }
}