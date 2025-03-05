import React, { useState } from 'react';

const GeoLocation = () => {
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with your actual Google Maps API Key
    const apiKey = 'YOUR_API_KEY';
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === 'OK') {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress('No address found');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  return (
    <div>
      <h1>Reverse Geocoding in Next.js</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Address</button>
      </form>

      {address && (
        <div>
          <h3>Address:</h3>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
};

export default GeoLocation;
