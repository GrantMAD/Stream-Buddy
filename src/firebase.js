// src/firebase.js
 import { initializeApp } from 'firebase/app';
 import { getAuth } from 'firebase/auth';
 import { getFirestore } from 'firebase/firestore';

 const firebaseConfig = {
     apiKey: "AIzaSyDAnaOq8F8-1vGHIdaQ-C1cdlL3k2GbuXY",
     authDomain: "stream-buddy-8e4c4.firebaseapp.com",
     projectId: "stream-buddy-8e4c4",
     storageBucket: "stream-buddy-8e4c4.firebasestorage.app",
     messagingSenderId: "1090515586705",
     appId: "1:1090515586705:web:3e83d7cfff5dbe7bf13930"
   };

 const app = initializeApp(firebaseConfig);

 // Initialize Firebase services
 export const auth = getAuth(app);
 export const db = getFirestore(app);



