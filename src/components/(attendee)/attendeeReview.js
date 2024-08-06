import React from "react";

const AttendeeReview = ({ review }) => {
    const renderStars = (rating) => {
        const stars = Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < rating ? "star-filled" : "star-empty"}>
                {index < rating ? "★" : "☆"}
            </span>
        ));
        return stars;
    };

    return (
        <div className="review">
            <div className="review-header">
                <img src={review.imageUrl} alt={review.name} className="review-image" />
                <div className="review-info">
                    <div className="review-rating">
                        {renderStars(review.rating)}
                    </div>
                    <div className="review-author">{review.first_name} {review.last_name}</div>
                </div>
            </div>
            <p className="review-content">{review.content}</p>
        </div>
    );
};

export default AttendeeReview;
