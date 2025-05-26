import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { activityArray, emptyProfileField } from "../../helper/utils";
import { activityBaseUrl, requestConfig } from "../../helper/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ActivityPage() {
  const [activityName, setActivityName] = useState("swimming");
  const [distance, setDistance] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const profile = useSelector((state) => state.profile);
  const emptyField = emptyProfileField(profile);
  const [time, setTime] = useState(0);
  const [action, setAction] = useState("");
  const timer = useRef(null);

  const millsecond = time % 1000;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 60000) % 60);

  const handleAction = (action) => {
    switch (action) {
      case "start":
        console.log("distance", distance);
        if (!distance) {
          toast.error("distance is mandatory");
          return;
        }
        if (timer.current) clearInterval(timer.current);
        setAction("start");
        timer.current = setInterval(() => {
          setTime((prvState) => prvState + 10);
        }, 10);
        return;
      case "pause":
        setAction("pause");
        if (timer.current) {
          clearInterval(timer.current);
        }
        return;
      case "reset":
        setAction("reset");
        setTime(0);
        if (timer.current) {
          clearInterval(timer.current);
        }
        return;
    }
  };

  const resetData = () => {
    setActivityName("swimming");
    setDistance(1);
    setFavorite(false);
    handleAction("reset");
  };

  const createActivity = async () => {
    if (!time) {
      toast.error("please set timer");
      return;
    }
    if (!distance) {
      toast.error("distance is mandatory");
      return;
    }
    if (String(distance).includes(".")) {
      toast.error("distance must be integer without dot");
      return;
    }
    const payload = {
      distance: ["swimming", "walking"].includes(activityName)
        ? distance
        : distance * 1000,
      favorite,
      timer: +time / 1000,
      name: activityName,
    };
    console.log(payload, 1111);
    // return;
    try {
      const res = await axios.post(activityBaseUrl, payload, requestConfig);
      console.log(res.data);
      resetData();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleActivitySave = () => {
    createActivity();
  };

  if (emptyField.length) {
    return (
      <h1 className="text-center w-full my-40">
        Please complete:{" "}
        <strong className="text-red-700"> {emptyField.join(",  ")}</strong> by
        going to
        <Link to="/user/profile">
          <button className="px-2 py-1 mx-2 rounded-md bg-neutral-600">
            profile tab
          </button>
        </Link>
        top right corner
      </h1>
    );
  }
  console.log("distance", distance);
  return (
    <div className="m-auto">
      <div className="px-10 py-6 bg-neutral-800 rounded-2xl">
        <h1 className="my-10 py-4 text-2xl">Activity</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-between w-100">
            <label className="capitalize text-xl" htmlFor="activity">
              name -{" "}
            </label>
            <div className="flex items-center w-2/3">
              <select
                onChange={(e) => !time && setActivityName(e.target.value)}
                value={activityName}
                className="w-40 px-1 border border-neutral-600 h-10 rounded-md  outline-none"
                name=""
                id="activity"
              >
                {activityArray.map((act) => (
                  <option
                    className="text-black bg-neutral-400"
                    value={act.name}
                  >
                    {act.name}
                  </option>
                ))}
              </select>
              <label className="px-4 flex gap-2 items-center">
                Favorite
                <input
                  onChange={() => setFavorite((prv) => !prv)}
                  checked={favorite}
                  type="checkbox"
                  name="isFavorite  "
                />
              </label>
            </div>
          </div>
          <div className="relative flex items-center gap-2 justify-between w-100">
            <label className="capitalize text-xl" htmlFor="distance">
              distance -
            </label>
            <div className="flex items-center w-2/3">
              <input
                value={distance}
                onChange={(e) => {
                  !time && setDistance(+e.target.value || "");
                }}
                onKeyDown={(e) => {
                  if (["-", "e", "+", "."].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                name="distance"
                className="border w-40 h-10 px-2 border-neutral-600 rounded-md "
                type="number"
                min={1}
              />
              <span className=" p-3 rounded-2xl text-white mx-5 bg-neutral-600">
                {["swimming", "walking"].includes(activityName) ? "m" : "km"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-20">
            <h1 className="capitalize text-xl">Timer -</h1>
            <div className="flex flex-col gap-2 items-center">
              <div className="bg-neutral-400 p-4 rounded-2xl w-40 flex justify-center text-black font-medium">
                <span className="time">{`${minutes}`.padStart(2, "0")}</span>
                <span className="time">:{`${seconds}`.padStart(2, "0")}</span>
                <span className="time">
                  :{`${millsecond}`.padStart(3, "0")}
                </span>
              </div>
              <div className="flex gap-1">
                <span
                  onClick={() => action !== "start" && handleAction("start")}
                  className={`rounded-2xl ${
                    action === "start"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-fuchsia-950 cursor-pointer"
                  } py-2 px-4 text-white transition-transform active:scale-90 hover:bg-fuchsia-800`}
                >
                  Start
                </span>

                <span
                  onClick={() => handleAction("pause")}
                  className={`rounded-2xl ${
                    action === "pause" ? "bg-fuchsia-800" : "bg-fuchsia-950"
                  } py-2 px-4 text-white cursor-pointer transition-transform active:scale-90 hover:bg-fuchsia-800`}
                >
                  Pause
                </span>
                <span
                  onClick={() => handleAction("reset")}
                  className={`rounded-2xl ${
                    action === "reset" ? "bg-fuchsia-800" : "bg-fuchsia-950"
                  } py-2 px-4 text-white cursor-pointer transition-transform active:scale-90 hover:bg-fuchsia-800`}
                >
                  Reset
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={handleActivitySave}
              className="bg-neutral-900 text-white px-3 py-2 font-medium rounded-md cursor-pointer hover:bg-neutral-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
