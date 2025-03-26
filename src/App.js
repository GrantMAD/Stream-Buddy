import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './Components/Home';
import Profile from './Components/Profile';
import ViewPage from './Components/ViewPage';
import SignUpPage from './Components/SignUpPage';
import LoginPage from './Components/LoginPage';
import Navbar from './Components/Navbar';
import ReviewForm from './Components/ReviewForm';
import ContactPage from './Components/ContactPage';
import NewContentForm from './Components/NewContentForm';
import AboutUs from './Components/AboutUs';
import Footer from './Components/Footer';

const App = () => {
  const [showNav, setShowNav] = useState(true);

  return (
    <Router>
      { showNav &&
        <Navbar/>
      }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ViewPage" element={<ViewPage />} />
          <Route path="/LoginPage" element={<LoginPage funcNav={setShowNav}/>} />
          <Route path="/SignUpPage" element={<SignUpPage funcNav={setShowNav}/>} />
          <Route path="/NewContentForm" element={<NewContentForm />} />
          <Route path="/ReviewForm" element={<ReviewForm />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
        { showNav &&
        <Footer/>
      }
    </Router>
  );
}

export default App;

