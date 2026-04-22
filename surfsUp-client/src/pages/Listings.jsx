import {useState, useEffect} from 'react';

function Listings() {
    // Store all listings in an array
    const [listings, setListings] = useState([]);

    // Fetch listings when page loads
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/listings', {
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
        fetchListings();
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
        <div>
            <h1>Surf Listings</h1>
            {listings.map((listing) => (
                <div key={listing._id}>
                    <h2>{listing.title}</h2>
                    <p>Price: ${listing.price.toFixed(2)}</p>
                    <p>Condition: {listing.condition}</p>
                    <p>Description: {listing.description}</p>
                    <img src={listing.photoURL} alt={listing.title} />
                    <p>{listing.isSold ? 'SOLD' : 'Available'}</p>
                    <button onClick={() => handleUpdate(listing._id)}>Mark as Sold</button>
                </div>
            ))}
        </div>
    );
}

export default Listings;