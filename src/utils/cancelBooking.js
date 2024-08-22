import axios from "axios";


export const cancelBooking = async (eventID) => {
    const backendURL = "https://book-it-server-sigma.vercel.app";
    const user = localStorage.getItem("user");
    const userID = JSON.parse(user).id;

    const guestID = Number(userID);
    console.log("Event id:", eventID);
    console.log("Guest id:", guestID);

    try {
        const request = await axios.delete(`${backendURL}/events/bookings/delete/${guestID}/${eventID}`);
        console.log("Booking cancellation status:", request.data.response);
        return (request.data.response);
    } catch (error) {
        console.log("Error cancelling booking:", error);
    } finally{
        console.log("Guest id after request:", guestID);
        console.log("Event id after request:", eventID);
    }

}