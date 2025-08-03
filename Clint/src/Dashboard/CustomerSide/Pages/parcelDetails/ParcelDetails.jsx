import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import useGoogleMaps from "../../../../Hooks/useGoogleMaps";
import axiosSecure from "../../../../api/axiosSecure";
import RouteMap from "../../Components/RouteMap";

const ParcelDetails = () => {
  const { id } = useParams();
  const { geocode, getDirections, apiKey } = useGoogleMaps();

  const { data, isLoading } = useQuery({
    queryKey: ["my-parcel-details", id],
    queryFn: async () => {
      const res = await axiosSecure(`/parcel/details/${id}`);
      return res.data;
    },
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const fetchDirections = async () => {
      if (!data?.sender_region || !data?.receiver_region || !isLoaded) return;

      const origin = await geocode(data.sender_region);
      const destination = await geocode(data.receiver_region);

      if (origin && destination) {
        const directionsData = await getDirections(
          `${origin.lat},${origin.lng}`,
          `${destination.lat},${destination.lng}`
        );
        setDirections(directionsData);
      }
    };

    fetchDirections();
  }, [data, geocode, getDirections, isLoaded]);

  if (isLoading) return <div className="p-6">Loading parcel details...</div>;
  if (!data) return <div className="p-6 text-red-500">Parcel not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="font-bold text-pink-800 text-center text-xl mb-4">
        See Full Details of Your Booked Parcel
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Parcel Details */}
        <div className="bg-[#F0F3F6] p-4 rounded shadow space-y-3">
          <h2 className="text-lg font-semibold border-b pb-2">
            Parcel Information
          </h2>

          <div>
            <strong>Tracking ID:</strong> {data.tracking_id}
          </div>
          <div>
            <strong>Title:</strong> {data.title}
          </div>
          <div>
            <strong>Type:</strong> {data.type}
          </div>
          <div>
            <strong>Weight:</strong> {data.weight} kg
          </div>
          <div>
            <strong>Cost:</strong> ৳{data.cost}
          </div>
          <div>
            <strong>Payment Status:</strong> {data.payment_status}
          </div>
          <div>
            <strong>Delivery Status:</strong> {data.delivery_status}
          </div>
          <div>
            <strong>Created On:</strong>{" "}
            {new Date(data.creation_date).toLocaleString()}
          </div>

          <h2 className="text-lg font-semibold border-b pt-4 pb-2">
            Sender Info
          </h2>
          <div>
            <strong>Name:</strong> {data.sender_name}
          </div>
          <div>
            <strong>Email:</strong> {data.sender_email}
          </div>
          <div>
            <strong>Contact:</strong> {data.sender_contact}
          </div>
          <div>
            <strong>Region:</strong> {data.sender_region}
          </div>
          <div>
            <strong>Center:</strong> {data.sender_center}
          </div>
          <div>
            <strong>Address:</strong> {data.sender_address}
          </div>
          <div>
            <strong>Pickup Note:</strong> {data.pickup_instruction}
          </div>

          <h2 className="text-lg font-semibold border-b pt-4 pb-2">
            Receiver Info
          </h2>
          <div>
            <strong>Name:</strong> {data.receiver_name}
          </div>
          <div>
            <strong>Contact:</strong> {data.receiver_contact}
          </div>
          <div>
            <strong>Region:</strong> {data.receiver_region}
          </div>
          <div>
            <strong>Center:</strong> {data.receiver_center}
          </div>
          <div>
            <strong>Address:</strong> {data.receiver_address}
          </div>
          <div>
            <strong>Delivery Note:</strong> {data.delivery_instruction}
          </div>
        </div>

        {/* Right: Map */}
        <div className="w-full h-[500px]">
          {isLoaded ? (
            <RouteMap
              senderRegion={data.sender_region}
              receiverRegion={data.receiver_region}
            />
          ) : (
            <div>Loading Map...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParcelDetails;
