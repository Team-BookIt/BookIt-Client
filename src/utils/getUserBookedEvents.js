import axios from "axios";

const backendURL = "https://book-it-server-sigma.vercel.app";

export const getUserBookedEvents = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    console.log("User id:", userId);
    try {
        const response = await axios.get(`${backendURL}/events/bookings/${userId}`);
        console.log("Booked Events from util func:",response.data);
        return (response.data.bookedEvents);
    } catch (error) {
        console.log("Error getting booked events:", error);
    }
}