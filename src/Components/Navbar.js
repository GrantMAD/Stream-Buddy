import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        } else {
          console.log("No such document!");
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleLogout = () => {
    auth.signOut();
    setUserName(null);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-700 shadow shadow-gray-300 w-100 px-8 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="text-blue-600 md:order-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={handleMenuToggle}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-indigo-500 text-2xl" />
          </button>
        </div>

        {/* Navbar Links */}
        <div className={`text-gray-500 order-3 w-full md:w-auto md:order-2 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex font-semibold justify-between text-sm">
            <li className="md:px-4 md:py-2 text-white m-3 hover:scale-125"><a href="/">Home</a></li>
            <li className="md:px-4 md:py-2 text-white m-3 hover:scale-125"><a href="/AboutUs">About Us</a></li>
            <li className="md:px-4 md:py-2 text-white m-3 hover:scale-125"><a href="/ViewPage">ViewPage</a></li>
            <li className="md:px-4 md:py-2 text-white m-3 hover:scale-125"><a href="/ContactPage">Contact Us</a></li>
          </ul>
        </div>

        {/* Conditionally render Login/SignUp or Avatar dropdown */}
        <div className="flex order-3 md:order-2">
          {!user ? (
            <>
              <Link to="/LoginPage">
                <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 mr-3">
                  <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5" />
                  <span>Login</span>
                </button>
              </Link>
              <Link to="/SignUpPage">
                <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                  <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5" />
                  <span>SignUp</span>
                </button>
              </Link>
            </>
          ) : (
            // Avatar and Dropdown when logged in
            <div className="relative flex items-center">
              <button
                className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center mr-2 hover:scale-125"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {/* Font Awesome icon as avatar */}
                <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
              </button>

              {/* Welcome Text */}
              <div className="text-white text-sm font-semibold">
                <h1>Welcome,</h1>
                {userName || 'User'}
              </div>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <ul className="absolute right-20 mt-40 bg-white shadow-lg rounded-lg w-40 p-2">
                  <li className="w-full text-left py-2 px-4 text-blue-600 hover:bg-gray-200">
                    <a href="/Profile">Profile</a>
                  </li>
                  <li className="w-full text-left py-2 px-4 text-blue-600 hover:bg-gray-200" onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
