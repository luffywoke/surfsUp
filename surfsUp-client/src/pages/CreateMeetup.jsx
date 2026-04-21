import { useState } from 'react';

function CreateMeetup() {
    // Create state variables for location, date,
    //  skill level, and description
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [description, setDescription] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        // Prevents page from refreshing on submit like regular HTML forms
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/meetups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Send the form data here as JSON
                body: JSON.stringify({location, date, skillLevel, description})
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
            <h1>Create Meetup</h1>
            <form onSubmit={handleSubmit}> 
                <input
                    type = "text"
                    placeholder = "Location"
                    value = {location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type = 'date'
                    placeholder = "Date"
                    value = {date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type = 'text'
                    placeholder = "Skill Level"
                    value = {skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                />
                <input
                    type = 'text'
                    placeholder = "Description"
                    value = {description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}



export default CreateMeetup;