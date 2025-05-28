import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import running from "../../assets/running.avif";
import swimming from "../../assets/swimming.jpeg";
import cycling from "../../assets/cycling.jpeg";
import trekking from "../../assets/trekking.jpg";
import walking from "../../assets/walking.jpg";

const imageMap = {
  running,
  swimming,
  cycling,
  trekking,
  walking,
};

export default function DashBoardCard({
  dd,
  speed,
  handleDashboardDeleteClick,
}) {
  return (
    <div className="px-2 py-2  bg-neutral-800 rounded-md relative shadow-2xs hover:scale-105 transition-transform">
      <img
        className="opacity-60 h-40 object-cover w-[220px] "
        src={imageMap[dd.name]}
        alt=""
      />
      <div className="py-1">
        <div className="capitalize font-medium">
          <span className="capitalize text-neutral-500 font-semibold text-xl">
            activityName :
          </span>{" "}
          <span className="text-white">{dd.name}</span>
        </div>
        <div>
          <span className="capitalize text-neutral-500 font-semibold text-xl">
            distance :{" "}
          </span>{" "}
          {["swimming", "walking"].includes(dd.name)
            ? dd.distance_meter
            : dd.distance_meter / 1000}{" "}
          {["swimming", "walking"].includes(dd.name) ? "m" : "km"}
        </div>
        <div>
          <span className="capitalize text-neutral-500 font-semibold text-xl">
            time :
          </span>{" "}
          {dd.timer_second} s
        </div>
        <div>
          <span className="capitalize text-neutral-500 font-semibold text-xl">
            speed :
          </span>{" "}
          {(["swimming", "walking"].includes(dd.name)
            ? speed
            : speed / 1000
          ).toFixed(3)}
          <span>
            {" "}
            {["swimming", "walking"].includes(dd.name) ? "m/s" : "km/s"}
          </span>
        </div>
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
  );
}
