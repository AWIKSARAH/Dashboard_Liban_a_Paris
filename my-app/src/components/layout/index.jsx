import React
// ,{ useState } 
from "react";
import "./layout.css";
import SideBar from "../sidebar";
import { Outlet } from "react-router";

export default function Layout({children}) {
  return (
    <div className="dash--layout_container">
      <SideBar />
      <div className='dash--main_content'>
        
        <Outlet/>
      </div>
    </div>
  );
}
