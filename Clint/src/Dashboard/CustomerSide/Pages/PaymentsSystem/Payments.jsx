import React from "react";
import { useParams } from "react-router";

const Payments = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default Payments;
