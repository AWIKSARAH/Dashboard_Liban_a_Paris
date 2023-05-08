import "./sidebar.css";
import whiteLogo from "../../white-logo.png";
import { Link } from "react-router-dom";
import { Logout, Settings, Menu, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CustomLink from "./CustomLink";
import { routes } from "../../common/routesArray";
import { useAuthUser, useSignOut } from "react-auth-kit";

function Sidebar() {
  var mediaSize = window.matchMedia("(min-width: 768px)");
  const signOut = useSignOut();
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    mediaSize.matches ? true : false
  );
  const [logout, setLogout] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogOut = () => {
    setLogout(true);
  };

  const auth=useAuthUser()
  console.log(auth().isAdmin);
  useEffect(() => {
    if (logout) signOut();
  }, [logout, signOut]);

  return (
    <>
      <div className="sidebar--button_container">
        <button className="sidebar--button" onClick={toggleSidebar}>
          {isSidebarOpen ? <Close /> : <Menu />}
        </button>
      </div>
      <aside className={`sidebar--container ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar--top">
          <img src={whiteLogo} alt="logo" width={180} height={60} />
          <div className="sidebar--nav_container">{linkMapper(routes,auth().isAdmin)}</div>
        </div>
        <div className="sidebar--bottom sidebar--nav_container">
          <Link>
            <Settings />
            Settings
          </Link>
          <Link onClick={handleLogOut}>
            <Logout />
            Logout
          </Link>
        </div>
      </aside>
    </>
  );
}

function linkMapper(routes,isAdmin) {
  return routes.map((route, index) => {
    if(route.path==="/user"){
      if(isAdmin){
        return <CustomLink key={index} path={route}/>
      }
    }else{

      return <CustomLink key={index} path={route}></CustomLink>;
    }
  });
}

export default Sidebar;
