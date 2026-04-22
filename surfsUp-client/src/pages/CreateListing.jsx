import { useState } from 'react';

function CreateListing() {
    // Create state variables for user, title, description, price, and image URL
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        // Prevents page from refreshing on submit like regular HTML forms
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Send the form data here as JSON
                body: JSON.stringify({title, price, condition, description, photoURL})
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
            <h1>Create Listing</h1>
            <form onSubmit={handleSubmit}> 
                <input
                    type = "text"
                    placeholder = "Title"
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type = 'number'
                    placeholder = "Price"
                    value = {price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type = 'text'
                    placeholder = "Condition"
                    value = {condition}
                    onChange={(e) => setCondition(e.target.value)}
                />
                <input
                    type = 'text'
                    placeholder = "Description"
                    value = {description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type = 'url'
                    placeholder = "Photo URL"
                    value = {photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateListing;
                    