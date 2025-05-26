import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ redirectTo = "/", children }) {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
