import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ProfileHeader() {
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className=" h-14 flex items-center">
      <header className="flex items-center justify-between px-10 w-full">
        <div className="flex gap-20 items-center">
          <div className="flex items-center gap-2">
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              {profile.name && profile.name[0]}
            </Avatar>
            <h1 className="capitalize">{profile.name}</h1>
          </div>
          <h1>ActNow</h1>
        </div>
        <nav className="flex gap-25 items-center">
          <ul className="flex gap-10">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-neutral-700 py-2 px-4 rounded-3xl"
                  : "hover:bg-neutral-800 py-2 px-4 rounded-3xl"
              }
              to="/user/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-neutral-700 py-2 px-4 rounded-3xl"
                  : "hover:bg-neutral-800 py-2 px-4 rounded-3xl"
              }
              to="/user/performance"
            >
              Performance
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-neutral-700 py-2 px-4 rounded-3xl"
                  : "hover:bg-neutral-800 py-2 px-4 rounded-3xl"
              }
              to="/user/activity"
            >
              Activity
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-neutral-700 py-2 px-4 rounded-3xl"
                  : "hover:bg-neutral-800 py-2 px-4 rounded-3xl"
              }
              to="/user/profile"
            >
              Profile
            </NavLink>
          </ul>
          <button
            className="cursor-pointer flex gap-1 bg-white py-2 px-4 text-black rounded-3xl font-bold hover:bg-neutral-200"
            onClick={handleLogout}
          >
            Logout <LogoutIcon />
          </button>
        </nav>
      </header>
    </div>
  );
}
