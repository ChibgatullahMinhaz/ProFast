import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import axiosSecure from "../../../../api/axiosSecure";

const ParcelDetails = () => {
  const { id } = useParams();
  const {data, isLoading} = useQuery({
    queryKey:['my-parcel-details'],
    queryFn:async ()=>{
      const res = await axiosSecure('/')
    }
  })
  return <div>{id}</div>;
};

export default ParcelDetails;
