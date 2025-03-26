import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faChevronDown, faChevronUp, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const ViewPage = () => {
  const [userContent, setUserContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [followingContent, setFollowingContent] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const fetchFollowingUsers = async () => {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        const following = userSnap.data()?.following || [];
        setFollowingUsers(following); // Set the following list state
      } catch (err) {
        console.error('Error fetching following users:', err);
      }
    };

    fetchFollowingUsers();
  }, [currentUser]);

  // Fetch logged-in user's own saved content
  useEffect(() => {
    if (!currentUser) return;

    const fetchUserContent = async () => {
      try {
        const userContentRef = collection(db, 'users', currentUser.uid, 'usersContent');
        const q = query(userContentRef);
        const querySnapshot = await getDocs(q);

        const contentData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserContent(contentData);
      } catch (err) {
        console.error('Failed to fetch user content:', err);
      }
    };

    fetchUserContent();
  }, [currentUser]);

  // Search for users dynamically
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFoundUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');

        // Fetch all users (Firestore does not support 'contains' directly, so we will filter client-side)
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);

        const users = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) && user.id !== currentUser?.uid
          );

        setFoundUsers(users);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [searchTerm, currentUser]);

  const handleFollowUser = async (userId) => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      // Add the userId to the following array in the current user's document
      await updateDoc(userDocRef, {
        following: arrayUnion(userId),
      });

      setFollowingUsers(prevState => [...prevState, userId]); // Add the user to the state

      // Fetch the followed user's name
      const followedUserRef = doc(db, 'users', userId);
      const followedUserSnap = await getDoc(followedUserRef);
      const followedUserName = followedUserSnap.data()?.name;

      // Fetch and update content of the newly followed user
      const userContentRef = collection(db, 'users', userId, 'usersContent');
      const q = query(userContentRef);
      const querySnapshot = await getDocs(q);

      const newContent = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update the followingContent state with the new content and followed user's name
      setFollowingContent(prevContent => [
        ...prevContent,
        { userName: followedUserName, content: newContent },
      ]);
    } catch (err) {
      console.error('Error following user:', err);
    }
  };

  // Unfollow a user
  const handleUnfollowUser = async (userId) => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      // Remove the userId from the following array in the current user's document
      await updateDoc(userDocRef, {
        following: arrayRemove(userId),
      });

      setFollowingUsers(prevState => prevState.filter(id => id !== userId)); // Remove from state
    } catch (err) {
      console.error('Error unfollowing user:', err);
    }
  };

  // Check if the user is already following this user
  const isFollowing = (userId) => followingUsers.includes(userId);

  // Fetch content from followed users
  useEffect(() => {
    if (!currentUser) return;

    const fetchFollowingContent = async () => {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userDocRef);
        const following = userSnap.data()?.following || [];

        let allContent = [];
        for (const followedUserId of following) {
          const userContentRef = collection(db, 'users', followedUserId, 'usersContent');
          const q = query(userContentRef);
          const querySnapshot = await getDocs(q);

          const contentData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Fetch the followed user's name to display as a heading
          const followedUserRef = doc(db, 'users', followedUserId);
          const followedUserSnap = await getDoc(followedUserRef);
          const followedUserName = followedUserSnap.data()?.name;

          allContent = [...allContent, { userName: followedUserName, content: contentData }];
        }

        setFollowingContent(allContent);
      } catch (err) {
        console.error('Error fetching following content:', err);
      }
    };

    fetchFollowingContent();
  }, [currentUser]);

  const toggleDropdown = (userId) => {
    setExpandedUsers(prevState => ({
      ...prevState,
      [userId]: !prevState[userId], // Toggle the expanded state
    }));
  };

  const filteredUsers = followingContent.filter(({ userName }) =>
    userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FontAwesomeIcon key={i} icon={solidStar} className={i < rating ? 'text-yellow-500' : 'text-gray-300'} />
    ));
  };

  return (
    <div className="min-h-screen pt-20 pb-10 pr-10 md:pr-20 lg:pr-60 pl-10 md:pl-20 lg:pl-60 bg-gray-100">
      <div>
        <div className="text-center mb-12">
          <h1 className="text-center text-4xl font-semibold mb-6">Viewing Page</h1>
          <p className="text-lg text-gray-600 mt-2">Here you can view what movies/series you and others you follow are currently watching</p>
        </div>
        <div className='py-8 px-10 rounded bg-white shadow-lg'>
          {/* Search Users Section */}
          <div className="mt-12">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Search for Users to Follow</h2>
              <div className='flex justify-between'>
                <input
                  type="text"
                  placeholder="Search by username..."
                  className={`p-2 border rounded mb-4 w-1/5 outline-none ${isFocused ? "ring-2 ring-blue-600" : ""
                    }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <button
                  onClick={() => navigate('/NewContentForm')}
                  className="h-12 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 hover:scale-105"
                >
                  Add New Content
                </button>
              </div>
            </div>

            {searchTerm.trim() && foundUsers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {foundUsers.map(user => (
                  <div key={user.id} className="p-4 bg-white rounded border-2 text-center">
                    <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
                    <h1>{user.email}</h1>
                    <button
                      onClick={() => isFollowing(user.id) ? handleUnfollowUser(user.id) : handleFollowUser(user.id)}
                      className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-green-600"
                    >
                      {isFollowing(user.id) ? 'Unfollow' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

          </div>

          {/* User's Saved Content */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">Saved Content</h2>
            <div className="flex flex-wrap">
              {userContent.map(content => (
                <div key={content.id} className="relative text-center mr-2">
                  <div className='flex justify-center mb-3'>
                    <div className='flex justify-center items-center border-2 rounded-sm bg-gray-300 w-48 h-80'>
                      <FontAwesomeIcon icon={faFilm} className="text-blue-600 text-3xl mb-2" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{content.name}</h3>
                  <div className="flex justify-center mt-2">{renderStars(content.rating)}</div>
                  <div>
                    <button className='text-blue-600 text-sm hover:scale-105'>Reviews (0)</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Followed Users' Saved Content */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">Users You Follow</h2>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-1/5 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Users List */}
            {filteredUsers.length > 0 ? (
              filteredUsers.map(({ userName, userId, content }) => (
                <div key={userId} className="bg-white rounded-lg shadow-lg pt-4 px-4 pb-2 mb-6">
                  {/* User Profile Card */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                      {userName[0]} {/* Display the first letter of the user's name */}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{userName}</h3>
                      <p className="text-sm text-gray-500">Following</p>
                    </div>
                    <button
                      onClick={() => toggleDropdown(userId)}
                      className="ml-auto text-blue-600 hover:text-blue-800"
                    >
                      <FontAwesomeIcon
                        icon={expandedUsers[userId] ? faChevronUp : faChevronDown}
                        className="ml-2"
                      />
                    </button>
                  </div>

                  {/* User Content Accordion */}
                  {expandedUsers[userId] && (
                    <div className="flex text-center mb-2">
                      {content.length > 0 ? (
                        content.map(({ id, name, rating }) => (
                          <div key={id} className="bg-gray-50 p-2 rounded-lg hover:scale-105 transition-all">
                            {/* Content Thumbnail */}
                            <div className="flex justify-center mb-4">
                              <div className="w-40 h-60 bg-gray-300 rounded-lg flex justify-center items-center">
                                <FontAwesomeIcon icon={faFilm} className="text-blue-600 text-3xl" />
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{name}</h3>
                            <div className="flex justify-center mb-2">{renderStars(rating)}</div>
                            <button
                              onClick={() => navigate('/ReviewForm')}
                              className="text-blue-600 text-sm hover:scale-105">
                              Reviews (0)
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-4 text-center text-gray-500">No content available from this user.</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No users found.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewPage;
