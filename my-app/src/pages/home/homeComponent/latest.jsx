
import React from "react";
import "./newsLetter.css";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthHeader } from "react-auth-kit";


const LatestPlaces = ({ data,title }) => {
  const authHeaders=useAuthHeader()
  const Authorization=authHeaders()
  function handleConfirmation(value,id){
    axios.patch(`${process.env.REACT_APP_API_URL}/${title}/confirm/${id}`,{confirmation:value},{headers:{Authorization}}).then(res=>{
      if(res.data.success) toast.success(`${title} confirmed`)
    }).catch(e=>console.log(e))
  }
  return (
    <>
    
    
    <div className="newsLetter__card">
    <h1>{title}</h1>
      <div className="newsLetter__results">
        <p className="newsLetter__label">
          {" "}
          See this Latest {title} and Confirm On it
        </p>
        {data.map((place) => (
            <div className="newsLetter__entry" key={place._id}>
              <div className="newsLetter__icon">
                <Checkbox onChange={e=>{handleConfirmation(e.target.checked,place._id)}}/>
              </div>
              <div className="newsLetter__desc">
                <label>{place.title}</label>
              </div>
            </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default LatestPlaces;
