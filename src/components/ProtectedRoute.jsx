import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../dashboard/context/AuthContext";
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useAuth();

  if (loading) return <Spinner text="Authenticating..." />;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
