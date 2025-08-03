// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router";
import { CircularProgress } from "@mui/material";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <>
        <CircularProgress color="primary" size={50} />
      </>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
