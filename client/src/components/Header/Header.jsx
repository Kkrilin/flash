import React from "react";

export default function Header() {
  return (
    <div className="p-3 h-14">
      <header className="flex items-center gap-30 w-1/2">
        <h1>ActNow</h1>
        <ul className="flex gap-2">
          <li>find</li>
          <li>search</li>
          <li>subscription</li>
          <li>contact us</li>
        </ul>
      </header>
    </div>
  );
}
