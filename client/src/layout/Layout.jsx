import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./nav/Nav";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="App h-full">
      <Nav />
      <div className="mt-32 md:mt-36 min-h-full grid">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
