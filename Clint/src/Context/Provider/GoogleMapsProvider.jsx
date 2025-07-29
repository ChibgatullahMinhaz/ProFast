import axios from "axios";
import { GoogleMapsContext } from "../Context/MapsContext";

export const GoogleMapsProvider = ({ children }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const geocode = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data?.results?.[0]?.geometry?.location || null;
  };

  const getDirections = async (origin, destination, waypoints = []) => {
    const waypointsParam = waypoints.length
      ? `&waypoints=${waypoints.join("|")}`
      : "";
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}${waypointsParam}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data?.routes?.[0] || null;
  };

  const value = {
    apiKey,
    geocode,
    getDirections,
  };

  return (
    <GoogleMapsContext.Provider value={value}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
