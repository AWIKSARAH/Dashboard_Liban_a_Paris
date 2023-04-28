import { useContext, useEffect } from "react";
import PageHeader from "../../components/pageHeader";
import { UserContext } from "../../common/Context";

function HomePage() {
    const {token} = useContext(UserContext);
    useEffect(()=>{
        
    },[token]);
    return ( <>
    <PageHeader label="Home Page"/>
    {token}
    </> );
}

export default HomePage;