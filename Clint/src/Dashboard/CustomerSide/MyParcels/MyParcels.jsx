import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import axiosSecure from "../../../api/axiosSecure";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <CircularProgress color="primary" size={50} />
      </div>
    );
  }

  const handleView = (id) => {
    navigate(`/user/dashboard/parcel/Details/${id}`);
  };

  const handlePay = (id) => {
    navigate(`/user/dashboard/pay/for/parcel/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e11d48", // red-600
      cancelButtonColor: "#6b7280", // gray-500
    });
    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Parcel has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          refetch();
        } else {
          Swal.fire({
            icon: "error",
            title: "error",
            text: "something wrong, Please try again",
            confirmButtonColor: "#e11d48",
          });
        }
      } catch (err) {
        Swal.fire("Error", err.message || "Failed to delete parcel", "error");
      }
    }
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleString();
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-xl">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base font-semibold">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id} className="border border-pink-400">
              <td>{index + 1}</td>
              <td className="max-w-[180px] truncate">{parcel.title}</td>
              <td className="capitalize">{parcel.type}</td>
              <td>{formatDate(parcel.creation_date)}</td>
              <td>৳{parcel.cost}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  onClick={() => handleView(parcel._id)}
                  className="btn btn-xs btn-outline"
                >
                  View
                </button>
                {parcel.payment_status === "unpaid" && (
                  <button
                    onClick={() => handlePay(parcel._id)}
                    className="btn btn-xs btn-primary text-black"
                  >
                    Pay
                  </button>
                )}
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {parcels.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-gray-500 py-6">
                No parcels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
