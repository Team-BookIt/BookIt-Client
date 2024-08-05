import React, { useState } from 'react';
import { MdInfo } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Select from "react-select";
import 'react-datepicker/dist/react-datepicker.css';
import ToastMessage from '../(universal)/toast';
import { useForm } from 'react-hook-form';
import Loading from '../(universal)/loading';
import Resizer from 'react-image-file-resizer';

const AddEvent = ({ organizerID, onSuccess }) => {
	const backendURL = "https://book-it-server-sigma.vercel.app";

	const { register, handleSubmit } = useForm();

	const [date, setDate] = useState(new Date());
	const [eventTitle, setEventTitle] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [eventVenue, setEventVenue] = useState('');
	const [eventCategories, setEventCategories] = useState([]);
	const [customCategory, setCustomCategory] = useState("");
	const [showToast, setShowToast] = useState(false);
	const [loading, setLoading] = useState(false);

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
			const newCategory = { value: customCategory, label: customCategory };
			setEventCategories((prevCategories) => [...prevCategories, newCategory]);
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

	const resizeFile = (file) =>
		new Promise((resolve) => {
			Resizer.imageFileResizer(
				file,
				800, // max width
				800, // max height
				'JPEG', // format
				70, // quality
				0, // rotation
				(uri) => {
					resolve(uri);
				},
				'blob'
			);
		});

	const handleAddEvent = async (data) => {
		setLoading(true);
		console.log("Org id from add event:", organizerID);
		const formData = new FormData();
		formData.append("organizerID", organizerID);
		formData.append("eventDetails[coreEventDetails][title]", eventTitle);
		formData.append("eventDetails[coreEventDetails][venue]", eventVenue);
		formData.append("eventDetails[coreEventDetails][bio]", eventDescription);
		formData.append("eventDetails[coreEventDetails][event_timestamp]", formatTimestamp(date));
		formData.append("eventDetails[coreEventDetails][price]", 0.00);
		
		const resizedImage = await resizeFile(data.file[0]);
		console.log("Resized image:", resizedImage);
		formData.append("image", resizedImage);

		let categories = [];
		eventCategories.forEach((category, index) => {
			categories[index] = category.value;
		});
		formData.append("eventCategories", categories);

		for (let pair of formData.entries()) {
			console.log(pair[0] + ': ' + pair[1]);
		}

		try {
			const response = await axios.post(`${backendURL}/events/create`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log("Event created:", response);
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
			<form onSubmit={handleSubmit(handleAddEvent)}>
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
						{...register("file")}
						id="eventFlyer" 
						className="event-form-input-file"
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
