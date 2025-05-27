import React from "react";
import swimingImgae from "../../assets/swimming.jpeg";
import cycling from "../../assets/cycling.jpeg";
import Header from "../Header/Header";
import { Navigate, Outlet } from "react-router-dom";

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
        <main className="flex h-full">
          <div
            style={{
              background: `url(${swimingImgae})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "30%",
              objectFit: "contain",
              opacity: "0.6",
            }}
          ></div>
          <div
            // className="bg-amber-950"
            style={{
              // background: `url(${running})`,
              // backgroundSize: "cover",
              // backgroundPosition: "center",
              // backgroundRepeat: "no-repeat",
              // height: "100%",
              // objectFit: "contain",
              width: "40%",
            }}
          >
            <Outlet />
          </div>
          <div
            style={{
              background: `url(${cycling})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "30%",
              objectFit: "contain",
              opacity: "0.6",
            }}
          ></div>
        </main>
      </div>
    </div>
  );
}
