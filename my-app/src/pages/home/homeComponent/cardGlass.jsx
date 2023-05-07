import React from "react";
import "./cardGlass.css";
import { Link } from "react-router-dom";
const Card = ({ title, value,link }) => {
  return (
    <Link to={link} className="container" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card ">
        <span style={{fontWeight:'bolder',color:'#174163'}}>{title} </span>
        <span style={{color:'#3f92b5ba',fontWeight:'bolder'}}>{value}</span>
      </div>
    </Link>
  );
};

export default Card;
