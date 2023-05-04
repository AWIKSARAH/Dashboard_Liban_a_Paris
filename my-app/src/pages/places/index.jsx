import axios from "axios";
import { useEffect, useState } from "react";
import PageHeader from "../../components/pageHeader";
import TableContent from "../../common/table";
import { Loader } from "../../components/loader";

function PlacesPage() {
    const [data,setData]=useState(null)
    const [query,setQuery]=useState([])
    const [ currentPage,setCurrentPage ]=useState(1)
    const [ onlyStringData,setOnlyStringData]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const columns=["_id","Title","Email","Description","Location","Type","Tel","Confirmation"]
    useEffect(()=>{
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_API_URL}/places/all/all?page=${currentPage}&title=${query}`).then(response=>{
            let clean = response.data.docs.filter(obj => {
                for (let key in obj) {
                  if (typeof obj[key] === 'string') {
                    return true;
                  }
                  if(typeof obj[key] === 'boolean'){
                    return true
                  }
                }
                return false;
              }).map(obj => {
                const newObj = {};
                for (let key in obj) {
                  if (typeof obj[key] === 'string'&&key !=="image" ) {
                    newObj[key] = obj[key];
                  }
                }
                newObj.confirmation=obj.confirmation
                return newObj;
              });
              response.data.docs.forEach(element => {
                clean.confirmation=element.confirmation
              });
            setData(response.data)
            setOnlyStringData(clean)
            setIsLoading(false)
            
        })
    },[currentPage,query])
    return ( <>
    <PageHeader label="Places" setSearchQuery={setQuery}/>
    <TableContent rows={onlyStringData} columns={columns} currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={data?.totalPages||null} isLoading={isLoading}/>
    </> );
}

export default PlacesPage;