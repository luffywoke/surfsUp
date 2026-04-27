import {useState, useEffect} from 'react';


function MyListings() {
    // Store all listings in an array
    const [listings, setListings] = useState([]);

    // Fetch my listings when page loads
    useEffect(() => {
        const fetchMyListings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/listings/my', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setListings(data);
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };
        fetchMyListings();
    }, []);

    // Handle listing update
    const handleUpdate = async (ListingId) => {
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/listings/${ListingId}/sold`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Listing updated successfully!');
                // Refresh listings list to show updated information
                setListings(listings.map(l => l._id === ListingId ? data.listing : l));

            }
        } catch (error) {
            console.error('Error updating listing:', error);
        }
    };

    return (
        <div className="min-h-screen bg-amber-50 flex py-8 px-4">
            <div className="gap-6 mb-8">
                <h1 className="text-6xl font-bold mb-6 text-blue-900 text-center max-w-6xl mx-auto">My Surf Listings</h1>
            </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((listing) => (
                        <div key={listing._id} className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                            <p className="text-gray-600 mb-2">Price: ${listing.price.toFixed(2)}</p>
                            <p className="text-gray-600 mb-2">Condition: {listing.condition}</p>
                            <p className="text-gray-600 mb-2">Description: {listing.description}</p>
                            {listing.photoURL && <img src={listing.photoURL} alt={listing.title} />}
                            <p className="text-lg font-bold">{listing.isSold ? 'SOLD' : 'Available'}</p>
                            <button onClick={() => handleUpdate(listing._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Mark as Sold
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MyListings;