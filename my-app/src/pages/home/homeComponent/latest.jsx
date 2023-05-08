
import React from "react";
import "./newsLetter.css";
import { Link } from "react-router-dom";


const LatestPlaces = ({ data,link,title }) => {
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
          <Link  to={link} key={place} className="newsLetter__results-list" >
            <div className="newsLetter__entry">
              <div className="newsLetter__icon">
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${place.image}`}
                  alt=""
                />{" "}
              </div>
              <div className="newsLetter__desc">
                <label>{place.ti1tle}</label>
              </div>
            </div>
            <hr />
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default LatestPlaces;
