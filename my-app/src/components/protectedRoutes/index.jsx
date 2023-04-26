import { Outlet } from "react-router-dom";
import Login from "../../pages/login";
import Layout from "../layout";

function ProtectedRoutes() {
    const isLoggedIn=true
    return ( 
        <>
        {isLoggedIn?<Layout><Outlet/></Layout>:<Login/>}
        </>
     );
}

export default ProtectedRoutes;