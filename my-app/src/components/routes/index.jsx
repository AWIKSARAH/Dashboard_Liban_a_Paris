import React, { useContext, useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/index";
import HomePage from "../../pages/home";
import ProtectedRoutes from "../protectedRoutes";
import { UserContext } from "../../common/Context";
import {Loader} from "../loader/loader";

export default function AllRouts() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const providerValues = useMemo(
    () => ({ token, setToken }),
    [token, setToken]
  );
  useEffect(() => {
   if(token){
    setIsLoggedIn(true);
   }
  }, [token]);


  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false);
    },5000)
  }, [])
  

  return (
    <div className="allRoute">
      <UserContext.Provider value={providerValues}>
       
        {/* {isLoading?} */}

        {
          isLoading?
          <Loader value={isLoading}/>:
        <Routes> 
          data-testid="loader"
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/2" element={<HomePage />} />
            <Route path="/3" element={<HomePage />} />
            <Route path="/4" element={<HomePage />} />
            <Route path="/5" element={<HomePage />} />
          </Route>
        </Routes>}
      </UserContext.Provider>
    </div>
  );
}
