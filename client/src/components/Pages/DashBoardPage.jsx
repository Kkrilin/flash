import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularLoader from "../Common/Loader/CircularLoader";
import {
  activityBaseUrl,
  dashboardActivityUrl,
  requestConfig,
} from "../../helper/api";
import running from "../../assets/running.avif";
import swimming from "../../assets/swimming.jpeg";
import cycling from "../../assets/cycling.jpeg";
import axios from "axios";

const imageMap = {
  running: running,
  swimming: swimming,
  cycling: cycling,
};

export default function DashBoardPage() {
  const [dashbordData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(11111111111111);
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(dashboardActivityUrl, requestConfig);
      console.log(response.data);
      setDashboardData(response.data.dashboardActivity);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  const removeFromDashBoard = async (actId) => {
    try {
      const res = await axios.put(
        `${activityBaseUrl}/${actId}`,
        { visible_dashboard: false },
        requestConfig
      );

      setDashboardData((prv) => {
        return prv.filter((act) => act.id !== actId);
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDashboardDeleteClick = (activityId) => {
    removeFromDashBoard(activityId);
  };
  return (
    <div>
      <div className="px-20 py-10">
        <h2>Dashboard</h2>
        <div
          className="flex grow gap-4 p-10 rounded-2xl"
          style={{
            backgroundColor: "#121212",
            width: "80vw",
          }}
        >
          {dashbordData.map((dd) => (
            <div className="px-2 py-2 bg-neutral-800 rounded-md relative shadow-2xs">
              <img
                className="opacity-60"
                width={200}
                src={imageMap[dd.name]}
                alt=""
              />
              <div>
                <h1>activityName :{dd.name}</h1>
                <h1>time : {dd.timer / 1000} s</h1>
                <h1>
                  distance : {dd.distance}{" "}
                  {["swimming", "walking"].includes(dd.name) ? "m" : "km"}
                </h1>
                {dd.isfav ? (
                  <FavoriteIcon className="text-red-900  absolute top-3 left-3" />
                ) : (
                  ""
                )}
                <button
                  onClick={() => handleDashboardDeleteClick(dd.id)}
                  className="cursor-pointer text-neutral-500 hover:text-neutral-200 absolute top-3 right-3 p-1 bg-neutral-900 rounded-md "
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
