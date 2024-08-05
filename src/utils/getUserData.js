import axios from "axios";

export const getUserData = async() => {
    const backendURL = "https://book-it-server-sigma.vercel.app";
    const user = localStorage.getItem("user");

    if (user) {
        const userID = JSON.parse(user).id;
        try {
            const response = await axios.get(`${backendURL}/user/${userID}`);
            console.log("User profile returned successfully:", response.data.userProfile[0]);
            return(response.data.userProfile[0]);
        } catch (error) {
            
        }
        console.log("User data from local storage:", user)
    } else {
        console.log("User not found in local storage");
        return({});
    }
}
