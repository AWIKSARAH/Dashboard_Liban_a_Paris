import { Outlet } from "react-router-dom";
import Login from "../../pages/login";
import Layout from "../layout";
import { useEffect } from "react";

function ProtectedRoutes() {
    const isLoggedIn=true
    useEffect(() => {
     
    }, [])
    
    return ( 
        <>
        {isLoggedIn?<Layout><Outlet/></Layout>:<Login/>}
        </>
     );
}

export default ProtectedRoutes;