import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapStyles = {
  height: "750px",
  width: "100%"
};

const MapContainer = ({ location, markerLocation }) => {
  const [apiLoaded, setApiLoaded] = useState(false);

  const apiIsLoaded = () => {
    setApiLoaded(true);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      onLoad={apiIsLoaded}
    >
      {apiLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={location ? { lat: location.latitude, lng: location.longitude } : { lat: 22.8226195, lng: 75.9432751 }}
        >
          {markerLocation && (
            <Marker
              position={{ lat: markerLocation.latitude, lng: markerLocation.longitude }}
              animation={window.google.maps.Animation.DROP}
            />
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default MapContainer;
