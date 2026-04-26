import {useState, useEffect} from 'react';

function Meetups() {
    // Store all meetups in an array
    const [meetups, setMeetups] = useState([]);

    // Fetch meetups when page loads
    useEffect(() => {
        const fetchMeetups = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/meetups', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setMeetups(data);
                }
            } catch (error) {
                console.error('Error fetching meetups:', error);
            }
        };
        fetchMeetups();
    }, []);

    // Handle meetup update
    const handleJoin = async (MeetupId) => {
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/meetups/${MeetupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Meetup joined successfully!');
                // Refresh meetups list to show updated participants
                setMeetups(meetups.map(m => m._id === MeetupId ? data.meetup : m));
            }
        } catch (error) {
            console.error('Error joining meetup:', error);
        }
    };

    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
            
                <h1 className="text-3xl font-bold mb-6 text-blue-900 text-center">Surf Meetups</h1>
                {meetups.map((meetup) => (
                    <div key={meetup._id} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-2">{meetup.location}</h2>
                        <p className="text-gray-600 mb-2">Date: {new Date(meetup.date).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-2">Skill Level: {meetup.skillLevel}</p>
                        <p className="text-gray-600 mb-2">Description: {meetup.description}</p>
                        <p className="text-gray-600 mb-4">Participants: {meetup.participants ? meetup.participants.length : 0}</p>
                        <button onClick={() => handleJoin(meetup._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Join Meetup
                        </button>
                    </div>
            ))}
        </div>
    );
}

export default Meetups;