import axios from "axios";

const backendURL = "https://book-it-server-sigma.vercel.app";

const userID = JSON.parse(localStorage.getItem("user")).id;

export const bookEvent = async (eventID) => {
    console.log("User id", userID);
    try {
        const response = await axios.post(`${backendURL}/events/register`, {eventID, userID});
        console.log("Event booked?", response.data);
        return response.data;
    } catch (error) {
        console.log("Error booking event:", error);
    }
};

export const addUserInterests = async(interests) => {
    const id = userID
    try {
        const response = await axios.post(`${backendURL}/profile/user/interests`, {interests, id});
        console.log("User interests added:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error posting user interests", error);
    }
}

