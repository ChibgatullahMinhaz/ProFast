import { LoadScript } from "@react-google-maps/api";
import { GoogleMapsProvider } from "../Context/Provider/GoogleMapsProvider";
import LoadingOverlay from "../Components/ui/LoadingOverlay";

const libraries = ["places"];

const GoogleMapsLoader = ({ children }) => (
  <LoadScript
    googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    libraries={libraries}
    loadingElement={<LoadingOverlay />}
  >
    <GoogleMapsProvider>{children}</GoogleMapsProvider>
  </LoadScript>
);

export default GoogleMapsLoader;
