import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const OptimizedRouteMap = () => {
  const [directions, setDirections] = useState(null);

  const agentLocation = { lat: 23.7808875, lng: 90.2792371 }; // উদাহরণ: ঢাকার একটি পয়েন্ট
  const deliveryPoints = [
    { location: { lat: 23.7916, lng: 90.4006 } }, // গুলশান
    { location: { lat: 23.7785, lng: 90.3846 } }, // বনানী
    { location: { lat: 23.8741, lng: 90.4004 } }, // উত্তরা
  ];

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: agentLocation,
        destination: agentLocation, // Optional: অফিসে ফিরে আসা
        waypoints: deliveryPoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={{ height: "500px", width: "100%" }} center={agentLocation} zoom={12}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default OptimizedRouteMap;
