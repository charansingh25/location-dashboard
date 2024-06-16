import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapStyles = {
  height: "750px",
  width: "100%"
};

const MapContainer = ({ location }) => {
  const [apiLoaded, setApiLoaded] = useState(false); // Track if Google Maps API is loaded
  const defaultCenter = { lat: 0, lng: 0 }; // Default center when location is not provided
  const [markerPosition, setMarkerPosition] = useState(null); // State to store marker position

  // Function to check if Google Maps API is loaded
  const apiIsLoaded = () => {
    setApiLoaded(true);
  };

  // Update marker position when location changes
  useEffect(() => {
    if (location) {
    console.log("Helllllllllo");
      setMarkerPosition({ lat: location.latitude, lng: location.longitude });
      if(markerPosition){
      console.log(markerPosition);
      }
    }
  }, [location]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      onLoad={apiIsLoaded}
    >
      {apiLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={17}
          center={location ? { lat: location.latitude, lng: location.longitude } : defaultCenter}
        >
          {location && (
            <Marker
              position={markerPosition}
              animation={window.google.maps.Animation.DROP}
            />
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default MapContainer;
