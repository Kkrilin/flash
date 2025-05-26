import React from "react";

export default function Header() {
  return (
    <div className="px-20 py-3 h-14 border-b-neutral-700 border-b">
      <header className="flex items-center gap-40 w-1/2 ">
        <h1>ActNow</h1>
        <ul className="flex gap-20 capitalize">
          <li>find</li>
          <li>search</li>
          <li>subscription</li>
          <li>contact us</li>
        </ul>
      </header>
    </div>
  );
}
