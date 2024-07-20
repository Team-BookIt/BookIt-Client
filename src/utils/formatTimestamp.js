export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // extract date part
    const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const formattedDate = date.toLocaleDateString("en-US", dateOptions);

    // extract time part
    const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timezone: "UTC"
    }

    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return {date: formattedDate, time: formattedTime};
}