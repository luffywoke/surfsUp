import React from 'react';
import { useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

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
            </Routes>
        </div>
    )
}

export default App;