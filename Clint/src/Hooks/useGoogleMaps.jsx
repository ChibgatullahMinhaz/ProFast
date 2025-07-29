import React, { useContext } from "react";
import { GoogleMapsContext } from "../Context/Context/MapsContext";

const useGoogleMaps = () => {
  const googleApis = useContext(GoogleMapsContext);
  return googleApis;
};

export default useGoogleMaps;
