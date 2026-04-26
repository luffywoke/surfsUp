import {useState, useEffect} from 'react';

function Profile() {
    const [profile, setProfile] = useState('null');
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
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-blue-900">My Profile</h1>
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Skill Level"
                        value={skillLevel}
                        onChange={(e) => setSkillLevel(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Profile Photo URL"
                        value={profilePhoto}
                        onChange={(e) => setProfilePhoto(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                        type="text"
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;

