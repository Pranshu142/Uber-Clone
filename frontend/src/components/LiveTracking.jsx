import { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
        alert(`Error ${error.code}: ${error.message}`);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {currentPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={13}
        >
          <Marker position={currentPosition}></Marker>
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default LiveTracking;
