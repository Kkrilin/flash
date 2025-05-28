import React, { useEffect, useState } from "react";
import CircularLoader from "../Common/Loader/CircularLoader";
import MyChart from "../Common/MyCharts.jsx/MyChart";
import {
  activityBaseUrl,
  dashboardActivityUrl,
  requestConfig,
} from "../../helper/api";
import axios from "axios";
import DashBoardCard from "../Dashboard/DashBoardCard";

export default function DashBoardPage() {
  const [dashbordData, setDashboardData] = useState([]);
  const [chartData, setchartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(dashboardActivityUrl, requestConfig);
      console.log(response.data);
      setDashboardData(response.data.dashboardActivity);
      setchartData(response.data.chartData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

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

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="mx-auto">
      <h2 className="text-2xl my-4 mx-10">Dashboard</h2>
      <div className="flex gap-4 px-10  w-full ">
        <div className="w-1/2 mx-auto">
          <div
            className="custom_scroll flex flex-wrap gap-4 p-10 rounded-2xl"
            style={{
              backgroundColor: "#121212",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {dashbordData.map((dd) => {
              const speed = dd.distance_meter / dd.timer_second;
              return (
                <DashBoardCard
                  speed={speed}
                  dd={dd}
                  handleDashboardDeleteClick={handleDashboardDeleteClick}
                />
              );
            })}
          </div>
        </div>
        <div className="h-[80vh] w-1/2 bg-neutral-800">
          <MyChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
