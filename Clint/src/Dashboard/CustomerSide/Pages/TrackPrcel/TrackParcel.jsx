import React, { useState } from "react";
import axiosSecure from "../../../../api/axiosSecure";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setParcel(null);
    setError("");
    if (!trackingId.trim()) return setError("Please enter a tracking ID.");
    setLoading(true);

    try {
      const { data } = await axiosSecure.get(`/parcel/track/${trackingId}`);
      setParcel(data);
    } catch (err) {
      setError("Parcel not found. Please check the tracking ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="flex items-center shadow-md rounded-full overflow-hidden border border-purple-300"
      >
        <input
          type="search"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID (e.g. PCL-20250803-K7FA1)"
          className="flex-1 px-4 py-3 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 font-semibold hover:bg-purple-700 transition-all"
        >
          Search
        </button>
      </form>

      {/* Status */}
      <div className="mt-4">
        {loading && <p className="text-gray-500">Loading parcel info...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {parcel && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50 space-y-2">
            <h2 className="text-lg font-bold text-purple-700">
              Tracking ID: {parcel.tracking_id}
            </h2>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{parcel.delivery_status}</span>
            </p>
            <p>
              <strong>Sender:</strong> {parcel.sender_name} (
              {parcel.sender_region})
            </p>
            <p>
              <strong>Receiver:</strong> {parcel.receiver_name} (
              {parcel.receiver_region})
            </p>
            <p>
              <strong>Weight:</strong> {parcel.weight} kg
            </p>
            <p>
              <strong>Type:</strong> {parcel.type}
            </p>
            <p>
              <strong>Cost:</strong> ${parcel.cost}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;
