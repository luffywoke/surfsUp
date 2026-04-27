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
    // Sandy beige background centered layout
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        
        {/* White card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Create Meetup 🏄</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Skill Level"
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-900 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
                >
                    Create Meetup
                </button>
            </form>
        </div>
    </div>
)
}



export default CreateMeetup;