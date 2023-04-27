import React, { useEffect, useRef, useState } from "react";
import "./login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "../../Le-Liban-A-Paris-Noir-removebg-preview.png";
import Cookies from "universal-cookie";
import axios from "axios";
import { createContext } from "react";
import Context from "../../common/Context";

export default function (props) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [Token,settoken] = useState("");

  function getToken (token) {
    props.setToken(token)
  }
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }
    ));
    console.log(loginData);
  };
console.log(loginData);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email: loginData.email,
        password: loginData.password,
      });

      settoken(response.data.token);
      getToken(Token)
      // store the token in your global state using useContext

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="LoginWrapper">
      
      <img
        className="login--logo_above"
        src={logo}
        alt="logo of liban francais"
        width={400}
      />
      <div className="ContentContainer">
        <form className="login--form" onSubmit={handleLogin}>
          <img
            src={logo}
            className="login--logo_bottom"
            alt="logo of liban francais"
            width={400}
          />
          <TextField
            className="text-field"
            helperText={loginData.email ? " " : "Please enter your email"}
            label="email"
            onChange={handleInputChange}
            name="email"
          />

          <TextField
            className="text-field"
            id="filled-password-input"
            label="Password"
            name="password"
            helperText={loginData.password ? " " : "Please enter your password"}
            type="password"
            onChange={handleInputChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            className="login--button"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
