import React, { useEffect, useState } from 'react'
import { RiseLoader } from 'react-spinners';
import "./loader.css";

export  const Loader = (props) => {
 const [isLoading, setIsLoading] = useState(false);
  return (
    <div className='loader' >
        <RiseLoader
          className="loader"
          color={"#eeeeee"}
          loading={props.isLoading}
          size={50}
          
          aria-label="Loading Spinner"
          />
    </div>
  )
}
