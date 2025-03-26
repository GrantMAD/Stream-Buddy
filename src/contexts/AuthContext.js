import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Assuming your Firebase configuration is in this file
import { onAuthStateChanged } from 'firebase/auth';

// Create a context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // Set the user object or null if not authenticated
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
