import React from 'react';

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.538 1.118L10 13.347l-3.385 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.614 9.383c-.783-.57-.381-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.956z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
