import React, { useState } from 'react'; 
import { useAuth } from '../contexts/AuthContext'; // Make sure to import the AuthContext
import { db } from '../firebase'; // Assuming you're using Firestore
import { doc, setDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const NewContentForm = () => {
  const { currentUser } = useAuth(); // Get the current user
  const [name, setName] = useState('');
  const [isMovie, setIsMovie] = useState(true); // True for movie, false for series
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isLoading, setIsLoading] = useState(false); // Loading state to show the spinner and text
  const [modalMessage, setModalMessage] = useState(''); // To store modal message
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter a name.');
      return;
    }

    // Start loading state and hide the form
    setIsLoading(true);

    try {
      // Add the content to Firestore
      const userContentRef = collection(db, 'users', currentUser.uid, 'usersContent');
      const newContentDoc = doc(userContentRef);
      await setDoc(newContentDoc, {
        name,
        isMovie,
        createdAt: new Date(),
        uid: newContentDoc.id, // Unique UID for this content
        userUid: currentUser.uid
      });

      // Clear form data after successful submission (optional)
      setName('');
      setIsMovie(true);

      // Show the modal with success message
      setModalMessage('Content Added Successfully!');
      setIsModalOpen(true);

      // Close modal and navigate after 3 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/ViewPage'); // Navigate to the ViewPage component
      }, 3000);
    } catch (err) {
      console.error('Error adding document: ', err);
      setError('Failed to add content');
      setIsLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Content</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Show loading spinner and text while submitting */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <div className="spinner-border animate-spin border-4 border-blue-500 rounded-full w-16 h-16 mb-4" />
            <p>Currently adding...</p>
          </div>
        ) : (
          // Form will be hidden if loading is true
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" htmlFor="type">Type</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="movie"
                    checked={isMovie}
                    onChange={() => setIsMovie(true)}
                  />
                  Movie
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="series"
                    checked={!isMovie}
                    onChange={() => setIsMovie(false)}
                  />
                  Series
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Content
            </button>
          </form>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg w-64 z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{modalMessage}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewContentForm;