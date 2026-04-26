import { useState } from 'react';

function Register() {
    // Create state variables for username, email, and password
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        // Prevents page from refreshing on submit like regular HTML forms
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Send the form data here as JSON
                body: JSON.stringify({username, email, password})
            });

            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
            
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Register 🏄</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4"> 
                    <input
                        type = "text"
                        placeholder = "Username"
                        value = {username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type = 'email'
                        placeholder = "Email"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type = 'password'
                        placeholder = "Password"
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-blue-900 text-white py-2 rounded-lg font-bold hover:bg-blue-700">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}



export default Register;