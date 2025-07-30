import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import { CircularProgress } from "@mui/material";

const AgentRoutes = ({ children }) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) return <CircularProgress color="primary" size={50} />;

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (userRole?.role !== "rider") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AgentRoutes;
