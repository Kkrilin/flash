import React from "react";
import ProfileHeader from "../Header/ProfileHeader";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="flex flex-col"
    >
      <ProfileHeader />
      <div className="flex-1">
        <main className="flex h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
