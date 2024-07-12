import React from "react";
import { MdStar } from "react-icons/md";

const AttendeeReview = ({ rating, review }) => {
    return(
        <div className="attendee-review-container">
            <div className="attendee-review-container-header">
                <div className="profile-pic-and-name">
                    <img alt="user-profile-pic"/>
                    <div>
                        <p>Reviewer's name</p>
                        <p>Reviewer's email address</p>
                    </div>
                </div>

                <div>
                    <MdStar />
                    <p>{rating}</p>
                </div>
            </div>

            <div>
                <p>{review}</p>
            </div>
        </div>
    );
};

export default AttendeeReview;