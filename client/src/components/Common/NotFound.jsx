import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function NotFound() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="m-auto">
      <div className="bg-neutral-500 rounded-2xl p-6">
        <h1>Page not Found</h1>
        <Link to="/user/profile">
          <button>profile</button>
        </Link>
      </div>
    </div>
  );
}
