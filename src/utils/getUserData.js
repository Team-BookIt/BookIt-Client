export const getUserData = () => {
    const userData = localStorage.getItem("userData");
    if (userData) {
        return(JSON.parse(userData));
    } else {
        return({});
    }
}
