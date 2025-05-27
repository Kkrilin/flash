import React from "react";
import Header from "../Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";

export default function AuthLayout() {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  if (isAuthenticated) {
    return <Navigate to="/user/performance" />;
  }
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="flex flex-col"
    >
      <Header />
      <div className="flex-1">
        <LandingPage>
          <Outlet />
        </LandingPage>
      </div>
    </div>
  );
}
