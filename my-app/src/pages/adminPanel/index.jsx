import React from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sidebar";

export default function Layout() {
  return (
    <div className="dash--layout_container">
      <SideBar />
      <div className={`dash--main_content opened`}>
        <Outlet />
      </div>
    </div>
  );
}
