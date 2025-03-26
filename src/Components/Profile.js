import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl text-center font-bold mb-6">Your Profile</h1>
      <div className="flex justify-center">
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
