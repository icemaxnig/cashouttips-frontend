// src/components/RedirectIfAuth.jsx
import { useAuth } from "../dashboard/context/AuthContext";
import { Navigate } from "react-router-dom";

const RedirectIfAuth = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default RedirectIfAuth;
