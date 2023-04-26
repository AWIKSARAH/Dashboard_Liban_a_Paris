import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/index";
import HomePage from "../../pages/home";
import ProtectedRoutes from "../protectedRoutes";

export default function AllRouts() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/2" element={<HomePage />} />
          <Route path="/3" element={<HomePage />} />
          <Route path="/4" element={<HomePage />} />
          <Route path="/5" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
