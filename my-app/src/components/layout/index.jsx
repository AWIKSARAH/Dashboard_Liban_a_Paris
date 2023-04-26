import React
// ,{ useState } 
from "react";
import "./layout.css";
import SideBar from "../sidebar";

export default function Layout({children}) {
  console.log(children);
  // const [sidebarOpen,setSidebarOpen]=useState(true)
  return (
    <div className="dash--layout_container">
      <SideBar />
      <div className='dash--main_content'>
        
        {children}
      </div>
    </div>
  );
}
