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
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}> 
                <input
                    type = "text"
                    placeholder = "Username"
                    value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type = 'email'
                    placeholder = "Email"
                    value = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type = 'password'
                    placeholder = "Password"
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}



export default Register;