export const getUserData = () => {
    const user = localStorage.getItem("user");
    if (user) {
        console.log("User data from local storage:", user)
        return(JSON.parse(user));
    } else {
        console.log("User not found in local storage");
        return({});
    }
}
