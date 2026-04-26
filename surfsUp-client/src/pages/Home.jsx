import { Link } from "react-router-dom";

function Home() {
    return (
        // Full screen hero section with ocean blue gradient background
        <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 flex flex-col items-center justify-center text-white">
            
            {/* Main headline */}
            <h1 className="text-6xl font-bold mb-4">SurfsUp 🏄</h1>
            
            {/* Tagline */}
            <p className="text-xl mb-8 text-blue-100">Find your wave. Meet your crew. Ride together.</p>
            
            {/* Sandy beige card with info */}
            <div className="bg-amber-50 text-blue-900 rounded-2xl p-8 max-w-md text-center shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Welcome to SurfsUp!</h2>
                <p className="text-gray-600">Connect with surfers in your area, organize meetups, and buy or sell surf gear in our marketplace.</p>
            </div>
            <div className="gap-4 flex mt-8">
                <Link to="/login">
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
                        Sign in!
                    </button>
                </Link>
                <Link to="/register">
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
                        Get Started!
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home;