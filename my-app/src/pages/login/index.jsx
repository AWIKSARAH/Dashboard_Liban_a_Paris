import React, {  useState } from "react";
import "./login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "../../Le-Liban-A-Paris-Noir-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { toast } from "react-hot-toast";


export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const signIn = useSignIn()
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    localStorage.setItem(name, value); // update localStorage with input values
  };
  // console.log(loginData);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: loginData.email,
          password: loginData.password,
        }
      );
        console.log(response.data);
      const token = response.data.token;
        signIn(
          {
            token,
            expiresIn:3600,
            tokenType:"Bearer",
            authState:{email:loginData.email,isAdmin:response.data.user.IsAdmin},
          }
        )
      navigate("/");
      // store token in localStorage
    } catch (error) {
      toast.error("Wrong Credentials")
      console.error(error);
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
          <Link href="#">
            <u>Forget password</u>
          </Link>
        </form>
      </div>
    </div>
  );
}
