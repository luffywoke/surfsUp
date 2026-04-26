import { useState } from 'react';

function Login({setIsLoggedIn}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        // Prevents page from refreshing on submit like regular HTML forms
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Send the form data here as JSON
                body: JSON.stringify({email, password})
            });

            const data = await response.json();
            // Storing token to be able to use for later
            if (response.ok && data.token) {
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
            }
            else {
                console.error('Login failed:', data.message || 'Unknown error');
            }
            
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        // Sandy beige background centered layout
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
            
            {/* White card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Login 🏄</h1>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-900 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;