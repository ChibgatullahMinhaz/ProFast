// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hook/useAuth";
import { CircularProgress } from "@mui/material";

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
