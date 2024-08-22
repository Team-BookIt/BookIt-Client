import axios from "axios";

const backendURL = "http://localhost:3001";

const userID = JSON.parse(localStorage.getItem("user")).id;

export const bookEvent = async (eventID) => {
    console.log("User id", userID);
    console.log("EVent id", eventID);
    try {
        const response = await axios.post(`${backendURL}/events/register`, {eventID, userID});
        console.log("Event booked?", response.data);
        return response.data;
    } catch (error) {
        console.log("Error booking event:", error);
    }
};

export const addUserInterests = async(interests) => {
    const id = userID;
    try {
        const response = await axios.post(`${backendURL}/profile/user/${id}/interests`, {interests});
        console.log("User interests added:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error posting user interests", error);
    }
}

