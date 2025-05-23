import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ProfileHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="p-3 bg-amber-400 h-14">
      <header className="flex items-center justify-between">
        <h1>ActNow</h1>
        <ul className="flex gap-2">
          <Link to="/user/dashboard">Dashboard</Link>
          <Link to="/user/performance">Performance</Link>
          <Link to="/user/activity">Activity</Link>
          <Link to="/user/profile">Profile</Link>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </header>
    </div>
  );
}
