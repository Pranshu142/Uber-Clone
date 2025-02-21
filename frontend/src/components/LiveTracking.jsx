import { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

/**
 * LiveTracking component that displays real-time user location on Google Maps
 * @component
 * @returns {JSX.Element} A Google Map component showing current user position with a marker
 *
 * @description
 * This component:
 * - Uses the Geolocation API to track user's current position
 * - Updates position in real-time using watchPosition
 * - Displays the location on a Google Map with a marker
 * - Cleans up the watch position listener on component unmount
 *
 * @requires {@link https://developers.google.com/maps/documentation/javascript/react-map Google Maps JavaScript API}
 * @requires react-google-maps/api
 *
 * @example
 * return (
 *   <LiveTracking />
 * )
 */
const LiveTracking = () => {
  // State to store the current position (latitude and longitude)
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    // Get initial position
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    // Watch for position changes
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

    // Cleanup: remove the watch position listener
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    // Load Google Maps with API key from environment variables
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {/* Only render map when we have a position */}
      {currentPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={18}
        >
          {/* Add marker at current position */}
          <Marker position={currentPosition}></Marker>
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default LiveTracking;
