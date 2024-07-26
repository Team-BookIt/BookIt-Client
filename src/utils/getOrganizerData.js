export const getOrganizerData = () => {
    const organizer = localStorage.getItem("organizer");
    if (organizer) {
        console.log("Orgnaizer data from local storage:", organizer)
        return(JSON.parse(organizer));
    } else {
        console.log("Orgnaizer not found in local storage");
        return({});
    }
}
