// HorizontalCardSkeleton.js
import React from 'react';

const BookedEventLoader = () => {
  return (
    <div className="horizontal-card-skeleton">
      <div className="image-skeleton"></div>
      <div className="content-skeleton">
        <div className="text-skeleton title-skeleton"></div>
        <div className="icon-skeleton-row">
          <div className="icon-skeleton"></div>
          <div className="text-skeleton small-text-skeleton"></div>
        </div>
        <div className="icon-skeleton-row">
          <div className="icon-skeleton"></div>
          <div className="text-skeleton small-text-skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default BookedEventLoader;