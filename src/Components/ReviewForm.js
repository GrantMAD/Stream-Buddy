import React from 'react';
import { Link } from 'react-router-dom';

const ReviewForm = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl text-center font-bold mb-6">Stream Buddy</h1>
      <div className="flex justify-center">
        <Link to="/profile" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Profile
        </Link>
      </div>
    </div>
  );
};

export default ReviewForm;
