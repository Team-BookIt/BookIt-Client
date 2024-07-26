export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Extract date part
    const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const formattedDate = date.toLocaleDateString("en-US", dateOptions);

    // Extract time part
    const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC" // Corrected to 'timeZone'
    };

    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    // Calculate days left or past
    const now = new Date();
    const timeDiff = date - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Calculate days difference

    const isEnded = timeDiff < 0; // Determine if the event has ended

    return {
        date: formattedDate,
        time: formattedTime,
        isEnded,
        daysLeft: isEnded ? "Past" : daysLeft
    };
};
