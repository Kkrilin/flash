import React from "react";

import swimming from "../../assets/swimming.jpeg";
import cycling from "../../assets/cycling.jpeg";
import running from "../../assets/running.avif";
import trekking from "../../assets/trekking.jpg";
import ImageContainer from "../Common/ImageContainer";

export default function LandingPage({ children }) {
  return (
    <main className="flex h-full ">
      <ImageContainer text="swimming" img={swimming} />
      <ImageContainer text="running" img={running} />
      <div
        style={{
          backgroundColor: "#131313",
          width: "28%",
        }}
      >
        {children}
      </div>
      <ImageContainer text="cycling" img={cycling} />
      <ImageContainer text="trekking" img={trekking} />
    </main>
  );
}
