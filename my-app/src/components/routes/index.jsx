import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/index";
import ProtectedRoutes from "../protectedRoutes";
import { routes } from "../../common/protectedRoutes";

export default function AllRouts() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          {routes.map(route=>{
           return <Route path={route.path} element={route.element}/>
          })}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
