import "./sidebar.css";
import whiteLogo from "../../white-logo.png";
import { Link, useLocation } from "react-router-dom";
import {  Logout, Settings, Menu } from "@mui/icons-material";
import { useState } from "react";
import CustomLink from "./CustomLink";
import { sideBarRoutes } from "./sideBarRoutes";



function Sidebar() {
  var mediaSize = window.matchMedia("(min-width: 768px)");
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    mediaSize.matches ? true : false
  );
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className="sidebar--button_container">
        <button className="sidebar--button" onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>
      {isSidebarOpen && (
        <aside className="sidebar--container">
          <div className="sidebar--top">
            <img src={whiteLogo} alt="logo" width={180} height={60} />
            <div className="sidebar--nav_container">
              {linkMapper(sideBarRoutes, location)}
            </div>
          </div>
          <div className="sidebar--bottom sidebar--nav_container">
            <Link>
              <Settings />
              Settings
            </Link>
            <Link>
              <Logout />
              Logout
            </Link>
          </div>
        </aside>
      )}
    </>
  );
}
export default Sidebar;
function linkMapper(sideBarRoutes, location) {
  return sideBarRoutes.map((route, index) => {
    return (
      <CustomLink
        key={index}
        location={location}
        route={route}
      ></CustomLink>
    );
  });
}

