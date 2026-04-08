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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login;