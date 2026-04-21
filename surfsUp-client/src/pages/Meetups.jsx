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
        <div>
            <h1>Surf Meetups</h1>
            {meetups.map((meetup) => (
                <div key={meetup._id}>
                    <h2>{meetup.location}</h2>
                    <p>Date: {new Date(meetup.date).toLocaleDateString()}</p>
                    <p>Skill Level: {meetup.skillLevel}</p>
                    <p>Description: {meetup.description}</p>
                    <p>Participants: {meetup.participants ? meetup.participants.length : 0}</p>
                    <button onClick={() => handleJoin(meetup._id)}>Join Meetup</button>
                </div>
            ))}
        </div>
    );
}

export default Meetups;