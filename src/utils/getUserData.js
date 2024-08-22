import axios from "axios";

export const getUserData = async() => {
    const backendURL = "https://book-it-server-sigma.vercel.app";;
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        const userID = user.id;
        try {
            const response = await axios.get(`${backendURL}/user/${userID}`);
            console.log("User profile returned successfully:", response.data.userProfile[0]);
            return(response.data.userProfile[0]);
        } catch (error) {
            console.log("Error fetching user:", error);
        }
        console.log("User data from local storage:", user)
    } else {
        console.log("User not found in local storage");
        return({});
    }
}
