import React, { useContext, useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/index";
import HomePage from "../../pages/home";
import ProtectedRoutes from "../protectedRoutes";
import { UserContext } from "../../common/Context";

export default function AllRouts() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const providerValues = useMemo(
    () => ({ token, setToken }),
    [token, setToken]
  );
  useEffect(() => {
   if(token){
    setIsLoggedIn(true);
   }
  }, [token]);

  return (
    <div>
      <UserContext.Provider value={providerValues}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/2" element={<HomePage />} />
            <Route path="/3" element={<HomePage />} />
            <Route path="/4" element={<HomePage />} />
            <Route path="/5" element={<HomePage />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}
