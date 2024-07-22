import React, { useState } from 'react';
import { MdInfo } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Select from "react-select";
import 'react-datepicker/dist/react-datepicker.css';
import ToastMessage from '../(universal)/toast';


const AddEvent = ({ onSuccess }) => {
	const backendURL = "https://book-it-server-sigma.vercel.app";

	const [date, setDate] = useState(new Date());
	const [eventTitle, setEventTitle] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [eventVenue, setEventVenue] = useState('');
	const [eventCategories, setEventCategories] = useState([]);
	const [customCategory, setCustomCategory] = useState("");
	const [showToast, setShowToast] = useState(false);

	const handleShowToast = () => {
		setShowToast(true);
	};
	
	const handleCloseToast = () => {
		onSuccess()
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

	const dataToPost = {
		organizerID: 5,
		eventDetails: {
			coreEventDetails: {
				title: eventTitle,
				venue: eventVenue,
				bio: eventDescription,
				event_timestamp: formatTimestamp(date),
				price: 0.00
			},
		  	additionalEventDetails: {
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAeFBMVEXqHS3////qGivsP0npABnoAADqESXpAB3pCCDpAA30o6bpABPpABb3vL/72tv0oKP4x8n2sbPuXGPxgobzl5r1rK7wcnfrKTbyi4/rNkH84+TrMDz+9PTxhovweH33wMHtVV3uY2n50NHtTlfsRU/va3HykZP86uud0DF+AAAC1ElEQVRIie2Wa5OqMAyGSWlDubS03ESQi6D4///haQvuWV0dPefLzs5sx8EAeZK0vCl4PvH+YxDf+yaQOJqY/zfDrCChO4uTFlsy8/dBgikA8zw6VINUPb4NJgpWUE9aVulbKR2Ivb+Bg/gn0MPYgYEehZLZ+6WaXA70Ekzi+C3uDsQA7c8eAuQBJ8+D3IBYladzecqqqjyXYxEVu+crfANSkU+yTrXS52W5zKoY8jdBPdWyXwYRqU5qf0DgT3V0l3FkTV9PkR7rSJ0Uk+GrOaIQ1BzrmS7K67JcdMdyX8RR8Ar0KLVnSDxOCUekHAPCvefcN/bjL/gCpOxVR2GYPABpdPnUDDzZfGj4IQPMGkG/gMRfN56Nq2FI1nCQXp3DBqDCL2AAMH2Imh0AWqdFE+4KJhpgT+7BsPXzdnf1oQsoFyXUUMZbFWTXz21MbsF4AjuKlUT/eD5mxg5mY5zcvsd759GsPXoF8QzrcJfx5OyOY+UMt/HZ6u2o+WeQ5zCYi3qbmLZOh4aFkzOULZaZuwCySYMbsD+UNhq0mHAvdCcRtNwcrBETGjBYjD3JL6B24G6nOuo7/+FQVy5LCcdApE/A3IELePb9Ex3s2+Qg5KAaW57UZq4JFA6MbkA8NhbM5cGXtWgWtxD1oLt1PUo2lazJLViu8vq7qos2EXMWNV0KbHT+EWO1MypWKrWwDFKQm6CvYBBlwoI8Mblypp3/JQylM5QLRBwY3ionUXQFQyOEPR/tqkRHgscCBHSzMnNW6fgAjCXbwIN9xNgan86onJ7NAo94MY+nb+YHIJ9WMJhtZQnZGx8rESOdyAhnZxTRhw9Kxay8Zpyseu7BWCjo6QOQpz0bbHU8lMK0jgGjzyAVE+R0NKHvM/Yt76eTPJnvgUzbSJ1XWNkSLyUdGj5f9oSfMfPv+hHthwCGNgYGa/Nt7WMMe5/bUyR43aB+6L76C/5k8A8fzS/J4UmyBAAAAABJRU5ErkJggg=="
			},
		},
		eventCategories: eventCategories.map((category) => category.value),
	  };


	const handleSubmit = async(e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${backendURL}/events/create`, dataToPost);
			console.log("Event created:", response.data);
			handleShowToast();
		} catch (error) {
			console.error("Error creating a new event:", error);
		}
	};

	return (
		<div className="event-form">
			<div className="event-form-header">
				<p>Add Event</p>
			</div>
			<form onSubmit={handleSubmit}>
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
				<input type="file" accept="image/*" id="eventFlyer" className="event-form-input-file" />
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

				<button type="submit" className="event-form-submit-button">Publish Event</button>
			</form>

			{showToast && (
				<ToastMessage
					message="Event created sucessfully!"
					type="success"
					onClose={handleCloseToast}
				/>
      		)}
		</div>
	);
};

export default AddEvent;
