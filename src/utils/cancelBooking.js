import axios from "axios";


export const cancelBooking = async (eventID) => {
    const backendURL = "https://book-it-server-sigma.vercel.app";
    const user = localStorage.getItem("user");
    const userID = JSON.parse(user).id;

    try {
        const request = await axios.delete(`${backendURL}/events/bookings/delete`, {userID, eventID});
        console.log("Booking cancellation status:", request.data);
    } catch (error) {
        console.log("Error cancelling booking:", error);
    }
}