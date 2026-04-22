import React from 'react';
import { useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Meetups from './pages/Meetups';
import CreateMeetup from './pages/CreateMeetup';
import Listings from './pages/Listings';
import CreateListing from './pages/CreateListing';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Checking if token exists in localStorage
        return localStorage.getItem('token') !== null;
    });

    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }
    

    return (
        // Display different content based on login status
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Welcome Back!</p>
                    <button onClick={handleLogout}>Logout</button>
                    <Link to="/profile">My Profile</Link>
                    <Link to="/meetups">Meetups</Link>
                    <Link to="/create-meetup">Create Meetup</Link>
                    <Link to="/listings">Listings</Link>
                    <Link to="/create-listing">Create Listing</Link>
                </div>
            ) : (
                <div>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            )}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> 
                <Route path="/profile" element={<Profile />} />
                <Route path="/meetups" element={<Meetups />} />
                <Route path="/create-meetup" element={<CreateMeetup />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/create-listing" element={<CreateListing />} />
            </Routes>
        </div>
    )
}

export default App;