import axios from "axios";

export const submitReview = async (eventID) => {
    const backendURL = "https://book-it-server-sigma.vercel.app";
    const user = localStorage.getItem("user");
    const userID = JSON.parse(user).id;

    try {
        const request = await axios.post(`${backendURL}/events/review`, {eventID, userID});
        console.log("Attendee id:", userID);
        console.log("Event id:", eventID)
        console.log("Reveiw submission status:", request.data);
        return (request.data);
    } catch (error) {
        console.log("Error submitting review:", error);
    }
}