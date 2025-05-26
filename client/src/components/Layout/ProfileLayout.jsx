import React, { useEffect, useState } from "react";
import ProfileHeader from "../Header/ProfileHeader";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProfileData } from "../../redux/slice/profileSlice";
import axios from "axios";
import { userBaseUrl, requestConfig } from "../../helper/api";
import toast from "react-hot-toast";
import CircularLoader from "../Common/Loader/CircularLoader";

export default function ProfileLayout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  requestConfig.headers.Authorization = `Bearer ${token}`;
  const fetchUser = async () => {
    try {
      const res = await axios.get(userBaseUrl, requestConfig);
      console.log(res.data.user);
      dispatch(setProfileData(res.data.user));
    } catch (error) {
      toast.error("someting went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div
      style={{
        height: "100vh",
      }}
      className="flex flex-col"
    >
      <ProfileHeader />
      <div className="flex-1">
        <main
          style={{
            backgroundColor: "#1e1e1e",
          }}
          className="flex h-full"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
