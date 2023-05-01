import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/index";
import { routes } from "../../common/routesArray";
import { RequireAuth } from "react-auth-kit";
import Layout from "../layout";

export default function AllRouts() {
  return (
    <div>
      <Routes>
        <Route
          path={"/"}
          element={
            <RequireAuth loginPath={"/login"}>
              <div>
                <Layout />
              </div>
            </RequireAuth>
          }
        >
          {routes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
