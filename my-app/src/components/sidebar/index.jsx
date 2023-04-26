import "./sidebar.css";
import whiteLogo from "../../white-logo.png";
import { Link } from "react-router-dom";
import { Logout, Settings, Menu, Close } from "@mui/icons-material";
import { useState } from "react";
import CustomLink from "./CustomLink";
import { sideBarPaths } from "./sideBarPaths";

function Sidebar() {
  var mediaSize = window.matchMedia("(min-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    mediaSize.matches ? true : false
  );
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className="sidebar--button_container">
        <button className="sidebar--button" onClick={toggleSidebar}>
          {isSidebarOpen?<Close/>:<Menu />}
        </button>
      </div>
      <aside className={`sidebar--container ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar--top">
          <img src={whiteLogo} alt="logo" width={180} height={60} />
          <div className="sidebar--nav_container">
            {linkMapper(sideBarPaths)}
          </div>
        </div>
        <div className="sidebar--bottom sidebar--nav_container">
          <Link>
            <Settings />
            Settings
          </Link>
          <Link to="/login">
            <Logout />
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
}
export default Sidebar;
function linkMapper(sideBarPaths) {
  return sideBarPaths.map((path,index) => {
    return <CustomLink key={index} path={path}></CustomLink>;
  });
}
