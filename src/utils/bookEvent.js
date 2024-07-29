import axios from "axios";
import { getUserData } from "./getUserData";

const backendURL = "https://book-it-server-sigma.vercel.app";


export const bookEvent = async (eventID) => {
    const userID = getUserData().id;
    try {
        const response = await axios.post(`${backendURL}/events/register`, {eventID, userID});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("Error booking event:", error);
    }
};

