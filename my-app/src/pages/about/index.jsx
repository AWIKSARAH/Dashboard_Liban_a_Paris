import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./about.css";
import Edit from "./editAbout";

const ContactInfo = () => {
  const [info, setInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [tempInfo, setTempInfo] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/info`).then((res) => {
      setInfo(res.data.data[0]);
      setTempInfo(res.data);
    });
  }, [refresh]);


  const handleRefresh = () =>{
setRefresh(!refresh)
  }
  const handleSocialMediaChange = (event, index) => {
    const { name, value } = event.target;
    setTempInfo((prevTempInfo) => ({
      ...prevTempInfo,
      socialMedia: prevTempInfo.socialMedia.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      ),
    }));
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setTempInfo(info);
    setEditMode(false);
  };

  const handleCloseModal = () => {
    setEditMode(false);
  };

  return (
    <div className="contact-info-container">
      {info && (
        <>
          <h1>Contact Information</h1>
          {editMode ? (
            <>
              <Edit
                isOpen={editMode}
                initialData={info}
                id={info._id}
                handleClose={handleCloseModal}
                handleRefresh={handleRefresh}
              ></Edit>
            </>
          ) : (
            <>
              <div className="info-field">
                <label htmlFor="socialMedia">Social Media</label>
                <div className="social-media-list">
                  {info.socialMedia.map((socialMedia, index) => (
                    <div key={index} className="social-media-item">
                      <FontAwesomeIcon icon={socialMedia.icon} />
                      <a
                        href={socialMedia.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {socialMedia.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="info-field">
                <label htmlFor="logo">Logo</label>
                <div className="logo-container">
                  <img
                    src={`http:localhost:5000${info.logo} `}
                    alt={info.logo}
                  />
                </div>
              </div>
              <div className="info-field">
                <label htmlFor="aboutUs">About Us</label>
                <div className="aboutUs-text">
                  {info.aboutUs ? info.aboutUs : "No description provided."}
                </div>
              </div>
              <button onClick={handleEditMode}>
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ContactInfo;
