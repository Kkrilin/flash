import React from "react";

export default function ImageContainer({ img, text }) {
  return (
    <div className="h-full w-1/5 relative">
      <div
        style={{
          background: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100%",
          width: "100%",
          opacity: 0.4,
        }}
      ></div>
      <h1 className="text-white absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 uppercase tracking-widest font-bold text-5xl">
        {text}
      </h1>
    </div>
  );
}
