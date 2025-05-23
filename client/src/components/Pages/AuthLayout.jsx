import React from "react";
import swimingImgae from "/home/kundan/varthana/mysocizlactivity/client/src/assets/swimming.jpeg";
import cycling from "../../assets/cycling.jpeg";
import running from "../../assets/running.avif";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="flex flex-col"
    >
      <Header />
      <div className="flex-1">
        <main className="flex h-full">
          <div
            style={{
              background: `url(${swimingImgae})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "30%",
              objectFit: "contain",
            }}
          ></div>
          <div
            className="bg-amber-950"
            style={{
              background: `url(${running})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "40%",
              objectFit: "contain",
            }}
          >
            <Outlet />
          </div>
          <div
            style={{
              background: `url(${cycling})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "30%",
              objectFit: "contain",
            }}
          ></div>
        </main>
      </div>
    </div>
  );
}
