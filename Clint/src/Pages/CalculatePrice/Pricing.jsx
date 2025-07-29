import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useGoogleMaps from "../../Hooks/useGoogleMaps";
import axios from "axios";
import LoadingOverlay from "../../Components/ui/LoadingOverlay";

const Pricing = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const origin = "Dhaka";

  const calculatePrice = async ({ parcelType, destination, weight }) => {
    const res = await axios.get(`http://localhost:5000/distance`, {
      params: { origin, destination },
    });
    const distanceInKm =
      res.data?.rows?.[0]?.elements?.[0]?.distance?.value / 1000;
    const baseRate = parcelType === "document" ? 60 : 120;
    const total = Math.round(distanceInKm * baseRate * parseFloat(weight));
    return total;
  };

  const {
    mutate: calculate,
    data: totalPrice,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: calculatePrice,
  });

  const onSubmit = (data) => {
    calculate(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 bg-white rounded-lg my-10 py-10">
      {/* Title */}
      <div className="mb-10 text-left">
        <h2 className="text-3xl font-bold text-gray-800">Pricing Calculator</h2>
        <p className="text-gray-500 max-w-xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Calculate Title */}
      <div className="mb-6 text-left">
        <h3 className="text-2xl font-semibold text-gray-700">
          Calculate Your Cost
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parcel Type */}
            <div>
              <label className="label">Parcel Type</label>
              <select
                {...register("parcelType", { required: true })}
                className="select border border-gray-400 w-full"
              >
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-document</option>
              </select>
              {errors.parcelType && (
                <p className="text-red-500 text-sm">Parcel type is required</p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label className="label">Delivery Destination</label>
              <input
                {...register("destination", { required: true })}
                className="input border border-gray-400 w-full"
                placeholder="e.g., Chittagong"
              />
              {errors.destination && (
                <p className="text-red-500 text-sm">Destination is required</p>
              )}
            </div>

            {/* Weight */}
            <div>
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                {...register("weight", {
                  required: true,
                  min: 0.1,
                })}
                className="input border border-gray-400 w-full"
                placeholder="e.g., 5"
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">Valid weight is required</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="space-x-4 mt-4">
            <button
              type="submit"
              className="btn btn-primary border-none bg-[#C4E970] rounded-lg text"
              disabled={isLoading}
            >
              {isLoading ? "Calculating..." : "Calculate"}
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
              }}
              className="btn btn-outline border-none bg-[#C4E970] rounded-lg text"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Right: Price Summary */}
        <div className="p-6 rounded-lg text-center">
          <h4 className="text-xl font-bold mb-4 text-gray-700">Total Price</h4>
          {isError ? (
            <p className="text-red-600">
              Failed to fetch price. Check destination.
            </p>
          ) : (
            <p className="text-3xl font-extrabold text-blue-600">
              {totalPrice || '00'} ৳
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
