import React, { useState } from 'react';
import { MdInfo } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Select from "react-select";
import 'react-datepicker/dist/react-datepicker.css';
import ToastMessage from '../(universal)/toast';
import Loading from '../(universal)/loading';

const AddEvent = ({ organizerID, onSuccess }) => {
    const backendURL = "http://localhost:3001";

    const [date, setDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventCategories, setEventCategories] = useState([]);
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);

    const presetKey = "bookit";
    const cloudName = "dmht0mpfq";

    const handleShowToast = () => {
        setShowToast(true);
    };

    const handleCloseToast = () => {
        onSuccess();
        setShowToast(false);
    };

    const predefinedCategories = [
        { value: "tech", label: "Tech" },
        { value: "music", label: "Music" },
        { value: "fun", label: "Fun" },
        { value: "education", label: "Education" },
        { value: "business", label: "Business" },
        { value: "innovation", label: "Innovation" },
        { value: "sports", label: "Sports" },
    ];

    const handleAddCustomCategory = () => {
        if (customCategory.trim() !== "") {
            const existingCategory = eventCategories.find(cat => cat.value === customCategory);
            if (!existingCategory) {
                const newCategory = { value: customCategory, label: customCategory };
                setEventCategories(prevCategories => [...prevCategories, newCategory]);
            }
            setCustomCategory("");
        }
    };

    const formatTimestamp = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", presetKey);
        formData.append("cloud_name", cloudName);

        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
            console.log("Response:", res);
            setImage(res.data.secure_url);
        } catch (err) {
            console.log("Error uploading image:", err);
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        setLoading(true);

        const categories = eventCategories.map(category => category.value); 

        const eventDetails = {
            coreEventDetails: {
                title: eventTitle,
                event_timestamp: formatTimestamp(date),
                price: price,
                venue: eventVenue,
                bio: eventDescription,
            },
            additionalEventDetails: {
                image: image
            }
        };

        const data = { organizerID, eventDetails, categories };

        console.log("Event Details:", data);
        try {
            const response = await axios.post(`${backendURL}/events/create`, data);
            console.log("Event publishing status:", response.data);
            handleShowToast();
        } catch (error) {
            console.error("Error creating a new event:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="event-form">
            <div className="event-form-header">
                <p>Add Event</p>
            </div>
            <form onSubmit={handleAddEvent}>
                <div className="event-form-group">
                    <label htmlFor="eventTitle">Event Title *</label>
                    <input
                        type="text"
                        id="eventTitle"
                        className="event-form-input"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="A catchy name that'll attract people..."
                        required
                    />
                </div>

                <div className="event-form-group">
                    <label htmlFor="eventDescription">Event Description *</label>
                    <textarea
                        id="eventDescription"
                        className="event-form-textarea"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        placeholder="Talk to us about the event..."
                        required
                    ></textarea>
                </div>

                <div className="event-form-group">
                    <label htmlFor="eventFlyer">Upload Event Flyer/Image</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        id="eventFlyer" 
                        className="event-form-input-file"
                        onChange={uploadImage}
                    />
                    <div className="event-form-info">
                        <MdInfo />
                        <p>This image is what users will see when they view your event. Make it count.</p>
                    </div>
                </div>

                <div className="event-form-group">
                    <label htmlFor="eventDate">Select Date & Time *</label>
                    <DatePicker
                        selected={date}
                        onChange={(d) => setDate(d)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="event-form-datepicker"
                        required
                        minDate={new Date()} // Set the minimum date to today
                    />
                </div>

                <div className="event-form-group">
                    <label htmlFor="eventVenue">Venue *</label>
                    <input
                        type="text"
                        id="eventVenue"
                        className="event-form-input"
                        value={eventVenue}
                        onChange={(e) => setEventVenue(e.target.value)}
                        placeholder="Where's your event taking place?"
                        required
                    />
                </div>

                <div className="event-form-group">
                    <label htmlFor="eventPrice">Price (GHS) *</label>
                    <input
                        type="number"
                        id="eventPrice"
                        className="event-form-input"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="How much is a ticket?"
                        required
                    />
                </div>

                <div className="event-form-group">
                    <label htmlFor="eventCategory">Event Categories *</label>
                    <Select
                        isMulti
                        name="categories"
                        options={predefinedCategories.concat(eventCategories)}
                        className="event-form-multi-select"
                        classNamePrefix="select"
                        onChange={setEventCategories}
                        value={eventCategories}
                    />
                    <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Add custom category"
                        className="event-form-input"
                    />
                    <button type="button" onClick={handleAddCustomCategory} className="event-form-add-category-button">
                        Add Category
                    </button>
                </div>

                <button type="submit" className="event-form-submit-button">{loading ? <Loading /> : "Publish Event"}</button>
            </form>

            {showToast && (
                <ToastMessage
                    message="Event created successfully!"
                    type="success"
                    onClose={handleCloseToast}
                />
            )}
        </div>
    );
};

export default AddEvent;
