import React, { useState } from 'react';
import Modal from 'react-modal';

const ReviewModal = ({ isOpen, onRequestClose }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Review:', review);
    console.log('Rating:', rating);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Review Modal"
      ariaHideApp={false}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <div className="review-form">
        <h2>REVIEW</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="review">What did you think of the event?</label>
            <textarea
              id="review"
              value={review}
              onChange={handleReviewChange}
              placeholder="Leave your review here...."
            />
          </div>
          <div>
            <label htmlFor="rating">How would you rate the event?</label>
            <select
              id="rating"
              value={rating}
              onChange={handleRatingChange}
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}/5
                </option>
              ))}
            </select>
          </div>
          <button type="submit">
            Submit Review
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
