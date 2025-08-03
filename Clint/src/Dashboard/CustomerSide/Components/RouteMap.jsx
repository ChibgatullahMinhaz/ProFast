import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import { GoogleMapsContext } from "../../../Context/Context/MapsContext";

const RouteMap = ({ senderRegion, receiverRegion }) => {
  const { apiKey, geocode, getDirections } = useContext(GoogleMapsContext);
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: apiKey });

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const loadRoute = async () => {
      if (!senderRegion || !receiverRegion || !isLoaded) return;

      const origin = await geocode(senderRegion);
      const destination = await geocode(receiverRegion);

      if (origin && destination) {
        const route = await getDirections(
          `${origin.lat},${origin.lng}`,
          `${destination.lat},${destination.lng}`
        );
        setDirections(route);
      }
    };

    loadRoute();
  }, [senderRegion, receiverRegion, isLoaded, geocode, getDirections]);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      zoom={6}
      center={{ lat: 23.685, lng: 90.3563 }} // Bangladesh center fallback
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default RouteMap;
