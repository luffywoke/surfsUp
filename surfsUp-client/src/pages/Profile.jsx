import {useState, useEffect} from 'react';

function Profile() {
    const [profile, setProfile] = useState('');
    const [skillLevel, setSkillLevel] = useState('');
    const [location, setLocation] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [bio, setBio] = useState('');

    // Fetch profile when page loads
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setProfile(data);
                    setSkillLevel(data.skillLevel || '');
                    setLocation(data.location || '');
                    setProfilePhoto(data.profilePhoto || '');
                    setBio(data.bio || '');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ skillLevel, location, profilePhoto, bio })
            });
            const data = await response.json();
            if (response.ok) {
                setProfile(data.profile);
                console.log('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <h1>My Profile</h1>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Skill Level"
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Profile Photo URL"
                    value={profilePhoto}
                    onChange={(e) => setProfilePhoto(e.target.value)}
                />
                <textarea
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default Profile;

