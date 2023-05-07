import React, { useState } from "react";
import "./newsLetter.css";
import Delete from "../../../common/Delete.svg";
import axios from "axios";

const NewsLetter = ({ data, handleRefresh }) => {
  const handleDelete = (email) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${email} ?`);
    if (confirmDelete) {
      axios.get(`${process.env.REACT_APP_API_URL}/news/${email}`)
        .then(response => {
          console.log(response);
          handleRefresh(); 
          alert("Email deleted successfully");
        })
        .catch(error => {
          console.error(error);
          alert("Error deleting email");
        });
    }
  };

  return (
    <div className="newsLetter__card">
      <div className="newsLetter__results">
        <p className="newsLetter__label">NewsLetter</p>
        {data.map(email => (
          <div key={email} className="newsLetter__results-list">
            <div className="newsLetter__entry">
              <div className="newsLetter__icon">
                <img
                  className="newsLetter__icon"
                  src={Delete}
                  alt="delete"
                  onClick={() => handleDelete(email._id)}
                />
              </div>
              <div className="newsLetter__desc">
                <label>{email.email}</label>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsLetter;
