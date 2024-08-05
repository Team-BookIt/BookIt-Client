import axios from "axios"

const backendURL = "https://book-it-server-sigma.vercel.app";

export const editAttendeeProfile = async( field ) => {
    const userId = JSON.parse(localStorage.getItem("user")).id;

    try {
        const response = await axios.put(`${backendURL}/profile/user/update`, {field, userId});
        console.log("Profile update response:", response.data);
        console.log("Field being updated:", field);
        return (response.data);
    } catch (error) {
        console.log("Error updating attendee profile:", error);
    }
}