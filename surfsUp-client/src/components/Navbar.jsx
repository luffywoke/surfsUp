import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout }) {
    return (
        <nav className="bg-blue-900 px-6 py-4 text-white justify-between flex items-center">
            <Link to="/" className="text-xl font-bold">SurfsUp 🏄</Link>
            <div className="flex gap-6">
                {isLoggedIn ? (
                    <div className="flex gap-4 items-center">
                        <button className="bg-white text-blue-900 px-4 py-2 rounded font-bold hover:bg-gray-100" onClick={handleLogout} >Logout</button>
                        <Link to="/profile" className="hover:underline">My Profile</Link>
                        <Link to="/meetups" className="hover:underline">Meetups</Link>
                        <Link to="/create-meetup" className="hover:underline">Create Meetup</Link>
                        <Link to="/listings" className="hover:underline">Listings</Link>
                        <Link to="/create-listing" className="hover:underline">Create Listing</Link>
                        <Link to="/my-listings" className="hover:underline">My Listings</Link>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </div>
                )}
            </div>

        </nav>
    )
}

export default Navbar;