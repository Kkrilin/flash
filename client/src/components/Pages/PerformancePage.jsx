import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { activityBaseUrl, requestConfig } from "../../helper/api";
import CircularLoader from "../Common/Loader/CircularLoader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function PerformancePage() {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState({});

  const getAllActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get(activityBaseUrl, requestConfig);
      setActivities(response.data.activities);
      console.log(response.data, 22222);
    } catch (error) {
      console.log(error);
    } finally {
      // setTimeout(() => {
      setLoading(false);
      // }, 2000);
    }
  };

  useEffect(() => {
    getAllActivities();
  }, []);

  const updateActivity = async (act) => {
    try {
      const res = await axios.put(
        `${activityBaseUrl}/${act.id}`,
        { visible_dashboard: !act.visible_dashboard },
        requestConfig
      );

      const newActvities = [...activities];
      const index = newActvities.findIndex((ac) => ac.id === act.id);
      newActvities[index] = res.data.activity;
      setActivities(newActvities);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDashBoardClick = (act) => {
    updateActivity(act);
  };

  const deleteActivity = async (actId) => {
    try {
      const res = await axios.delete(
        `${activityBaseUrl}/${actId}`,
        requestConfig
      );
      console.log(res.data);
      setActivities((prv) => prv.filter((ac) => ac.id !== actId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (actId) => {
    deleteActivity(actId);
  };

  const handleSort = (sortType) => {
    switch (sortType) {
      case "speed":
        setSort((prv) => {
          if (prv.speed === undefined) {
            return {
              speed: "asc",
            };
          } else if (prv.speed === "asc") {
            return {
              speed: "desc",
            };
          } else {
            return {};
          }
        });
        break;
      case "date":
        setSort((prv) => {
          if (prv.date === undefined) {
            return {
              date: "asc",
            };
          } else if (prv.date === "asc") {
            return {
              date: "desc",
            };
          } else {
            return {};
          }
        });
    }
  };

  let filteredActivities = [...activities];

  if (filter === "fav") {
    console.log("filter", filter);
    filteredActivities = activities.filter((act) => act.isfav);
  }

  if (sort.speed) {
    filteredActivities = [...filteredActivities].sort((a, b) =>
      sort.speed === "asc"
        ? a.distance_meter / a.timer_second - b.distance_meter / b.timer_second
        : b.distance_meter / b.timer_second - a.distance_meter / a.timer_second
    );
  } else if (sort.date) {
    filteredActivities = [...filteredActivities].sort((a, b) => {
      const first = new Date(a.created_at);
      const second = new Date(b.created_at);
      return sort.date === "asc" ? first - second : second - first;
    });
  }

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="flex justify-center w-full items-center">
      <div className="p-4 rounded-md bg-neutral-800  h-200 min-w-150">
        <h1 className="text-2xl font-extrabold">Performance</h1>
        <div className="flex items-center gap-2">
          <h1 className="capitalize">filter: </h1>
          <button
            className="py-2 px-4 bg-neutral-600 rounded-2xl my-2 capitalize font-medium text-white"
            onClick={() =>
              filter === "fav" ? setFilter("") : setFilter("fav")
            }
          >
            favorite
          </button>
        </div>
        <div className="custom_scroll flex justify-center max-h-160 overflow-y-auto relative">
          <table>
            <thead className="sticky top-0">
              <tr>
                <th>S.no</th>
                <th>activityName</th>
                <th onClick={() => handleSort("speed")}>
                  speed
                  <span>
                    {sort.speed === "asc" && <ArrowUpwardIcon />}
                    {sort.speed === "desc" && <ArrowDownwardIcon />}
                  </span>
                </th>
                <th>delete</th>
                <th onClick={() => handleSort("date")}>
                  date
                  <span>
                    {sort.date === "asc" && <ArrowUpwardIcon />}
                    {sort.date === "desc" && <ArrowDownwardIcon />}
                  </span>
                </th>
                <th>dashboard</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((act, i) => {
                const speed = act.distance_meter / act.timer_second;
                return (
                  <tr>
                    <th>{i + 1}</th>
                    <td>
                      {act.name}
                      {act.isfav ? (
                        <FavoriteIcon className="text-red-300 px-1" />
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      {(["swimming", "walking"].includes(act.name)
                        ? speed
                        : speed / 1000
                      ).toFixed(3)}
                      <span>
                        {" "}
                        {["swimming", "walking"].includes(act.name)
                          ? "m/s"
                          : "km/s"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(act.id)}
                        className="px-2 py-1 rounded-xl bg-neutral-700"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                    <td>{new Date(act.created_at).toLocaleDateString()}</td>
                    <td className="text-center">
                      <button
                        className="px-2 py-1  rounded-xl bg-neutral-700"
                        onClick={() => handleDashBoardClick(act)}
                      >
                        {act.visible_dashboard ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
