"use client"

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// ข้อมูลตัวอย่าง
const locations = [
  { city: 'Los Angeles', state: 'California', country: 'USA' },
  { city: 'Toronto', state: 'Ontario', country: 'Canada' },
  { city: 'Tokyo', state: 'Tokyo', country: 'Japan' }
];

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const WorldMap = () => {
  const [positionData, setPositionData] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coords = await Promise.all(
        locations.map(async (location) => {
          const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
            params: {
              q: `${location.city}, ${location.state}, ${location.country}`,
              key: '8ff0678a9d684725910e6a56130575ae', // แทนที่ด้วย API Key ของคุณ
            },
          });
          const { lat, lng } = response.data.results[0].geometry;
          return { ...location, lat, lng };
        })
      );
      setPositionData(coords);
    };

    fetchCoordinates();
  }, []);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {positionData.map((location, idx) => (
        <Marker key={idx} position={[location.lat, location.lng]} icon={customIcon}>
          <Popup>{`${location.city}, ${location.state}, ${location.country}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WorldMap;
