export const getUserData = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
        console.log("User data from local storage:", userData)
        return(JSON.parse(userData));
    } else {
        console.log("User not found in local storage");
        return({});
    }
}
