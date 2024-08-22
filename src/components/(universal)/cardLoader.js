// CardSkeleton.js
import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="event-image-skeleton"></div>
      <div className="text-skeleton title-skeleton"></div>
      <div className="text-skeleton subtitle-skeleton"></div>
      
      <div className="icon-skeleton-row">
        <div className="icon-skeleton"></div>
        <div className="text-skeleton small-text-skeleton"></div>
      </div>
      <div className="icon-skeleton-row">
        <div className="icon-skeleton"></div>
        <div className="text-skeleton small-text-skeleton"></div>
      </div>
      <div className="icon-skeleton-row">
        <div className="icon-skeleton"></div>
        <div className="text-skeleton small-text-skeleton"></div>
      </div>
      
      <div className="text-skeleton category-skeleton"></div>
    </div>
  );
};

export default CardSkeleton;
